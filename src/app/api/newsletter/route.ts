import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let email = "";
  let source = "homepage";

  try {
    const body = await req.json();
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    source = typeof body.source === "string" && body.source.trim()
      ? body.source.trim().slice(0, 80)
      : "homepage";
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 400 });
  }

  const supabaseUrl = getSupabaseProjectUrl(process.env.SUPABASE_URL);
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Newsletter indisponible pour le moment." },
      { status: 500 },
    );
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/newsletter_subscribers?on_conflict=email`,
    {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        email,
        source,
        status: "subscribed",
        user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
        subscribed_at: new Date().toISOString(),
        unsubscribed_at: null,
      }),
    },
  );

  if (!response.ok) {
    console.error("Supabase newsletter insert failed", await response.text());
    return NextResponse.json(
      { error: "Impossible d'enregistrer cet email." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

function getSupabaseProjectUrl(value: string | undefined) {
  if (!value) return "";

  try {
    const url = new URL(value);
    url.pathname = url.pathname.replace(/\/rest\/v1\/?$/, "");
    return url.toString().replace(/\/$/, "");
  } catch {
    return value.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
  }
}

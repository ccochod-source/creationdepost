import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import type { ArticleData } from "@/lib/types";

export async function POST(req: NextRequest) {
  let url: string;

  try {
    const body = await req.json();
    url = body.url;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "URL invalide." }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "fr,en;q=0.9",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Impossible d'accéder à l'article (HTTP ${response.status}).` },
        { status: 422 }
      );
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return NextResponse.json(
        { error: "Le lien ne pointe pas vers une page HTML lisible." },
        { status: 422 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove noise
    $("script, style, nav, footer, header, aside, .ad, .ads, .advertisement, .cookie, .popup").remove();

    // Title
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      $("title").text() ||
      $("h1").first().text() ||
      "";

    // Description
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      "";

    // Image
    const imageUrl =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "";

    // Author
    const author =
      $('meta[name="author"]').attr("content") ||
      $('[rel="author"]').first().text() ||
      $(".author").first().text() ||
      "";

    // Published date
    const publishedAt =
      $('meta[property="article:published_time"]').attr("content") ||
      $('time[datetime]').first().attr("datetime") ||
      "";

    // Main content — try semantic selectors in order
    let content = "";
    const candidates = [
      "article",
      '[role="main"]',
      "main",
      ".article-body",
      ".post-content",
      ".entry-content",
      ".article-content",
      ".content-body",
      "#article-body",
      "#content",
    ];

    for (const selector of candidates) {
      const el = $(selector).first();
      if (el.length) {
        const text = el
          .find("p")
          .map((_, p) => $(p).text().trim())
          .get()
          .filter((t) => t.length > 40)
          .join("\n\n");
        if (text.length > 200) {
          content = text;
          break;
        }
      }
    }

    // Fallback: all p tags
    if (!content) {
      content = $("p")
        .map((_, p) => $(p).text().trim())
        .get()
        .filter((t) => t.length > 40)
        .join("\n\n");
    }

    if (!title && !content) {
      return NextResponse.json(
        { error: "Impossible d'extraire le contenu de cet article. L'accès est peut-être protégé." },
        { status: 422 }
      );
    }

    const article: ArticleData = {
      url,
      title: title.trim(),
      description: description.trim(),
      content: content.slice(0, 6000).trim(), // cap to avoid token overflow
      imageUrl: imageUrl || undefined,
      author: author.trim() || undefined,
      publishedAt: publishedAt || undefined,
    };

    return NextResponse.json({ article });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    if (message.includes("timeout") || message.includes("abort")) {
      return NextResponse.json(
        { error: "L'article a mis trop de temps à répondre." },
        { status: 408 }
      );
    }
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'article." },
      { status: 500 }
    );
  }
}

function isValidUrl(str: string): boolean {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

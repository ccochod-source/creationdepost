import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { Platform, ArticleData } from "@/lib/types";

const PROMPTS: Record<Platform, (article: ArticleData) => string> = {
  linkedin: (a) => `
Tu es un expert en personal branding et en content marketing LinkedIn.

Rédige un post LinkedIn en français basé sur cet article :

Titre : ${a.title}
Description : ${a.description}
Contenu : ${a.content.slice(0, 3000)}

Règles strictes :
- Commence par un hook fort sur la première ligne (accroche qui donne envie de lire la suite)
- Utilise des sauts de ligne fréquents pour la lisibilité mobile
- Structure : Hook → Contexte → 3 points clés ou insight principal → Call-to-action
- Ton : professionnel, direct, factuel mais engageant
- Longueur : 150 à 300 mots
- Termine par une question ou un call-to-action qui invite à la discussion
- N'invente pas de faits, reste fidèle à l'article d'origine
- Pas d'emojis excessifs (max 3 à 4)
- Pas de hashtags dans le corps du texte, tu peux en mettre 3 à 5 à la fin

Réponds UNIQUEMENT avec le texte du post, sans titre ni introduction.
`.trim(),

  instagram: (a) => `
Tu es un créateur de contenu Instagram expert.

Rédige un post Instagram en français basé sur cet article :

Titre : ${a.title}
Description : ${a.description}
Contenu : ${a.content.slice(0, 2000)}

Règles strictes :
- Commence par une phrase accrocheuse, émotionnelle ou intrigante
- Ton : chaleureux, visuel, personnel, vivant
- Longueur : 80 à 150 mots maximum
- Utilise quelques sauts de ligne pour l'aération
- Termine par un call-to-action simple ("Enregistre ce post", "Dis-moi en commentaire", etc.)
- Ajoute 8 à 12 hashtags pertinents en français et anglais, séparés par un espace, à la fin du post
- N'invente pas de faits, reste fidèle à l'article d'origine
- Quelques emojis bienvenus mais pas excessifs

Réponds UNIQUEMENT avec le texte du post, sans titre ni introduction.
`.trim(),

  twitter: (a) => `
Tu es un expert en communication Twitter/X.

Rédige un tweet ou un thread court en français basé sur cet article :

Titre : ${a.title}
Description : ${a.description}
Contenu : ${a.content.slice(0, 2000)}

Règles strictes :
- Si le sujet le mérite, crée un thread de 3 à 5 tweets (indique chaque tweet avec "1/", "2/", etc.)
- Sinon, rédige un seul tweet percutant de 280 caractères maximum
- Commence par l'information ou l'angle le plus frappant
- Ton : direct, prise de position claire, informatif
- Pas de formules génériques type "C'est important de savoir que..."
- N'invente pas de faits, reste fidèle à l'article d'origine
- 1 à 2 emojis maximum
- 2 à 3 hashtags pertinents maximum, seulement si naturels

Réponds UNIQUEMENT avec le texte du tweet ou du thread, sans titre ni introduction.
`.trim(),
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Clé API OpenAI manquante. Ajoutez OPENAI_API_KEY dans votre fichier .env.local.",
        missingKey: true,
      },
      { status: 503 }
    );
  }

  let article: ArticleData;
  let platform: Platform;

  try {
    const body = await req.json();
    article = body.article;
    platform = body.platform;
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  if (!article || !platform) {
    return NextResponse.json({ error: "Article et plateforme requis." }, { status: 400 });
  }

  try {
    const client = new OpenAI({ apiKey });
    const prompt = PROMPTS[platform](article);

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
      max_tokens: 800,
    });

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!text) {
      return NextResponse.json({ error: "La génération a retourné un résultat vide." }, { status: 500 });
    }

    return NextResponse.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    if (message.includes("401") || message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Clé API OpenAI invalide." }, { status: 401 });
    }
    if (message.includes("429") || message.includes("quota")) {
      return NextResponse.json({ error: "Quota OpenAI dépassé. Réessayez plus tard." }, { status: 429 });
    }
    return NextResponse.json({ error: "Erreur lors de la génération du post." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { Platform, ArticleData } from "@/lib/types";

function buildImagePrompt(article: ArticleData, platform: Platform): string {
  const subject = article.title || article.description || "actualité";
  const keywords = article.description?.slice(0, 200) ?? "";

  const styleMap: Record<Platform, string> = {
    linkedin:
      "Clean editorial photography style, professional atmosphere, muted tones, minimal composition, suitable for a business publication. No text or UI overlays.",
    instagram:
      "Vivid editorial photography, modern lifestyle aesthetic, warm and engaging composition, strong visual impact. No text or UI overlays.",
    twitter:
      "Bold, high-contrast editorial image, striking composition, newsroom aesthetic. No text or UI overlays.",
  };

  return `${styleMap[platform]} Topic: "${subject}". Context: ${keywords}. Photorealistic, high quality, 16:9 ratio.`;
}

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

  const imagePrompt = buildImagePrompt(article, platform);

  try {
    const client = new OpenAI({ apiKey });

    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1792x1024",
      quality: "standard",
      response_format: "url",
    });

    const imageUrl = response.data?.[0]?.url;
    if (!imageUrl) {
      return NextResponse.json({ error: "L'image n'a pas pu être générée." }, { status: 500 });
    }

    return NextResponse.json({ imageUrl, imagePrompt });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue.";
    if (message.includes("content_policy") || message.includes("safety")) {
      return NextResponse.json(
        {
          error:
            "Le sujet de l'article a été bloqué par les filtres de sécurité de l'image. Essayez avec un autre article.",
        },
        { status: 422 }
      );
    }
    if (message.includes("401") || message.includes("Unauthorized")) {
      return NextResponse.json({ error: "Clé API OpenAI invalide." }, { status: 401 });
    }
    if (message.includes("429") || message.includes("quota")) {
      return NextResponse.json({ error: "Quota OpenAI dépassé. Réessayez plus tard." }, { status: 429 });
    }
    return NextResponse.json({ error: "Erreur lors de la génération de l'image." }, { status: 500 });
  }
}

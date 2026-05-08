export type Platform = "linkedin" | "instagram" | "twitter";

export interface ArticleData {
  url: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  author?: string;
  publishedAt?: string;
}

export interface GeneratedPost {
  platform: Platform;
  text: string;
  imageUrl?: string;
  imagePrompt?: string;
}

export type AppState =
  | { status: "idle" }
  | { status: "analyzing" }
  | { status: "platform-select"; article: ArticleData }
  | { status: "generating"; article: ArticleData; platform: Platform }
  | { status: "result"; article: ArticleData; platform: Platform; post: GeneratedPost }
  | { status: "error"; message: string };

export const PLATFORM_META: Record<
  Platform,
  { label: string; tone: string; number: string; description: string }
> = {
  linkedin: {
    label: "LinkedIn",
    number: "01",
    tone: "Professionnel & structuré",
    description:
      "Hook fort, format structuré, call-to-action engageant. Ton expert et direct.",
  },
  instagram: {
    label: "Instagram",
    number: "02",
    tone: "Visuel & émotionnel",
    description:
      "Texte court, percutant, hashtags pertinents. Mise en avant de l'émotion et du visuel.",
  },
  twitter: {
    label: "Twitter / X",
    number: "03",
    tone: "Concis & percutant",
    description:
      "Format court ou thread, accroche immédiate, prise de position claire.",
  },
};

import type { Metadata } from "next";
import { Inter, Inter_Tight, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Postcraft — Générateur de posts sociaux",
  description:
    "Collez une URL d'article, choisissez LinkedIn, Instagram ou X, puis générez un post et une image d'illustration.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${interTight.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

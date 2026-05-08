"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ArticleData, GeneratedPost, Platform } from "@/lib/types";
import { PLATFORM_META } from "@/lib/types";
import {
  ARTICLE_STORAGE_KEY,
  ErrorBlock,
  NewsletterHeaderLink,
  SignatureButton,
  Tag,
  formatDate,
} from "../StudioApp";

type GenerationStatus = "ready" | "generating" | "result" | "error";

const platforms = Object.entries(PLATFORM_META) as Array<
  [Platform, (typeof PLATFORM_META)[Platform]]
>;

export function StudioFlow() {
  const router = useRouter();
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [status, setStatus] = useState<GenerationStatus>("ready");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [post, setPost] = useState<GeneratedPost | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(ARTICLE_STORAGE_KEY);
    if (!raw) return;

    try {
      setArticle(JSON.parse(raw) as ArticleData);
    } catch {
      sessionStorage.removeItem(ARTICLE_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (status === "result") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  const statusText = useMemo(() => {
    if (status === "generating" && selectedPlatform) {
      return `Génération ${PLATFORM_META[selectedPlatform].label} en cours.`;
    }
    if (status === "result" && selectedPlatform) {
      return `${PLATFORM_META[selectedPlatform].label} est prêt.`;
    }
    if (status === "error") return "La génération a besoin d'une correction.";
    return "Choisissez le réseau à générer.";
  }, [selectedPlatform, status]);

  async function generateForPlatform(platform: Platform) {
    if (!article) return;

    setSelectedPlatform(platform);
    setStatus("generating");
    setPost(null);
    setError("");
    setCopied(false);

    try {
      const [postResponse, imageResponse] = await Promise.all([
        fetch("/api/generate-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ article, platform }),
        }),
        fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ article, platform }),
        }),
      ]);

      const postPayload = await postResponse.json();
      const imagePayload = await imageResponse.json();

      if (!postResponse.ok) {
        throw new Error(postPayload.error ?? "Impossible de générer le post.");
      }
      if (!imageResponse.ok) {
        throw new Error(imagePayload.error ?? "Impossible de générer l'image.");
      }

      setPost({
        platform,
        text: postPayload.text,
        imageUrl: imagePayload.imageUrl,
        imagePrompt: imagePayload.imagePrompt,
      });
      setStatus("result");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erreur pendant la génération.");
    }
  }

  async function copyPost() {
    if (!post?.text) return;

    await navigator.clipboard.writeText(post.text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function restart() {
    sessionStorage.removeItem(ARTICLE_STORAGE_KEY);
    router.push("/");
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-shell text-ink">
        <StudioHeader onRestart={restart} />
        <section className="page-frame py-10">
          <div className="grid min-h-[520px] place-items-center border border-sand bg-paper p-6 text-center">
            <div className="max-w-xl">
              <p className="text-label uppercase text-gold">Aucun article</p>
              <h1 className="mt-4 font-heading text-display font-semibold leading-none">
                Analysez une URL avant de choisir un réseau.
              </h1>
              <p className="mt-5 text-body-lg text-muted">
                Le studio utilise l'article extrait sur la première page.
              </p>
              <div className="mt-8 flex justify-center">
                <SignatureButton href="/" variant="gold">
                  Retour à l'analyse
                </SignatureButton>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-shell text-ink">
      <StudioHeader onRestart={restart} />
      <section className="page-frame py-8 lg:py-10">
        <div className="grid gap-6">
          <div className="scroll-reveal grid border border-sand bg-paper lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-sand p-6 md:p-10 lg:border-b-0 lg:border-r">
              <p className="text-label uppercase text-gold">Etape 02</p>
              <h1 className="mt-4 max-w-4xl font-heading text-display font-semibold leading-none">
                Choisissez le réseau qui porte le mieux l'article.
              </h1>
              <p className="mt-6 max-w-2xl text-body-lg text-muted">{statusText}</p>
            </div>
            <ArticleSummary article={article} />
          </div>

          <section className="scroll-reveal border border-sand bg-paper">
            <div className="grid border-b border-sand p-6 md:grid-cols-[1fr_auto] md:items-end md:p-10">
              <div>
                <p className="text-label uppercase text-gold">Réseaux</p>
                <h2 className="mt-3 font-heading text-4xl font-semibold leading-tight">
                  Un choix. Un angle. Un post.
                </h2>
              </div>
              {selectedPlatform ? (
                <span className="mt-5 border border-sand bg-shell px-4 py-3 font-mono text-xs uppercase text-gold md:mt-0">
                  {PLATFORM_META[selectedPlatform].label}
                </span>
              ) : null}
            </div>

            <div className="grid lg:grid-cols-3">
              {platforms.map(([platform, meta], index) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => generateForPlatform(platform)}
                  disabled={status === "generating"}
                  className={`group flex min-h-[300px] flex-col justify-between border-sand bg-paper p-6 text-left transition duration-300 hover:-translate-y-1 hover:bg-shell disabled:pointer-events-none disabled:opacity-60 md:p-9 ${
                    index > 0 ? "border-t lg:border-l lg:border-t-0" : ""
                  } ${
                    selectedPlatform === platform ? "ring-2 ring-inset ring-gold" : ""
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-mono text-5xl text-gold transition group-hover:translate-x-2">
                      {meta.number}
                    </span>
                    <span
                      className={`h-10 w-10 border border-sand transition ${
                        selectedPlatform === platform ? "bg-gold" : "bg-shell group-hover:bg-gold"
                      }`}
                    />
                  </span>
                  <span>
                    <span className="block font-heading text-4xl font-semibold text-ink">
                      {meta.label}
                    </span>
                    <span className="mt-3 block text-body text-muted">{meta.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          {error ? <ErrorBlock message={error} /> : null}

          {status === "generating" ? (
            <section className="clip-reveal grid min-h-[420px] border border-sand bg-ink p-6 text-paper md:p-10">
              <div className="max-w-3xl self-end">
                <p className="text-label uppercase text-gold">Génération</p>
                <h2 className="mt-4 font-heading text-display font-semibold leading-none">
                  Le texte et l'image sont en création.
                </h2>
                <p className="mt-6 text-body-lg text-muted-light">
                  La page reste structurée pendant le traitement. Le résultat apparaîtra
                  juste ici.
                </p>
              </div>
            </section>
          ) : null}

          {post ? (
            <ResultSection refNode={resultRef} post={post} copied={copied} onCopy={copyPost} />
          ) : null}
        </div>
      </section>
    </main>
  );
}

function StudioHeader({ onRestart }: { onRestart: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-paper/95 backdrop-blur">
      <nav className="page-frame flex h-[76px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a href="/" className="font-heading text-xl font-semibold uppercase text-ink">
            Postcraft
          </a>
          <NewsletterHeaderLink href="/#newsletter" />
        </div>
        <div className="hidden items-center gap-3 text-label uppercase text-gold md:flex">
          <span className="h-px w-10 bg-gold" />
          Studio de génération
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="border border-sand bg-paper px-4 py-3 text-label uppercase text-ink transition hover:bg-gold"
        >
          Nouvelle URL
        </button>
      </nav>
    </header>
  );
}

function ArticleSummary({ article }: { article: ArticleData }) {
  const excerpt = article.description || article.content;

  return (
    <article className="bg-paper">
      <div className="p-6 md:p-10">
        <p className="text-label uppercase text-gold">Article analysé</p>
        <h2 className="mt-3 font-heading text-3xl font-semibold leading-tight">
          {article.title || "Article sans titre"}
        </h2>
        {excerpt ? <p className="mt-4 line-clamp-6 text-small text-muted">{excerpt}</p> : null}
        <div className="mt-6 flex flex-wrap gap-2">
          {article.author ? <Tag>{article.author}</Tag> : null}
          {article.publishedAt ? <Tag>{formatDate(article.publishedAt)}</Tag> : null}
          <Tag>Prêt pour génération</Tag>
        </div>
      </div>
    </article>
  );
}

function ResultSection({
  refNode,
  post,
  copied,
  onCopy,
}: {
  refNode: React.RefObject<HTMLDivElement | null>;
  post: GeneratedPost;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <section ref={refNode} className="clip-reveal border border-sand bg-paper">
      <div className="grid border-b border-sand p-6 md:grid-cols-[1fr_auto] md:items-end md:p-10">
        <div>
          <p className="text-label uppercase text-gold">Résultat</p>
          <h2 className="mt-3 font-heading text-display font-semibold leading-none">
            Post {PLATFORM_META[post.platform].label}
          </h2>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="mt-6 border border-sand bg-shell px-5 py-4 text-label uppercase text-ink transition hover:bg-gold md:mt-0"
        >
          {copied ? "Copié" : "Copier le post"}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <pre className="min-h-[520px] whitespace-pre-wrap border-b border-sand bg-paper p-6 font-body text-body leading-relaxed text-ink lg:border-b-0 lg:border-r md:p-10">
          {post.text}
        </pre>
        <div className="bg-shell p-6 md:p-10">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt="Image générée pour illustrer le post"
              className="aspect-video w-full border border-sand object-cover"
            />
          ) : null}
          {post.imageUrl ? (
            <a
              href={post.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex border border-sand bg-paper px-5 py-4 text-label uppercase text-ink transition hover:bg-gold"
            >
              Ouvrir l'image
            </a>
          ) : null}
          {post.imagePrompt ? (
            <p className="mt-6 border-t border-sand pt-5 text-xs leading-relaxed text-muted">
              Prompt image: {post.imagePrompt}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

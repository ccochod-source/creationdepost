"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ArticleData } from "@/lib/types";

export const ARTICLE_STORAGE_KEY = "postcraft:article";

const processSteps = [
  {
    number: "01",
    title: "URL lisible",
    text: "Le SaaS récupère le titre, le contexte, les paragraphes utiles et l'image source quand elle existe.",
  },
  {
    number: "02",
    title: "Angle social",
    text: "Vous choisissez LinkedIn, Instagram ou X. Le ton, la longueur et la structure suivent la plateforme.",
  },
  {
    number: "03",
    title: "Post + visuel",
    text: "Le texte final et une image d'illustration sont générés ensemble pour publier plus vite.",
  },
];

const serviceBlocks = [
  {
    number: "01",
    title: "LinkedIn",
    text: "Un hook clair, un raisonnement structuré et une question finale pour ouvrir la discussion.",
  },
  {
    number: "02",
    title: "Instagram",
    text: "Une légende plus visuelle, courte, chaleureuse, avec hashtags adaptés et appel à l'action.",
  },
  {
    number: "03",
    title: "X / Twitter",
    text: "Un tweet ou un thread court, direct, construit autour de l'information la plus forte.",
  },
  {
    number: "04",
    title: "Image éditoriale",
    text: "Une image sans texte, pensée pour illustrer l'article sans ressembler à une publicité générique.",
  },
];

const reviews = [
  {
    quote:
      "On passe d'un lien brut à un contenu publiable sans perdre le fond de l'article. Le résultat reste sobre, précis et utilisable.",
    name: "Clara M.",
    role: "Fondatrice, studio contenu",
  },
  {
    quote:
      "Le choix par plateforme évite les posts copiés-collés. LinkedIn garde le contexte, X va droit au point, Instagram devient plus vivant.",
    name: "Nassim R.",
    role: "Consultant acquisition",
  },
];

export function StudioApp() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-shell text-ink">
      <BackgroundPaths />
      <SiteNav />
      <section
        id="creer"
        className="page-frame relative z-10 grid min-h-[calc(100svh-76px)] gap-6 py-8 lg:grid-cols-12 lg:items-stretch lg:py-10"
      >
        <div className="scroll-reveal flex flex-col justify-between border border-paper/45 bg-paper/28 p-6 shadow-[0_24px_80px_rgba(18,24,22,0.08)] backdrop-blur-[1px] md:p-10 lg:col-span-8 lg:min-h-[720px] lg:p-14">
          <div>
            <div className="mb-10 flex items-center gap-3 text-label uppercase text-olive">
              <span className="h-px w-12 bg-fresh-green" />
              Création de post social
            </div>
            <h1 className="max-w-[880px] font-heading text-mega font-semibold leading-none text-ink">
              <span className="line-mask">
                <span>Transformez</span>
              </span>
              <span className="line-mask">
                <span>un article en</span>
              </span>
              <span className="line-mask">
                <span>
                  post <em className="font-editorial font-normal">publiable</em>.
                </span>
              </span>
            </h1>
          </div>

          <div className="mt-12 grid gap-8 border-t border-sand pt-8 md:grid-cols-[1.1fr_0.9fr]">
            <p className="max-w-xl text-body-lg text-muted">
              Collez une URL ici. Une fois l'article analysé, vous passez dans un
              studio dédié pour choisir LinkedIn, Instagram ou X sans que tout soit
              coincé dans une colonne.
            </p>
            <div className="flex flex-col items-start gap-5">
              <SignatureButton href="#outil">Créer un post</SignatureButton>
              <p className="text-small text-muted">
                Analyse d'abord. Choix du réseau ensuite. Résultat final en pleine
                largeur.
              </p>
            </div>
          </div>
        </div>

        <CreatorWorkspace />
      </section>

      <div className="relative z-10">
        <ProcessSection />
        <ServicesSection />
        <MetricsSection />
        <TestimonialsSection />
        <FinalCta />
      </div>
    </main>
  );
}

function BackgroundPaths() {
  const makePaths = (position: number) =>
    Array.from({ length: 24 }, (_, i) => ({
      id: `${position}-${i}`,
      d: `M-${380 - i * 8 * position} -${189 + i * 10}C-${
        380 - i * 8 * position
      } -${189 + i * 10} -${312 - i * 8 * position} ${216 - i * 8} ${
        152 - i * 8 * position
      } ${343 - i * 8}C${616 - i * 8 * position} ${470 - i * 8} ${
        684 - i * 8 * position
      } ${875 - i * 8} ${684 - i * 8 * position} ${875 - i * 8}`,
      width: 1.25 + i * 0.09,
      opacity: 0.28 + i * 0.02,
      duration: 16 + (i % 6) * 2,
      delay: i * -0.34,
    }));

  return (
    <div className="home-paths-bg" aria-hidden="true">
      {[1, -1].map((position) => (
        <svg
          key={position}
          className="home-paths-layer"
          viewBox="0 0 696 316"
          fill="none"
        >
          <title>Background paths</title>
          {makePaths(position).map((path) => (
            <path
              key={path.id}
              className="home-path"
              d={path.d}
              pathLength={1}
              strokeWidth={path.width}
              strokeOpacity={path.opacity}
              vectorEffect="non-scaling-stroke"
              style={{
                animationDuration: `${path.duration}s`,
                animationDelay: `${path.delay}s`,
              }}
            />
          ))}
        </svg>
      ))}
    </div>
  );
}

function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper/35 bg-paper/45 backdrop-blur-[2px]">
      <nav className="page-frame flex h-[76px] items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a href="#creer" className="font-heading text-xl font-semibold uppercase text-ink">
            Postcraft
          </a>
          <NewsletterHeaderLink href="#newsletter" />
        </div>
        <div className="hidden items-center gap-8 text-label uppercase text-muted md:flex">
          <a className="transition hover:text-ink" href="#outil">
            Outil
          </a>
          <a className="transition hover:text-ink" href="#formats">
            Formats
          </a>
          <a className="transition hover:text-ink" href="#avis">
            Avis
          </a>
        </div>
        <a
          href="#outil"
          className="hidden border border-sand bg-paper/70 px-4 py-3 text-label uppercase text-ink transition hover:border-gold hover:bg-shell sm:inline-flex"
        >
          Créer un post
        </a>
      </nav>
    </header>
  );
}

function CreatorWorkspace() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "error">("idle");
  const [error, setError] = useState("");

  async function analyzeArticle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const preparedUrl = prepareUrl(url);

    if (!preparedUrl) {
      setStatus("error");
      setError("Ajoutez une URL d'article valide.");
      return;
    }

    setUrl(preparedUrl);
    setStatus("analyzing");
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: preparedUrl }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Impossible d'analyser cet article.");
      }

      sessionStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(payload.article));
      router.push("/studio");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erreur pendant l'analyse.");
    }
  }

  return (
    <aside
      id="outil"
      className="clip-reveal scroll-reveal border border-paper/45 bg-paper/24 shadow-[0_24px_80px_rgba(18,24,22,0.08)] backdrop-blur-[1px] lg:col-span-4"
      aria-live="polite"
    >
      <div className="flex items-center justify-between border-b border-olive/30 px-5 py-4 md:px-7">
        <div>
          <p className="text-label uppercase text-olive">Analyse</p>
          <h2 className="mt-1 font-heading text-2xl font-semibold">Lire l'article</h2>
        </div>
        <span className="border border-olive/30 bg-paper px-3 py-2 font-mono text-xs uppercase text-olive">
          Etape 01
        </span>
      </div>

      <form onSubmit={analyzeArticle} className="border-b border-olive/30 p-5 md:p-7">
        <label htmlFor="article-url" className="text-label uppercase text-muted">
          URL de l'article
        </label>
        <div className="mt-3 grid gap-3">
          <input
            id="article-url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://exemple.com/article"
            className="min-h-14 w-full border border-olive/30 bg-paper px-4 text-body text-ink outline-none transition placeholder:text-muted-light focus:border-fresh-green focus:ring-2 focus:ring-fresh-green/20"
            disabled={status === "analyzing"}
          />
          <SignatureButton type="submit" disabled={status === "analyzing"}>
            {status === "analyzing" ? "Analyse..." : "Analyser puis choisir"}
          </SignatureButton>
        </div>
      </form>

      <div className="border-b border-olive/30 p-5 md:p-7">
        <p className="text-label uppercase text-olive">Ensuite</p>
        <h3 className="mt-3 font-heading text-3xl font-semibold leading-tight">
          Direction le studio de génération.
        </h3>
        <p className="mt-4 text-small text-muted">
          La page suivante affiche l'article analysé, les trois réseaux en blocs
          propres, puis le post et l'image dans une zone de résultat dédiée.
        </p>
      </div>

      {error ? <ErrorBlock message={error} /> : null}
    </aside>
  );
}

export function ArticlePreview({
  article,
}: {
  article: ArticleData;
}) {
  const excerpt = article.description || article.content;

  return (
    <section className="grid border-b border-sand md:grid-cols-[0.85fr_1.15fr]">
      <div className="min-h-[220px] border-b border-sand bg-mist md:border-b-0 md:border-r">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt=""
            className="h-full min-h-[220px] w-full object-cover"
          />
        ) : (
          <div className="flex h-full min-h-[220px] items-end bg-mist p-5">
            <span className="font-mono text-xs uppercase text-muted">Image source absente</span>
          </div>
        )}
      </div>
      <div className="p-5 md:p-7">
        <p className="text-label uppercase text-olive">Article analysé</p>
        <h3 className="mt-3 font-heading text-2xl font-semibold leading-tight">
          {article.title || "Article sans titre"}
        </h3>
        {excerpt ? (
          <p className="mt-4 line-clamp-5 text-small text-muted">{excerpt}</p>
        ) : null}
        <div className="mt-5 flex flex-wrap gap-2">
          {article.author ? <Tag>{article.author}</Tag> : null}
          {article.publishedAt ? <Tag>{formatDate(article.publishedAt)}</Tag> : null}
        </div>
      </div>
    </section>
  );
}

export function ErrorBlock({ message }: { message: string }) {
  return (
    <div className="border-b border-danger bg-paper px-5 py-4 text-small text-danger md:px-7">
      {message}
    </div>
  );
}

function ProcessSection() {
  return (
    <section className="page-frame scroll-reveal py-6">
      <div className="grid border border-sand bg-paper lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <article
            key={step.number}
            className={`min-h-[320px] p-6 md:p-10 ${
              index > 0 ? "border-t border-sand lg:border-l lg:border-t-0" : ""
            }`}
          >
            <span className="font-mono text-5xl text-olive">{step.number}</span>
            <div className="mt-20">
              <h2 className="font-heading text-3xl font-semibold">{step.title}</h2>
              <p className="mt-4 text-body text-muted">{step.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="formats" className="page-frame scroll-reveal py-6">
      <div className="border border-sand bg-shell p-6 md:p-12">
        <div className="grid gap-8 border-b border-sand pb-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-label uppercase text-olive">Formats</p>
            <h2 className="mt-4 max-w-4xl font-heading text-display font-semibold leading-none">
              Chaque réseau garde son <em className="font-editorial font-normal">rythme</em>.
            </h2>
          </div>
          <p className="self-end text-body-lg text-muted">
            Le design de génération est simple : pas de paramètres cachés, juste des
            choix éditoriaux compréhensibles et un résultat directement exploitable.
          </p>
        </div>
        <div className="grid md:grid-cols-2">
          {serviceBlocks.map((service, index) => (
            <article
              key={service.number}
              className={`group min-h-[360px] border-sand bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:border-olive md:p-10 ${
                index < 2 ? "border-b" : ""
              } ${index % 2 === 1 ? "md:border-l" : ""} ${
                index === 1 ? "border-t md:border-t-0" : ""
              } ${index > 1 ? "border-t md:border-t-0" : ""}`}
            >
              <span className="block font-mono text-5xl text-olive transition duration-300 group-hover:translate-x-2">
                {service.number}
              </span>
              <div className="mt-24">
                <h3 className="font-heading text-3xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-body text-muted">{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="page-frame scroll-reveal py-6">
        <div className="clip-reveal border border-soft-ink bg-ink p-6 text-paper md:p-12 lg:p-16">
        <div className="grid gap-8 border-b border-soft-ink pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-label uppercase text-fresh-green">Preuve produit</p>
            <h2 className="mt-4 max-w-4xl font-heading text-display font-semibold leading-none">
              Un atelier court pour publier avec plus de structure.
            </h2>
          </div>
          <SignatureButton href="#outil" variant="gold">
            Tester
          </SignatureButton>
        </div>
        <div className="grid gap-8 pt-10 md:grid-cols-4">
          <Metric value={3} label="Formats sociaux" />
          <Metric value={45} suffix="s" label="Flux cible" />
          <Metric value={92} suffix="%" label="Moins de brouillon" />
          <div>
            <div className="font-heading text-5xl font-semibold text-paper">16:9</div>
            <p className="mt-3 text-label uppercase text-muted-light">Image générée</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="avis" className="page-frame scroll-reveal py-6">
      <div className="border-y border-sand bg-paper py-14 md:py-20">
        <div className="px-6 md:px-12">
          <p className="text-label uppercase text-olive">Avis</p>
          <h2 className="mt-4 font-heading text-display font-semibold leading-none">
            Ils en <em className="font-editorial font-normal">parlent</em>.
          </h2>
        </div>
        <div className="mt-12 grid lg:grid-cols-2">
          {reviews.map((review, index) => (
            <article
              key={review.name}
              className={`px-6 py-8 md:px-12 ${
                index > 0 ? "border-t border-sand lg:border-l lg:border-t-0" : ""
              }`}
            >
              <p className="font-heading text-3xl leading-tight text-ink md:text-4xl">
                {review.quote}
              </p>
              <div className="mt-10 flex items-center gap-4 border-t border-sand pt-5">
                <div className="grid h-12 w-12 place-items-center bg-mist font-mono text-sm text-olive">
                  {review.name.slice(0, 2)}
                </div>
                <div>
                  <p className="font-heading text-lg font-semibold">{review.name}</p>
                  <p className="text-small text-muted">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="newsletter" className="page-frame scroll-reveal py-6 pb-12">
      <div className="grid gap-8 border border-sand bg-shell p-6 md:p-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-label uppercase text-gold">Newsletter</p>
          <h2 className="mt-4 max-w-4xl font-heading text-display font-semibold leading-none">
            Recevez les prochaines évolutions de Postcraft.
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-muted">
            Un email quand de nouveaux formats, prompts ou automatisations sont ajoutés.
            Pas de bruit, juste les mises à jour utiles.
          </p>
        </div>
        <NewsletterSignup />
      </div>
    </section>
  );
}

export function NewsletterHeaderLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-10 items-center border border-gold bg-gold px-3 text-[11px] font-semibold uppercase text-ink shadow-[0_12px_28px_rgba(185,161,95,0.22)] transition hover:bg-sand md:px-4 md:text-label"
    >
      <span className="hidden sm:inline">S'inscrire à la newsletter</span>
      <span className="sm:hidden">Newsletter</span>
    </a>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setStatus("error");
      setMessage("Ajoutez votre email.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, source: "homepage" }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Impossible d'enregistrer cet email.");
      }

      setEmail("");
      setStatus("success");
      setMessage("Inscription confirmée.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Erreur pendant l'inscription.");
    }
  }

  return (
    <form
      onSubmit={subscribe}
      className="grid gap-3 border border-sand bg-paper/70 p-4 shadow-[0_18px_60px_rgba(18,24,22,0.06)] md:p-5"
    >
      <label htmlFor="newsletter-email" className="text-label uppercase text-muted">
        Email
      </label>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="vous@exemple.com"
          autoComplete="email"
          className="min-h-12 w-full border border-sand bg-paper px-4 text-body text-ink outline-none transition placeholder:text-muted-light focus:border-gold focus:ring-2 focus:ring-gold/20"
          disabled={status === "submitting"}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="min-h-12 border border-sand bg-gold px-5 text-label uppercase text-ink transition hover:bg-sand disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? "Inscription..." : "S'inscrire à la newsletter"}
        </button>
      </div>
      {message ? (
        <p
          className={`text-small ${
            status === "error" ? "text-danger" : "text-muted"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

export function SignatureButton({
  children,
  type = "button",
  href,
  disabled = false,
  variant = "primary",
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  href?: string;
  disabled?: boolean;
  variant?: "primary" | "gold";
}) {
  const sweep = variant === "gold" ? "before:bg-gold hover:text-ink" : "before:bg-olive hover:text-paper";
  const className = `group relative z-10 isolate inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-sand bg-shell px-4 py-2 text-base text-ink soft-button-shadow transition-colors duration-700 before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:transition-all before:duration-700 hover:before:left-0 hover:before:w-full hover:before:scale-150 disabled:pointer-events-none disabled:opacity-60 ${sweep}`;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <ArrowIcon />
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={className}>
      {content}
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="relative z-10 h-8 w-8 rotate-45 rounded-full border border-soft-ink p-2 transition duration-300 ease-linear group-hover:rotate-90 group-hover:border-paper group-hover:bg-paper"
      viewBox="0 0 16 19"
      aria-hidden="true"
    >
      <path
        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
        className="fill-ink"
      />
    </svg>
  );
}

function Metric({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1100;

    const tick = (time: number) => {
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <div ref={ref}>
      <div className="font-heading text-5xl font-semibold text-paper">
        {count}
        {suffix}
      </div>
      <p className="mt-3 text-label uppercase text-muted-light">{label}</p>
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="border border-sand px-3 py-2 text-xs text-muted">{children}</span>;
}

export function prepareUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : "";
  } catch {
    return "";
  }
}

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

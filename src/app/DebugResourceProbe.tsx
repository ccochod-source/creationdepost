"use client";

import { useEffect } from "react";

type PreloadInfo = {
  href: string | null;
  as: string | null;
  type: string | null;
  crossOrigin: string | null;
  media: string | null;
};

export function DebugResourceProbe() {
  useEffect(() => {
    const runId = "pre-fix";

    const log = (hypothesisId: string, message: string, data: unknown) => {
      // #region agent log
      fetch("http://127.0.0.1:7421/ingest/4036db16-d248-49db-9f78-d147c579b2a6", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "a74fdc",
        },
        body: JSON.stringify({
          sessionId: "a74fdc",
          runId,
          hypothesisId,
          location: "src/app/DebugResourceProbe.tsx:useEffect",
          message,
          data,
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion agent log
    };

    log("H0", "DebugResourceProbe mounted (useEffect)", {});
    log("H0", "DebugResourceProbe useEffect started", {});

    // H1: The 404 is coming from a preloaded same-origin asset (often /_next/static/media/* or /favicon.ico)
    // H2: Some preloads are injected but not used shortly after load (commonly next/font preloads)
    const preloadLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[rel="preload"]'),
    );

    const preloads: PreloadInfo[] = preloadLinks.map((l) => ({
      href: l.getAttribute("href"),
      as: l.getAttribute("as"),
      type: l.getAttribute("type"),
      crossOrigin: l.getAttribute("crossorigin"),
      media: l.getAttribute("media"),
    }));

    log("H2", "Preload links discovered", { count: preloads.length, preloads });

    // H3: Root html classes / font variables not matching actual CSS usage (fonts preloaded but not applied)
    const html = document.documentElement;
    const cssVars = {
      "--font-inter": getComputedStyle(html).getPropertyValue("--font-inter").trim(),
      "--font-inter-tight": getComputedStyle(html)
        .getPropertyValue("--font-inter-tight")
        .trim(),
      "--font-cormorant": getComputedStyle(html)
        .getPropertyValue("--font-cormorant")
        .trim(),
    };

    log("H3", "Root classes + font CSS vars", {
      htmlClassName: html.className,
      cssVars,
    });

    const checkSameOrigin = async (href: string) => {
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return null;
        const res = await fetch(url.toString(), { method: "HEAD" });
        return { url: url.toString(), status: res.status, ok: res.ok };
      } catch (e) {
        return { url: href, error: String(e) };
      }
    };

    void (async () => {
      const results = await Promise.all(
        preloads
          .map((p) => p.href)
          .filter((href): href is string => typeof href === "string" && href.length > 0)
          .map(checkSameOrigin),
      );

      log("H1", "Preload same-origin HEAD results", {
        results: results.filter((r) => r !== null),
      });
    })();
  }, []);

  return null;
}


import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        "soft-ink": "var(--color-soft-ink)",
        paper: "var(--color-paper)",
        shell: "var(--color-shell)",
        mist: "var(--color-mist)",
        sand: "var(--color-sand)",
        muted: "var(--color-muted)",
        "muted-light": "var(--color-muted-light)",
        gold: "var(--color-gold)",
        olive: "var(--color-olive)",
        "vivid-blue": "var(--color-vivid-blue)",
        "fresh-green": "var(--color-fresh-green)",
        coral: "var(--color-coral)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        editorial: ["var(--font-editorial)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
} satisfies Config;


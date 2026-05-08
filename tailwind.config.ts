import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", ".dark"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        muted: "var(--color-muted)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;

"use client";

import { motion } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const currentTheme = theme === "system" ? resolvedTheme : theme;
    setIsDark(currentTheme === "dark");
  }, [mounted, resolvedTheme, theme]);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    setIsDark(nextTheme === "dark");
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;

    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      // Ignore storage errors in private mode or restricted environments.
    }

    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 shadow-lg shadow-black/20 backdrop-blur"
      />
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={toggleTheme}
      aria-pressed={isDark}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 shadow-lg shadow-black/20 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {isDark ? <SunMedium size={17} /> : <MoonStar size={17} />}
    </motion.button>
  );
}

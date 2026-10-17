"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("northstar_theme") as "light" | "dark" | null;
      if (stored) {
        setTheme(stored);
        applyTheme(stored);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        setTheme(initial);
        applyTheme(initial);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  function applyTheme(target: "light" | "dark") {
    const root = document.documentElement;
    if (target === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }

  function handleToggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("northstar_theme", next);
    } catch {}
  }

  if (!mounted) {
    return (
      <div
        className={`agency-theme-btn w-9 h-9 rounded-lg border border-white/10 bg-white/5 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`agency-theme-btn inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-300 cursor-pointer ${
        isDark
          ? "border-white/15 bg-slate-900/80 text-amber-400 hover:bg-slate-800 hover:border-amber-400/50 hover:text-amber-300"
          : "border-slate-300 bg-white/90 text-slate-700 hover:bg-slate-100 hover:border-slate-400 hover:text-slate-900 shadow-sm"
      } ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={17} className="transition-transform duration-300 hover:rotate-45" /> : <Moon size={17} className="transition-transform duration-300 hover:-rotate-12" />}
    </button>
  );
}

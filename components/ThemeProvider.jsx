"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeCtx = createContext(null);

export function ThemeProvider({ children, defaultTheme = "light" }) {
  const [theme, setTheme] = useState(defaultTheme);

  // Load saved theme on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hh_theme");
      const t = saved || defaultTheme;
      setTheme(t);
      document.documentElement.dataset.theme = t;
    } catch {}
  }, [defaultTheme]);

  const value = useMemo(() => ({
    theme,
    setTheme: (t) => {
      setTheme(t);
      try {
        localStorage.setItem("hh_theme", t);
      } catch {}
      document.documentElement.dataset.theme = t;
    }
  }), [theme]);

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

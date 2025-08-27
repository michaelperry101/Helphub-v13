// components/ThemeProvider.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

/**
 * Lightweight ThemeProvider with no external deps.
 * - Reads/writes theme to localStorage ("hh_theme")
 * - Updates <html data-theme="..."> and (optionally) html class (light/dark)
 */

const ThemeCtx = createContext({ theme: "light", setTheme: () => {} });
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children, attribute = "class", defaultTheme = "light", enableSystem = false }) {
  const [theme, setTheme] = useState(defaultTheme);

  // initial load: read saved theme or system (if enabled)
  useEffect(() => {
    try {
      let t = localStorage.getItem("hh_theme");
      if (!t && enableSystem && typeof window !== "undefined" && window.matchMedia) {
        t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      t = t || defaultTheme || "light";
      setTheme(t);
    } catch {
      setTheme(defaultTheme || "light");
    }
  }, [defaultTheme, enableSystem]);

  // apply + persist
  useEffect(() => {
    try {
      // persist
      localStorage.setItem("hh_theme", theme);
      // apply to <html>
      document.documentElement.dataset.theme = theme;
      if (attribute === "class") {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
      }
    } catch {}
  }, [theme, attribute]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

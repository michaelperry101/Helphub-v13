"use client";

// Minimal ThemeProvider shim
// We already set the theme in app/layout.js via a <Script>.
// This just returns children so your layout still works.

export function ThemeProvider({ children }) {
  return children;
}

"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const SidebarCtx = createContext(null);

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close = useCallback(() => setOpen(false), []);

  // Reflect state on <html> so CSS can animate hamburger + sidebar together.
  useEffect(() => {
    const el = document.documentElement;
    if (open) el.setAttribute("data-sidebar", "open");
    else el.removeAttribute("data-sidebar");
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SidebarCtx.Provider value={{ open, setOpen, toggle, close }}>
      {children}
    </SidebarCtx.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarCtx);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

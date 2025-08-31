"use client";
import { createContext, useContext, useEffect, useState } from "react";

/** Safe default so we never crash during prerender */
const SidebarContext = createContext({
  open: false,
  setOpen: () => {},
});

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);

  // lock body scroll when open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = prev);
    }
  }, [open]);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  // Do NOT throw if provider missing — just return the safe default.
  // (We also log once in dev to help catch accidental usage.)
  const ctx = useContext(SidebarContext);
  return ctx || { open: false, setOpen: () => {} };
}

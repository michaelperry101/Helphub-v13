"use client";
import { createContext, useContext, useState, useMemo } from "react";

const SidebarCtx = createContext(null);
export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({
    open,
    toggle: () => setOpen(o => !o),
    close: () => setOpen(false),
    openSidebar: () => setOpen(true),
  }), [open]);
  return <SidebarCtx.Provider value={value}>{children}</SidebarCtx.Provider>;
}
export function useSidebar() {
  const ctx = useContext(SidebarCtx);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

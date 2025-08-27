'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const SidebarCtx = createContext(null);

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen(v => !v), []);
  const close = useCallback(() => setOpen(false), []);
  const openSidebar = useCallback(() => setOpen(true), []);
  return (
    <SidebarCtx.Provider value={{ open, toggle, close, openSidebar }}>
      {children}
    </SidebarCtx.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarCtx);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}

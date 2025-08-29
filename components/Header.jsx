"use client";
import { useSidebar } from "./SidebarContext";

export default function Header() {
  const { toggle } = useSidebar();
  return (
    <header className="app-header">
      <button
        className="hamburger"
        aria-label="Open menu"
        onClick={toggle}
        type="button"
      >
        ☰
      </button>

      <a href="/" className="logo-link" aria-label="HelpHub247 Home">
        <img src="/logo.png" alt="HelpHub247" />
      </a>

      {/* right side spacer */}
      <div style={{ width: 40 }} />
    </header>
  );
}

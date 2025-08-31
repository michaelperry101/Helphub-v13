"use client";
import Link from "next/link";
import { useSidebar } from "@/components/SidebarContext";

export default function Header() {
  const { open, toggle } = useSidebar();

  return (
    <header className="site-header">
      {/* Animated hamburger tied to sidebar state */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        className="hamburger"
        onClick={toggle}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Centered logo – ensure /public/logo.png or logo.svg exists */}
      <Link href="/" className="logo-link" prefetch={false}>
        <img src="/logo.png" alt="HelpHub247" />
      </Link>

      <div className="header-right" />
    </header>
  );
}

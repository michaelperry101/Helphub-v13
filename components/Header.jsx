// components/Header.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/components/SidebarContext";

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="header">
      <div className="header-inner">
        {/* hamburger (left) */}
        <button
          aria-label="Open menu"
          className="hamburger"
          onClick={toggle}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        {/* centered logo (go home) */}
        <Link href="/" className="logo-link" aria-label="Go to Home">
          {/* expects /public/logo.png */}
          <Image
            src="/logo.png"
            alt="HelpHub 24/7"
            width={150}
            height={40}
            priority
          />
        </Link>
      </div>
    </header>
  );
}

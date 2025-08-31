// components/Header.jsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <button id="hamburger" aria-label="Open menu" className="hamburger">
        <span />
        <span />
        <span />
      </button>

      <div className="logo-wrap">
        <Link href="/" className="logo-link" aria-label="Go home">
          <img src="/logo.png" alt="HelpHub247" />
        </Link>
      </div>
    </header>
  );
}

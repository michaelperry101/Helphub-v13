// components/Sidebar.jsx
"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <aside className="sidebar" role="navigation" aria-label="Main">
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/chat">Chat</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><a href="mailto:hello@helphub247.com">Contact</a></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button
            className="theme-toggle"
            onClick={() => {
              const r = document.documentElement;
              const next = r.dataset.theme === "dark" ? "light" : "dark";
              r.dataset.theme = next;
              try { localStorage.setItem("hh_theme", next); } catch (e) {}
            }}
          >
            Toggle theme
          </button>
        </div>
      </aside>

      {/* Clickable backdrop to close the drawer */}
      <div className="overlay" aria-hidden="true" />
    </>
  );
}

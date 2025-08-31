// components/Sidebar.jsx
"use client";

import Link from "next/link";
import { useSidebar } from "./SidebarContext";

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav className="menu">
        <Link href="/" className="menu-btn" onClick={toggle}>
          🏠 Home
        </Link>
        {/* New Chat button with timestamp */}
        <a
          href={`/chat?ts=${Date.now()}`}
          className="menu-btn"
          onClick={toggle}
        >
          ＋ New Chat
        </a>
        <Link href="/about" className="menu-btn" onClick={toggle}>
          ℹ️ About
        </Link>
        <Link href="/settings" className="menu-btn" onClick={toggle}>
          ⚙️ Settings
        </Link>
      </nav>
    </aside>
  );
}

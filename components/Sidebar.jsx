"use client";
import Link from "next/link";
import { useSidebar } from "@/components/SidebarContext";

const items = [
  { href: "/chat", label: "New Chat", icon: "💬" },
  { href: "/about", label: "About Carys", icon: "👩‍💼" },
  { href: "/reviews", label: "Reviews", icon: "⭐" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
  { href: "/subscribe", label: "Subscribe", icon: "💎" },
  { href: "/privacy", label: "Privacy", icon: "🔒" },
  { href: "/terms", label: "Terms", icon: "📜" },
];

export default function Sidebar() {
  const { open, close, toggle } = useSidebar();

  return (
    <>
      {/* Clickable overlay */}
      <div className="sidebar-overlay" onClick={close} />

      <aside className="sidebar">
        <div className="sidebar-head">
          <button className="hamburger small" aria-label="Close menu" onClick={toggle}>
            <span />
            <span />
            <span />
          </button>
          <span className="side-title">Menu</span>
        </div>

        <ul className="side-list">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} onClick={close} className="side-pill">
                <span className="ico">{it.icon}</span>
                <span>{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

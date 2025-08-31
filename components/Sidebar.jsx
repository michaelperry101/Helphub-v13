"use client";
import Link from "next/link";
import { useSidebar } from "@/components/SidebarContext";
import { usePathname } from "next/navigation";

const items = [
  { href: "/chat", label: "New Chat", icon: "💬" },
  { href: "/about", label: "About Carys", icon: "👩‍💼" },
  { href: "/reviews", label: "Reviews", icon: "⭐" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
  { href: "/help", label: "Help & FAQs", icon: "❓" },
  { href: "/privacy", label: "Privacy", icon: "🔐" },
  { href: "/terms", label: "Terms", icon: "📄" },
  { href: "/subscribe", label: "Subscribe", icon: "💎" },
];

export default function Sidebar() {
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      <div
        className={`sidebar-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`sidebar ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <nav>
          <ul className="menu-bubbles">
            {items.map((it) => {
              const active = pathname === it.href;
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className={`bubble ${active ? "active" : ""}`}
                    onClick={() => setOpen(false)}
                    prefetch={false}
                  >
                    <span className="ico" aria-hidden="true">{it.icon}</span>
                    <span className="txt">{it.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

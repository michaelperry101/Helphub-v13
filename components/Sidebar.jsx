// components/Sidebar.jsx
"use client";
import Link from "next/link";
import { useSidebar } from "@/components/SidebarContext";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/chat", label: "Chat", icon: "💬" },
  { href: "/reviews", label: "Reviews", icon: "⭐" },
  { href: "/about", label: "About Carys", icon: "👤" },
  { href: "/terms", label: "Terms", icon: "📄" },
  { href: "/privacy", label: "Privacy", icon: "🛡️" },
  { href: "/billing", label: "Billing", icon: "💳" },
  { href: "/subscribe", label: "Subscribe", icon: "➕" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const { open, close } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* backdrop */}
      <div
        className={`backdrop ${open ? "show" : ""}`}
        onClick={close}
        aria-hidden={!open}
      />
      <aside className={`sidebar ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <nav className="menu">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`menu-pill ${active ? "active" : ""}`}
                onClick={close}
              >
                <span className="pill-ico" aria-hidden>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">© {new Date().getFullYear()} HelpHub247</div>
      </aside>
    </>
  );
}

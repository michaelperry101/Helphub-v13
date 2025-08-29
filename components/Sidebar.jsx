"use client";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

const items = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Carys" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/settings", label: "Settings" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/reviews", label: "Reviews" },
];

export default function Sidebar() {
  const { open, close } = useSidebar();
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${open ? "open" : ""}`} aria-hidden={!open}>
      <nav>
        <ul className="menu">
          {items.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className={pathname === item.href ? "active" : ""}
                onClick={close}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

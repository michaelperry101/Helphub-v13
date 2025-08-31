"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import Image from "next/image";

const items = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/chat", label: "Chat now", icon: MessageIcon, accent: true },
  { href: "/about", label: "About Carys", icon: InfoIcon },
  { href: "/faq", label: "Help / FAQ", icon: HelpIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  function go(href) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      {/* Backdrop */}
      <button
        aria-label="Close menu"
        className={`sb-backdrop ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <aside className={`sb-panel ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="sb-head">
          <div className="sb-brand">
            <Image
              src="/logo.png"
              width={36}
              height={36}
              alt="HelpHub247"
              priority
            />
            <div className="sb-brandtext">
              <span>HelpHub</span>
              <em>24/7</em>
            </div>
          </div>
          <button className="sb-close" onClick={() => setOpen(false)} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <nav className="sb-nav" role="navigation" aria-label="Primary">
          {items.map(({ href, label, icon: Icon, accent }) => {
            const active = pathname === href;
            return (
              <button
                key={href}
                className={`sb-link ${active ? "active" : ""} ${accent ? "accent" : ""}`}
                onClick={() => go(href)}
              >
                <span className="sb-ico"><Icon /></span>
                <span className="sb-text">{label}</span>
                {active && <span className="sb-pill">Now</span>}
              </button>
            );
          })}
        </nav>

        <div className="sb-footer">
          <a
            href="mailto:support@helphub247.co.uk"
            className="sb-support"
            aria-label="Email support"
          >
            <SupportIcon />
            <span>Support</span>
          </a>
          <p className="sb-small">v13 • crafted for speed & polish</p>
        </div>
      </aside>
    </>
  );
}

/* ===== Tiny inline icons (no extra deps) ===== */
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15a3 3 0 0 1-3 3H9l-4 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6M12 7h.01" />
    </svg>
  );
}
function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 4.2 2c-.9.7-1.2 1.1-1.2 2" />
      <path d="M12 17h.01" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.6 1.6 0 0 0 .32 1.76l.05.06a2 2 0 0 1-2.83 2.83l-.06-.05A1.6 1.6 0 0 0 15 19.4a1.6 1.6 0 0 0-1 .2 1.6 1.6 0 0 0-.8 1.4V21a2 2 0 0 1-4 0v-.06a1.6 1.6 0 0 0-.8-1.4 1.6 1.6 0 0 0-1-.2 1.6 1.6 0 0 0-1.76.32l-.06.05a2 2 0 1 1-2.83-2.83l.05-.06A1.6 1.6 0 0 0 4.6 15a1.6 1.6 0 0 0-.2-1 1.6 1.6 0 0 0-1.4-.8H3a2 2 0 0 1 0-4h.06a1.6 1.6 0 0 0 1.4-.8 1.6 1.6 0 0 0 .2-1 1.6 1.6 0 0 0-.32-1.76l-.05-.06A2 2 0 1 1 6.12 2.7l.06.05A1.6 1.6 0 0 0 7 4.6c0 .36.07.7.2 1a1.6 1.6 0 0 0 .8.8c.3.13.64.2 1 .2s.7-.07 1-.2a1.6 1.6 0 0 0 .8-.8c.13-.3.2-.64.2-1V3a2 2 0 0 1 4 0v.06c0 .6.31 1.14.8 1.4.3.13.64.2 1 .2.36 0 .7-.07 1-.2.3-.13.64-.2 1-.2.6 0 1.14-.31 1.4-.8l.05-.06A2 2 0 1 1 21.3 6.12l-.05.06A1.6 1.6 0 0 0 19.4 7c-.36 0-.7.07-1 .2a1.6 1.6 0 0 0-.8.8c-.13.3-.2.64-.2 1s.07.7.2 1c.13.3.4.58.8.8.3.13.64.2 1 .2Z" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1.8">
      <path d="M7 10a5 5 0 0 1 10 0v6a3 3 0 0 1-3 3h-1" />
      <path d="M7 10v6a3 3 0 0 0 3 3h1" />
    </svg>
  );
}

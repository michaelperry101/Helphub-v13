"use client";
import Link from "next/link";
import { useSidebar } from "@/components/SidebarContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <header className="site-header">
      {/* Sleek animated hamburger */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        className={`hamburger ${open ? "is-active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Centered logo (always routes home) */}
      <Link href="/" className="logo-link" prefetch={false}>
        <img src="/logo.svg" alt="logo.png" />
      </Link>

      {/* Right spacer to keep logo centered */}
      <div className="header-right" />
    </header>
  );
}

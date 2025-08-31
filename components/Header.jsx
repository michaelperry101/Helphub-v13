"use client";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";

export default function Header() {
  const { setOpen } = useSidebar();
  return (
    <header className="site-header">
      <button
        className="hamburger"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <Link href="/" className="logo-link" aria-label="Go home">
        <Image src="/logo.png" alt="HelpHub247" width={120} height={36} priority />
      </Link>
    </header>
  );
}

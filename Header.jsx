'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useSidebar } from '../components/SidebarContext';

export default function Header() {
  const { toggle } = useSidebar();

  useEffect(()=>{
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{});
    }
  }, []);

  return (
    <header className="header">
      <div className="header-inner">
        <button className="hamburger" aria-label="Open menu" onClick={toggle}>
          <Menu size={22} />
        </button>
        <Link href="/" className="logo-link" aria-label="HelpHub247 home">
          <img src="/logo.png" alt="HelpHub247" />
        </Link>
      </div>
    </header>
  );
}

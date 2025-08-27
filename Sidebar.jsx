'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '../components/SidebarContext';
import { Plus, Home, MessageCircle, Star, UserRound, ShieldCheck, FileText, CreditCard, Cog } from 'lucide-react';

const items = [
  { href: '/chat', icon: MessageCircle, label: 'Chat' },
  { href: '/', icon: Home, label: 'Home' },
  { href: '/reviews', icon: Star, label: 'Reviews' },
  { href: '/about', icon: UserRound, label: 'About Carys' },
  { href: '/terms', icon: FileText, label: 'Terms' },
  { href: '/privacy', icon: ShieldCheck, label: 'Privacy' },
  { href: '/subscribe', icon: CreditCard, label: 'Subscribe' },
  { href: '/settings', icon: Cog, label: 'Settings' }
];

export default function Sidebar() {
  const { open, close } = useSidebar();
  const pathname = usePathname();
  return (
    <>
      <div className={`sidebar-backdrop ${open ? 'open' : ''}`} onClick={close} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-body">
          <button className="bubble wide" onClick={()=>alert('New chat (demo)')}>
            <Plus /> <span>New chat</span>
          </button>
          <nav className="menu">
            {items.map(({href, icon:Icon, label}) => (
              <Link key={href} href={href} onClick={close} className={`bubble wide ${pathname===href ? 'active' : ''}`}>
                <Icon /> <span>{label}</span>
              </Link>
            ))}
          </nav>
          <footer className="sidefoot">© {new Date().getFullYear()} Helphub247</footer>
        </div>
      </aside>
    </>
  );
}

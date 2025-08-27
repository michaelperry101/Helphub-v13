import './globals.css';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { SidebarProvider } from '../components/SidebarContext';

export const metadata = {
  title: 'HelpHub247 — Carys',
  description: '24/7 AI assistant',
  manifest: '/manifest.webmanifest'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Header />
          <Sidebar />
          <div className="page">{children}</div>
        </SidebarProvider>
      </body>
    </html>
  );
}

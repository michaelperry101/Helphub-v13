// app/layout.js
import "./globals.css";
import Script from "next/script";

// NOTE: layout.js is inside /app, so components at project root are one level up:
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ThemeProvider } from "../components/ThemeProvider";
import { SidebarProvider } from "../components/SidebarContext";

export const metadata = {
  title: "HelpHub247",
  description: "Your AI-powered assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply saved theme before hydration */}
        <Script id="set-theme" strategy="beforeInteractive">
          {`
            try {
              var t = localStorage.getItem('hh_theme') || 'light';
              document.documentElement.dataset.theme = t;
            } catch (e) {}
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SidebarProvider>
            <div className="app-shell">
              <Sidebar />
              <div className="app-main">
                <Header />
                <main className="app-content">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

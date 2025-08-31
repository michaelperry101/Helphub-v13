// app/layout.js
import "./globals.css";
import { SidebarProvider } from "@/components/SidebarContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Script from "next/script";

export const metadata = {
  title: "HelpHub247",
  description: "Instant help. Voice + chat, always on.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* theme-prevent flash */}
        <Script id="set-theme" strategy="beforeInteractive">
          {`
            try {
              var t = localStorage.getItem('hh_theme') || 'light';
              document.documentElement.dataset.theme = t;
            } catch(e) {}
          `}
        </Script>
      </head>
      <body>
        <SidebarProvider>
          <Header />
          <Sidebar />
          <main className="app-content">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}

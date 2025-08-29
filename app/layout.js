// app/layout.js
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "../components/ThemeProvider";
import { SidebarProvider } from "../components/SidebarContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export const metadata = {
  title: "HelpHub247",
  description: "Your AI-powered assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash before hydration */}
        <Script id="set-theme" strategy="beforeInteractive">
          {`
            try {
              var t = localStorage.getItem('hh_theme') || 'light';
              document.documentElement.dataset.theme = t;
            } catch (e) {}
          `}
        </Script>

        {/* ElevenLabs Convai widget script (for your embedded mic) */}
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeProvider defaultTheme="light">
          <SidebarProvider>
            <Header />
            <Sidebar />
            <main className="app-content">{children}</main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

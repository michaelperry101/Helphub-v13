// app/layout.js
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/SidebarContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Script from "next/script";

export const metadata = {
  title: "HelpHub247",
  description: "Your AI-powered assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Run before hydration to prevent theme flash */}
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
            <Header />
            <Sidebar />
            <main className="app-content">{children}</main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

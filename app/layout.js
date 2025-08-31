// app/layout.js
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "HelpHub247",
  description: "Instant help. Voice + chat, always on.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {/* Prevent theme flash; simple light mode default */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('hh_theme') || 'light';
                document.documentElement.dataset.theme = t;
              } catch(e){}
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <Sidebar />
        <main className="page-container">{children}</main>

        {/* Small global script to toggle the sidebar and close on route/link click */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                const doc = document;
                doc.addEventListener('click', (e)=>{
                  const t = e.target;
                  if(t && t.closest && t.closest('#hamburger')){
                    e.preventDefault();
                    doc.body.classList.toggle('nav-open');
                  }
                  if(t && t.closest && t.closest('.sidebar a')){
                    doc.body.classList.remove('nav-open');
                  }
                  if(t && t.classList && t.classList.contains('overlay')){
                    doc.body.classList.remove('nav-open');
                  }
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

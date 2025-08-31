// app/page.js
export const metadata = { title: "HelpHub 24/7" };

export default function Home() {
  return (
    <main className="hh-home">
      <section className="hh-hero" aria-labelledby="hh-title">
        <img
          src="/logo.png"
          alt="HelpHub 24/7"
          className="hh-hero__logo"
          width={64}
          height={64}
        />
        <h1 id="hh-title" className="hh-hero__title">HelpHub 24/7</h1>
        <p className="hh-hero__tagline">Instant help. Voice + chat, always on.</p>
        <a href="/chat" className="hh-btn">Chat now</a>
      </section>
    </main>
  );
}

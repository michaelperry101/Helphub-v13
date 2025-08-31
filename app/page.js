// app/page.js
export const metadata = { title: "HelpHub 24/7" };

export default function Home() {
  return (
    <main className="home">
      <section className="hero-compact" aria-labelledby="hh-title">
        <img
          src="/logo.png"
          alt="HelpHub 24/7"
          className="hero-compact__logo"
          width={72}
          height={72}
        />

        <h1 id="hh-title" className="hero-compact__title">
          HelpHub 24/7
        </h1>

        <p className="hero-compact__tagline">
          Instant help. Voice + chat, always on.
        </p>

        <a className="btn-primary" href="/chat">
          Chat now
        </a>
      </section>
    </main>
  );
}

// app/page.jsx
import Link from "next/link";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <img src="/logo.png" alt="HelpHub247" className="hero-logo" />
        <h1>HelpHub 24/7</h1>
        <p className="lead">Instant help. Voice + chat, always on.</p>
        <Link href="/chat" className="cta-primary">Chat now</Link>
      </div>
    </section>
  );
}

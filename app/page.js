// app/page.js
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="home-landing">
      <section className="landing-hero">
        <Image
          src="/logo.png"
          alt="HelpHub247"
          width={132}
          height={132}
          priority
        />
        <h1 className="hero-title">HelpHub 24/7</h1>
        <p className="hero-tag">Instant help. Voice + chat, always on.</p>

        <Link href="/chat" className="cta-primary">
          Chat now
        </Link>
      </section>
    </main>
  );
}

// app/page.js
"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
  // hide ElevenLabs' floating launcher everywhere on this page
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__ELEVENLABS_HIDE_LAUNCHER__ = true;
    }
  }, []);

  return (
    <div className="home">
      {/* Load ElevenLabs SDK only on this page */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        strategy="afterInteractive"
      />

      {/* Center section */}
      <section className="hero">
        <Image
          src="/logo.png"          // transparent HelpHub247 logo in /public
          alt="HelpHub247"
          width={140}
          height={140}
          priority
        />
        <h1 className="hero-title">HelpHub 24/7</h1>
        <p className="hero-tag">Instant help. Voice + chat, always on.</p>
      </section>

      {/* Bottom “chat bar” powered by ElevenLabs */}
      <div className="inline-voicebar">
        <elevenlabs-convai agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"></elevenlabs-convai>
      </div>
    </div>
  );
}

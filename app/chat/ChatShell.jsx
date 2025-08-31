// app/chat/ChatShell.jsx
"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ChatShell() {
  // Hide any ElevenLabs floating launcher that might appear
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__ELEVENLABS_HIDE_LAUNCHER__ = true;
    }
  }, []);

  return (
    <div className="chat-screen">
      {/* Load the ElevenLabs embed script on this page only */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        strategy="afterInteractive"
      />

      {/* Header */}
      <header className="chat-header">
        <h1>Carys</h1>
        <span className="muted">Voice-first assistant</span>
      </header>

      {/* Scrollable transcript area (for future text transcripts / tips) */}
      <section className="chat-transcript" />

      {/* Bottom bar: ElevenLabs voice bar embedded inline */}
      <div className="voicebar">
        {/* Your agent id goes here */}
        <elevenlabs-convai agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"></elevenlabs-convai>
      </div>
    </div>
  );
}

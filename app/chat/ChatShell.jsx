// app/chat/ChatShell.jsx
"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ChatShell() {
  // Hide any default floating launcher ElevenLabs injects
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.ELEVENLABS_CONVAI_SETTINGS = { launcher: { show: false } };
    }
  }, []);

  return (
    <div className="chat-screen">
      {/* Load the ElevenLabs embed script only on /chat */}
      <Script
        id="el-embed"
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        strategy="afterInteractive"
      />

      {/* Page header (simple, clean) */}
      <header className="chat-header">
        <h1>Carys</h1>
        <span className="muted">Voice-first assistant</span>
      </header>

      {/* Scrollable area (ready for future transcripts/messages) */}
      <section className="chat-transcript" />

      {/* Bottom “chat bar” — inline ElevenLabs element */}
      <div className="voicebar">
        <elevenlabs-convai
          agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
          mode="embedded"
          use-default-styles="false"
          style={{ display: "block", width: "100%", height: "64px" }}
        ></elevenlabs-convai>
      </div>
    </div>
  );
}

// app/chat/page.js
"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ChatPage() {
  // As an extra safety, if a floating launcher sneaks in, remove it.
  useEffect(() => {
    const kill = () => {
      const n1 = document.getElementById("elevenlabs-convai-root");
      const n2 = document.querySelector('elevenlabs-convai-launcher');
      n1?.remove();
      n2?.remove();
    };
    kill();
    const t = setInterval(kill, 500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="chat-screen">
      {/* 1) Configure BEFORE the library loads to disable the floating bubble */}
      <Script id="el-config" strategy="beforeInteractive">
        {`
          window.ELEVENLABS_CONVAI_SETTINGS = {
            launcher: { show: false },        // <- hide "Need help?" widget
            call_to_action: { show: false }   // <- hide any CTA pop
          };
        `}
      </Script>

      {/* 2) Load the library early so our config is respected */}
      <Script
        id="el-lib"
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="beforeInteractive"
        async
      />

      {/* Simple header for the chat page */}
      <header className="chat-header">
        <h1>Carys</h1>
        <span className="muted">Voice-first assistant</span>
      </header>

      {/* Scrollable conversation area (ready for future transcripts) */}
      <section className="chat-transcript" />

      {/* 3) Bottom “chat bar” — embedded ElevenLabs element in-line */}
      <div className="voicebar">
        <elevenlabs-convai
          agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
          mode="embedded"
          use-default-styles="false"
          style="display:block;width:100%;height:64px"
        ></elevenlabs-convai>
      </div>
    </div>
  );
}

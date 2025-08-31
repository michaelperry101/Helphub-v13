// components/Chat.jsx
"use client";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Chat() {
  const [key, setKey] = useState("default");

  // force fresh ElevenLabs session on ?ts=…
  useEffect(() => {
    try {
      const ts = new URLSearchParams(window.location.search).get("ts");
      setKey(ts || "default");
    } catch {}
  }, []);

  return (
    <div className="chat-wrap">
      {/* Load ElevenLabs SDK */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
        strategy="afterInteractive"
      />
      
      {/* Messages area (keep for consistency) */}
      <ul className="chat-list">
        <li className="msg assistant">
          <div className="bubble">
            Hi, I’m Carys (powered by ElevenLabs). Start talking to me below ↓
          </div>
        </li>
      </ul>

      {/* 🔥 Replaces old chat bar */}
      <div className="chat-inputbar eleven-chat">
        <elevenlabs-convai
          key={key}
          agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
        ></elevenlabs-convai>
      </div>
    </div>
  );
}

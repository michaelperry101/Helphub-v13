// components/Chat.jsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function Chat() {
  // Force a fresh inline session when you open "New Chat"
  const [sessionKey, setSessionKey] = useState("default");
  useEffect(() => {
    try {
      const ts = new URLSearchParams(window.location.search).get("ts");
      setSessionKey(ts || "default");
    } catch {}
  }, []);

  // BEFORE loading their script, set a guard that tells it NOT to mount the floating launcher
  useEffect(() => {
    // Many embeds respect a global “disable launcher” flag; if not, our CSS below still hides it
    window.__ELEVENLABS_HIDE_LAUNCHER__ = true;
  }, []);

  return (
    <div className="chat-wrap">
      {/* Top area – you can keep history here if you want */}
      <ul className="chat-list">
        <li className="msg assistant">
          <div className="bubble">
            Hi, I’m Carys (voice). Tap the bar below to talk to me.
          </div>
        </li>
      </ul>

      {/* Load the SDK only on this page */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        strategy="afterInteractive"
      />

      {/* INLINE ElevenLabs replaces your old input bar */}
      <div className="chat-inputbar eleven-inline">
        <elevenlabs-convai
          key={sessionKey}
          agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
        ></elevenlabs-convai>
      </div>
    </div>
  );
}

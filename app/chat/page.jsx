// app/chat/page.jsx
"use client";

import Script from "next/script";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="chat-page">
      <header className="chat-header">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="HelpHub247" height={28} />
        </Link>
        <h1 className="visually-hidden">Chat with Carys</h1>
      </header>

      <main className="chat-main" />

      {/* ElevenLabs widget — your NEW agent id */}
      <elevenlabs-convai
        agent-id="agent_3001k3vq n59yfb6tmb5mjjwd17jc"
      ></elevenlabs-convai>

      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      />
    </div>
  );
}

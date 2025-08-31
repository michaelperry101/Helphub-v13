// app/chat/page.jsx
"use client";

import Script from "next/script";

export const metadata = { title: "Chat — Carys (Voice)" };

export default function ChatPage() {
  return (
    <section className="chat-screen">
      {/* The chat area stays clean; widget sits inside the page content */}
      <div className="chat-stage" />

      {/* ElevenLabs widget (your agent) */}
      <elevenlabs-convai
        agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
      ></elevenlabs-convai>

      {/* Widget script – loaded only on this route */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      />
    </section>
  );
}

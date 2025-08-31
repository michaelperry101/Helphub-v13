// app/chat/page.jsx
import Script from "next/script";

export const metadata = { title: "Chat — Carys (Voice)" };

export default function ChatPage() {
  return (
    <section className="chat-screen">
      {/* Space so the widget isn't overlapped */}
      <div className="chat-stage" />

      {/* ElevenLabs embed (your agent) */}
      <elevenlabs-convai
        agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
      ></elevenlabs-convai>

      {/* Load the widget script only on this page */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      />
    </section>
  );
}

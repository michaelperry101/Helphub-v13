"use client";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export const metadata = { title: "Chat — Carys (Voice)" };

export default function ChatPage() {
  // Using ts forces a new mount so the widget starts a fresh session
  const ts = useSearchParams().get("ts");

  // (Optional) scroll to top on mount for mobile
  useEffect(() => {
    try { window.scrollTo(0, 0); } catch {}
  }, [ts]);

  return (
    <div className="page chat-page">
      {/* ElevenLabs widget script */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      />

      {/* Voice widget is the entire chat experience */}
      <div className="voice-only-wrap">
        {/* The agent *is* Carys */}
        <elevenlabs-convai
          key={ts || "default"}               // remounts when ts changes
          agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
        ></elevenlabs-convai>
      </div>
    </div>
  );
}

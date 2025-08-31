// app/chat/ChatVoice.jsx (CLIENT)
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function ChatVoice() {
  const [key, setKey] = useState("default");

  // Read ?ts from the URL on the client to force a fresh session (no useSearchParams)
  useEffect(() => {
    try {
      const ts = new URLSearchParams(window.location.search).get("ts");
      setKey(ts || "default");
      window.scrollTo(0, 0);
    } catch {}
  }, []);

  return (
    <>
      {/* ElevenLabs ConvAI widget loader */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
        strategy="afterInteractive"
      />
      {/* The voice widget IS Carys */}
      <elevenlabs-convai
        key={key} // remounts on new ?ts
        agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
      ></elevenlabs-convai>
    </>
  );
}

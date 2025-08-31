// app/chat/ChatVoice.jsx  (CLIENT component)
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ChatVoice() {
  const ts = useSearchParams().get("ts");

  // Optional: scroll to top on mount for mobile polish
  useEffect(() => {
    try { window.scrollTo(0, 0); } catch {}
  }, [ts]);

  return (
    <elevenlabs-convai
      key={ts || "default"}                // new session on New Chat
      agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
    ></elevenlabs-convai>
  );
}

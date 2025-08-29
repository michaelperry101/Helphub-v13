"use client";
import { useEffect } from "react";

export default function ConvaiWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return (
    <elevenlabs-convai
      agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    ></elevenlabs-convai>
  );
}

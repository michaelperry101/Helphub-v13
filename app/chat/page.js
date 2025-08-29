// app/chat/page.js
import dynamic from "next/dynamic";

// Ensure this loads YOUR components/Chat.jsx file (client-only)
const Chat = dynamic(() => import("../../components/Chat"), { ssr: false });

export const metadata = { title: "Chat — Carys" };

export default function ChatPage() {
  return (
    <div className="page chat-page" style={{ position: "relative", minHeight: "100vh" }}>
      <Chat />
    </div>
  );
}
import dynamic from "next/dynamic";
const ConvaiWidget = dynamic(() => import("../../components/ConvaiWidget"), {
  ssr: false,
});

export const metadata = { title: "Chat — Carys" };

export default function ChatPage() {
  return (
    <div className="page chat-page">
      {/* Your existing Chat UI if you want to keep it */}
      {/* <Chat /> */}

      {/* ElevenLabs AI Voice Agent */}
      <ConvaiWidget />
    </div>
  );
}

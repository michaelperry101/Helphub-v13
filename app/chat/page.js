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

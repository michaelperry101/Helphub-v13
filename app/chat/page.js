// app/chat/page.js
import dynamic from "next/dynamic";
const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

export const metadata = { title: "Chat — Carys" };

export default function ChatPage() {
  return (
    <div className="page chat-page">
      <Chat />
      {/* ElevenLabs floating widget (markup). Script is loaded globally in layout.js */}
      <elevenlabs-convai agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"></elevenlabs-convai>
    </div>
  );
}

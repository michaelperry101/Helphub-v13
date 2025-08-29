import dynamic from "next/dynamic";
const Chat = dynamic(() => import("../../components/Chat"), { ssr: false });

export const metadata = { title: "Chat — Carys" };

export default function ChatPage() {
  return (
    <div className="page chat-page">
      <Chat />
    </div>
  );
}

// app/chat/page.jsx  (SERVER component)
export const metadata = { title: "Chat — Carys (Voice)" };

import ChatVoice from "./ChatVoice"; // client child

export default function ChatPage() {
  return (
    <div className="page chat-page">
      <div className="voice-only-wrap">
        <ChatVoice />
      </div>
    </div>
  );
}

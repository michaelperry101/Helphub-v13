// app/chat/page.jsx (SERVER)
export const metadata = { title: "Chat — Carys (Voice)" };
export const dynamic = "force-dynamic"; // don't prerender; avoids CSR bailout

import { Suspense } from "react";
import ChatVoice from "./ChatVoice"; // client component below

export default function ChatPage() {
  return (
    <div className="page chat-page">
      <div className="voice-only-wrap">
        <Suspense
          fallback={
            <div style={{ padding: 16, textAlign: "center" }}>
              Loading Carys…
            </div>
          }
        >
          <ChatVoice />
        </Suspense>
      </div>
    </div>
  );
}

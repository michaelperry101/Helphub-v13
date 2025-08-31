// app/chat/page.js
import dynamic from "next/dynamic";

export const metadata = { title: "Chat — HelpHub 24/7" };

// Load client shell only in the browser
const ChatShell = dynamic(() => import("./ChatShell"), { ssr: false });

export default function ChatPage() {
  return <ChatShell />;
    }

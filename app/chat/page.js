// app/chat/page.js
// Server component shell + client chat
import dynamic from "next/dynamic";

export const metadata = { title: "Chat — HelpHub 24/7" };

// Load the client shell only in the browser
const ChatShell = dynamic(() => import("./ChatShell"), { ssr: false });

export default function ChatPage() {
  return <ChatShell />;
    }

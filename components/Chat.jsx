"use client";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Carys. How can I help today?" },
  ]);
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendText(text) {
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const err = data?.error || "Request failed";
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${err}` }]);
        return;
      }

      const reply = data?.reply || "…";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);

      // Optional voice: try a UK voice if available
      try {
        if ("speechSynthesis" in window) {
          const u = new SpeechSynthesisUtterance(reply);
          const uk = window.speechSynthesis.getVoices().find(v => /en-GB/i.test(v.lang));
          if (uk) u.voice = uk;
          window.speechSynthesis.speak(u);
        }
      } catch {}
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `⚠️ Network error: ${err?.message || err}` },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-wrap">
      <ul className="chat-list" ref={listRef}>
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role}>
            {m.content}
          </MessageBubble>
        ))}
      </ul>

      {/* bottom bar */}
      <ChatInput onSend={sendText} sending={sending} />
    </div>
  );
}
async function playCarys(text, voiceId = "Rachel") {
  try {
    const res = await fetch("/api/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voiceId }), // swap voiceId for a UK voice when you pick one
    });
    if (!res.ok) return;

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play().catch(() => {});
  } catch {}
}

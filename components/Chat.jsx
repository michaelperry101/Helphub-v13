"use client";

import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Carys. How can I help today?" },
  ]);
  const [sending, setSending] = useState(false);
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("hh_muted") === "1";
    } catch {
      return false;
    }
  });

  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem("hh_muted", muted ? "1" : "0");
    } catch {}
  }, [muted]);

  async function speak(text) {
    if (muted || !text?.trim()) return;
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: "alloy", // try "verse" or "copper" for different tone
          format: "mp3",
        }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play().catch(() => {});
    } catch {}
  }

  async function handleSend(text) {
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
        const err =
          data?.error ||
          data?.message ||
          "I couldn’t generate a response. Please try again.";
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${err}` }]);
      } else {
        const reply = data?.reply || "…";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
        speak(reply);
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `⚠️ Network error: ${err?.message || err}`,
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-wrap">
      <ul className="chat-list" ref={listRef}>
        {messages.map((m, i) => (
          <li key={i} className={`msg ${m.role}`}>
            <MessageBubble role={m.role} content={m.content} />
          </li>
        ))}
      </ul>

      <ChatInput
        onSend={handleSend}
        sending={sending}
        muted={muted}
        onToggleMute={() => setMuted((v) => !v)}
      />
    </div>
  );
}

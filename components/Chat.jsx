// components/Chat.jsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Carys. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    // auto-scroll to bottom on new messages
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json();
      if (!res.ok) {
        const err = data?.error || "Request failed";
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${err}` }]);
      } else {
        const reply = data?.reply || "…";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);

        // Optional: speak with a British voice if available
        try {
          const saved = JSON.parse(localStorage.getItem("hh_voice") || "true");
          if (saved && typeof window !== "undefined" && "speechSynthesis" in window) {
            const u = new SpeechSynthesisUtterance(reply);
            // pick an en-GB voice if available
            const voices = window.speechSynthesis.getVoices();
            const uk = voices.find((v) => /en-GB/i.test(v.lang));
            if (uk) u.voice = uk;
            window.speechSynthesis.speak(u);
          }
        } catch {}
      }
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
          <li key={i} className={`msg ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </li>
        ))}
      </ul>

      <form className="chat-inputbar" onSubmit={sendMessage}>
        <label className="icon-btn" title="Attach file">
          <input type="file" hidden />
          📎
        </label>
        <label className="icon-btn" title="Upload image">
          <input type="file" accept="image/*" hidden />
          🖼️
        </label>
        <input
          className="chat-input"
          placeholder={sending ? "Carys is thinking..." : "Message Carys…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button className="send-btn" disabled={sending || !input.trim()}>
          {sending ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}

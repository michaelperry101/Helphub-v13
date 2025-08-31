// components/Chat.jsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Carys. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [muted, setMuted] = useState(false);
  const listRef = useRef(null);

  // auto-scroll
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e?.preventDefault?.();
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

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errText =
          data?.error ||
          (data?.message ? `Error: ${data.message}` : "Request failed");
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${errText}` }]);
      } else {
        const reply = data?.reply || "…";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);

        if (!muted && typeof window !== "undefined" && "speechSynthesis" in window) {
          try {
            const u = new SpeechSynthesisUtterance(reply);
            const uk = window.speechSynthesis
              .getVoices()
              .find((v) => /en-GB/i.test(v.lang));
            if (uk) u.voice = uk;
            u.rate = 1.03;
            u.pitch = 1.02;
            window.speechSynthesis.speak(u);
          } catch {}
        }
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

      {/* input bar */}
      <form className="chat-inputbar" onSubmit={sendMessage}>
        <label className="icon-btn" title="Upload image">
          <input type="file" accept="image/*" hidden />
          🖼️
        </label>
        <label className="icon-btn" title="Attach file">
          <input type="file" hidden />
          📎
        </label>

        <input
          className="chat-input"
          placeholder={sending ? "Carys is thinking..." : "Message Carys…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />

        {/* mute toggle replaces old export button */}
        <button
          className={`icon-btn ${muted ? "muted" : ""}`}
          type="button"
          onClick={() => setMuted((m) => !m)}
          title={muted ? "Unmute Carys" : "Mute Carys"}
          aria-pressed={muted}
        >
          🔈
        </button>

        <button className="send-btn" disabled={sending || !input.trim()}>
          {sending ? "…" : "➤"}
        </button>
      </form>
    </div>
  );
}

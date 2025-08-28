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

  // Load mute preference once
  useEffect(() => {
    try {
      const m = localStorage.getItem("hh_mute") === "1";
      setMuted(m);
    } catch {}
  }, []);

  // Scroll to newest message
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem("hh_mute", next ? "1" : "0");
      if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // stop any ongoing speech immediately
      }
    } catch {}
  }

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
        const err = data?.error || "Request failed";
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${err}` }]);
      } else {
        const reply = data?.reply || "…";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);

        // Speak in British English if available, only when not muted
        try {
          if (!muted && typeof window !== "undefined" && "speechSynthesis" in window) {
            const u = new SpeechSynthesisUtterance(reply);
            const voices = window.speechSynthesis.getVoices();
            const enGB =
              voices.find((v) => /en-GB/i.test(v.lang)) ||
              voices.find((v) => /English/i.test(v.name));
            if (enGB) u.voice = enGB;
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
      {/* Mute toggle (icon-only) */}
      <button
        type="button"
        className={`mute-fab ${muted ? "is-muted" : ""}`}
        aria-label={muted ? "Unmute Carys" : "Mute Carys"}
        title={muted ? "Unmute Carys" : "Mute Carys"}
        onClick={toggleMute}
      >
        <span className="mute-fab-icon" aria-hidden="true">
          {muted ? "🔇" : "🔊"}
        </span>
      </button>

      {/* Messages */}
      <ul className="chat-list" ref={listRef}>
        {messages.map((m, i) => (
          <li key={i} className={`msg ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </li>
        ))}
      </ul>

      {/* Input bar */}
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
          disabled={sending}
          aria-label="Message input"
        />

        <button className="send-btn" disabled={sending || !input.trim()}>
          {sending ? "…" : "➤"}
        </button>
      </form>
    </div>
  );
}

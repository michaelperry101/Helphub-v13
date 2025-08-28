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

  // Load/save mute preference
  useEffect(() => {
    try {
      const m = localStorage.getItem("hh_mute") === "1";
      setMuted(m);
    } catch {}
  }, []);
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem("hh_mute", next ? "1" : "0");
      if (next && "speechSynthesis" in window) {
        // stop any current speech immediately
        window.speechSynthesis.cancel();
      }
    } catch {}
  };

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
        const err = data?.error || "Request failed";
        setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${err}` }]);
      } else {
        const reply = data?.reply || "…";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);

        // Speak only when NOT muted
        try {
          if (!muted && "speechSynthesis" in window) {
            const u = new SpeechSynthesisUtterance(reply);
            const uk = window.speechSynthesis.getVoices().find(v => /en-GB/i.test(v.lang));
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
      {/* Mute toggle — fixed at top-right of the chat page */}
      <button
        type="button"
        className="mute-toggle"
        aria-label={muted ? "Unmute Carys" : "Mute Carys"}
        title={muted ? "Unmute Carys" : "Mute Carys"}
        onClick={toggleMute}
      >
        <span className="mute-icon" aria-hidden>
          {muted ? "🔇" : "🔊"}
        </span>
        <span className="mute-text">{muted ? "Muted" : "Voice on"}</span>
      </button>

      <ul className="chat-list" ref={listRef}>
        {messages.map((m, i) => (
          <li key={i} className={`msg ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </li>
        ))}
      </ul>

      <form className="chat-inputbar" onSubmit={sendMessage}>
        <label className="icon-btn" title="Upload image">
          <input type="file" accept="image/*" hidden />
          🖼️
        </label>
        <label className="icon-btn" title="Attach file">
          <input type="file" hidden />
          📎
        </label>
        <button
          type="button"
          className="icon-btn"
          title="Upload"
          onClick={() => alert("Upload action placeholder")}
        >
          ⬇️
        </button>

        <input
          className="chat-input"
          placeholder={sending ? "Carys is thinking..." : "Message Carys…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />
        <button className="send-btn" disabled={sending || !input.trim()}>
          {sending ? "…" : "➤"}
        </button>
      </form>
    </div>
  );
}

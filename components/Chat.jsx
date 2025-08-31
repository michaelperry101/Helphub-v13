"use client";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Carys. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showVoice, setShowVoice] = useState(false); // <-- voice panel toggle
  const [muted, setMuted] = useState(false);         // <-- optional: mute TTS
  const listRef = useRef(null);

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

        // Optional built-in TTS (browser) for Carys if not muted
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
      {/* Messages */}
      <ul className="chat-list" ref={listRef}>
        {messages.map((m, i) => (
          <li key={i} className={`msg ${m.role}`}>
            <div className="bubble">{m.content}</div>
          </li>
        ))}
      </ul>

      {/* Slide-up ElevenLabs voice panel (integrated) */}
      <div className={`voice-panel ${showVoice ? "open" : ""}`}>
        {/* The widget element (script is loaded in layout.js) */}
        <elevenlabs-convai agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"></elevenlabs-convai>
      </div>

      {/* Input Bar */}
      <form className="chat-inputbar" onSubmit={sendMessage}>
        {/* Image picker */}
        <label className="icon-btn" title="Upload image">
          <input type="file" accept="image/*" hidden />
          🖼️
        </label>

        {/* File picker */}
        <label className="icon-btn" title="Attach file">
          <input type="file" hidden />
          📎
        </label>

        {/* Text input */}
        <input
          className="chat-input"
          placeholder={sending ? "Carys is thinking..." : "Message Carys…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
        />

        {/* Mute toggle (for the built-in browser TTS) */}
        <button
          type="button"
          className={`icon-btn ${muted ? "muted" : ""}`}
          title={muted ? "Unmute Carys voice" : "Mute Carys voice"}
          onClick={() => setMuted((m) => !m)}
          aria-pressed={muted}
        >
          {muted ? "🔇" : "🔊"}
        </button>

        {/* Voice widget toggle */}
        <button
          type="button"
          className="icon-btn"
          title={showVoice ? "Hide voice chat" : "Open voice chat"}
          onClick={() => setShowVoice((s) => !s)}
          aria-expanded={showVoice}
          aria-controls="carys-voice-panel"
        >
          🎤
        </button>

        {/* Send */}
        <button className="send-btn" disabled={sending || !input.trim()} title="Send">
          {sending ? "…" : "➤"}
        </button>
      </form>
    </div>
  );
}

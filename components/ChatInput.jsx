"use client";

import { useState, useRef } from "react";

export default function ChatInput({ onSend, sending, muted, onToggleMute }) {
  const [input, setInput] = useState("");
  const fileRef = useRef(null);
  const imageRef = useRef(null);

  function submit(e) {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text || sending) return;
    onSend(text);
    setInput("");
  }

  return (
    <form className="chat-inputbar" onSubmit={submit}>
      {/* image */}
      <label className="icon-btn" title="Upload image">
        <input ref={imageRef} type="file" accept="image/*" hidden />
        <span className="icon img" aria-hidden>🖼️</span>
      </label>

      {/* file */}
      <label className="icon-btn" title="Attach file">
        <input ref={fileRef} type="file" hidden />
        <span className="icon clip" aria-hidden>📎</span>
      </label>

      {/* Mute / Voice toggle (replaces export) */}
      <button
        type="button"
        className={`icon-btn mute ${muted ? "on" : ""}`}
        title={muted ? "Unmute Carys" : "Mute Carys"}
        onClick={onToggleMute}
        aria-pressed={muted}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <input
        className="chat-input"
        placeholder={sending ? "Carys is thinking..." : "Message Carys…"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={sending}
        aria-label="Message Carys"
      />

      <button className="send-btn" disabled={sending || !input.trim()}>
        {sending ? "…" : "Send"}
      </button>
    </form>
  );
}

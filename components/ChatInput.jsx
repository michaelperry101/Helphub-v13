"use client";

import { useState } from "react";

export default function ChatInput({ onSend, sending, muted, onToggleMute }) {
  const [input, setInput] = useState("");

  function submit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    onSend(text);
    setInput("");
  }

  return (
    <form
      onSubmit={submit}
      className="chat-inputbar flex items-center gap-2 px-3 py-2 border-t bg-white"
    >
      {/* Attach buttons */}
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-100"
        title="Upload image"
      >
        🖼️
      </button>

      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-100"
        title="Attach file"
      >
        📎
      </button>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={onToggleMute}
        className={`p-2 rounded-full hover:bg-gray-100 ${
          muted ? "text-red-500" : "text-green-600"
        }`}
        title={muted ? "Unmute Carys" : "Mute Carys"}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      {/* Input */}
      <input
        className="flex-1 px-3 py-2 rounded-full border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={sending ? "Carys is thinking..." : "Message Carys…"}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={sending}
      />

      {/* Send */}
      <button
        type="submit"
        disabled={sending || !input.trim()}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        ➤
      </button>
    </form>
  );
}

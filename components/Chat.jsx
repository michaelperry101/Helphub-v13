"use client";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Carys. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  // autoscroll to the newest message
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
        setMessages((m) => [
          ...m,
          { role: "assistant", content: `⚠️ ${err}` },
        ]);
      } else {
        const reply = data?.reply || "I couldn't generate a response.";
        setMessages((m) => [...m, { role: "assistant", content: reply }]);
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `⚠️ Network error: ${err?.message || String(err)}`,
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
            <div className="bubble">{m.content}</div>
          </li>
        ))}
      </ul>

      {/* Bottom composer */}
      <form className="compose" onSubmit={sendMessage}>
        {/* Left icon group */}
        <div className="compose-group">
          {/* Upload image */}
          <label className="compose-btn icon-image" title="Upload image">
            <input type="file" accept="image/*" hidden />
            🖼️
          </label>

          {/* Upload file */}
          <label className="compose-btn icon-file" title="Attach file">
            <input type="file" hidden />
            📎
          </label>

          {/* ElevenLabs mic embedded inline */}
          <div className="compose-btn compose-mic" title="Talk to Carys">
            <elevenlabs-convai agent-id="agent_3001k3vqn59yfb6tmb5mjwwd17jc"></elevenlabs-convai>
          </div>
        </div>

        {/* Text input */}
        <input
          className="compose-input"
          placeholder={sending ? "Carys is thinking…" : "Message Carys…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          aria-label="Message Carys"
        />

        {/* Send */}
        <button
          className="compose-send"
          disabled={sending || !input.trim()}
          aria-label="Send"
          type="submit"
        >
          ➤
        </button>
      </form>
    </div>
  );
}

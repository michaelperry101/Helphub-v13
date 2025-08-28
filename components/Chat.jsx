"use client";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I’m Carys. How can I help today?" },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // --- Mute (persists) ---
  const [muted, setMuted] = useState(false);
  useEffect(() => {
    try { setMuted(localStorage.getItem("hh_mute") === "1"); } catch {}
  }, []);
  function toggleMute() {
    const next = !muted;
    setMuted(next);
    try {
      localStorage.setItem("hh_mute", next ? "1" : "0");
      if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch {}
  }

  // --- Autoscroll ---
  const listRef = useRef(null);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Send ---
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

        // Speak (British) only if not muted
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
    <div className="chat-wrap" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Messages */}
      <ul
        className="chat-list"
        ref={listRef}
        style={{
          listStyle: "none",
          margin: 0,
          padding: "16px 0 96px", // bottom space for input bar
          minHeight: "100vh",
        }}
      >
        {messages.map((m, i) => (
          <li key={i} className={`msg ${m.role}`} style={{ padding: "8px 16px" }}>
            <div
              className="bubble"
              style={{
                maxWidth: "900px",
                padding: "12px 14px",
                borderRadius: 18,
                background: m.role === "assistant" ? "#f1f5f9" : "#e5f2ff",
                color: "#111827",
                boxShadow: "0 1px 3px rgba(0,0,0,.06)",
              }}
            >
              {m.content}
            </div>
          </li>
        ))}
      </ul>

      {/* Bottom input bar (with mute inside) */}
      <form
        className="chat-inputbar"
        onSubmit={sendMessage}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1500,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 12px",
          background: "linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,.96) 30%)",
          backdropFilter: "saturate(180%) blur(6px)",
          WebkitBackdropFilter: "saturate(180%) blur(6px)",
          borderTop: "1px solid rgba(15,23,42,0.06)",
        }}
      >
        {/* Image upload */}
        <label title="Upload image" style={{ cursor: "pointer", fontSize: 18 }}>
          <input type="file" accept="image/*" hidden />
          🖼️
        </label>

        {/* File attach */}
        <label title="Attach file" style={{ cursor: "pointer", fontSize: 18 }}>
          <input type="file" hidden />
          📎
        </label>

        {/* Mute toggle (replaces Export) */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute Carys" : "Mute Carys"}
          title={muted ? "Unmute Carys" : "Mute Carys"}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background: muted ? "rgba(255,241,242,0.95)" : "rgba(255,255,255,0.92)",
            color: muted ? "#be123c" : "#0f172a",
            border: muted
              ? "1px solid rgba(244,63,94,0.25)"
              : "1px solid rgba(15,23,42,0.08)",
            boxShadow: "0 4px 14px rgba(2,6,23,.10)",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 16 }} aria-hidden="true">
            {muted ? "🔇" : "🔊"}
          </span>
        </button>

        {/* Text input */}
        <input
          className="chat-input"
          placeholder={sending ? "Carys is thinking..." : "Message Carys…"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
          disabled={sending}
          aria-label="Message input"
          style={{
            flex: 1,
            minHeight: 44,
            borderRadius: 9999,
            padding: "0 14px",
            border: "1px solid #e5e7eb",
            outline: "none",
            background: "#fff",
          }}
        />

        {/* Send */}
        <button
          className="send-btn"
          disabled={sending || !input.trim()}
          style={{
            height: 44,
            minWidth: 44,
            borderRadius: 9999,
            padding: "0 16px",
            border: "none",
            background: "#111827",
            color: "#fff",
            cursor: sending || !input.trim() ? "not-allowed" : "pointer",
          }}
        >
          {sending ? "…" : "➤"}
        </button>
      </form>
    </div>
  );
}

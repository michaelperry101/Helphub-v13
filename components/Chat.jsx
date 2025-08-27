"use client";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages((m) => [...m, { role: "user", content: input }]);
    const userInput = input;
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userInput }],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const err = data?.error || "Request failed";
        setMessages((m) => [
          ...m,
          { role: "assistant", content: `⚠️ ${err}` },
        ]);
      } else {
        const reply = data?.reply || "…";
        setMessages((m) => [
          ...m,
          { role: "assistant", content: reply },
        ]);

        // 🔊 Optional speech synthesis
        if (typeof window !== "undefined" && window.speechSynthesis) {
          const utter = new SpeechSynthesisUtterance(reply);
          window.speechSynthesis.speak(utter);
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Error: " + err.message },
      ]);
    }
  }

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

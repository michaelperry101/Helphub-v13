"use client";
import { useRef, useState } from "react";

export default function ChatInput({ onSend, sending }) {
  const [value, setValue] = useState("");
  const imgRef = useRef(null);
  const fileRef = useRef(null);

  function submit(e) {
    e.preventDefault();
    const text = value.trim();
    if (!text || sending) return;
    onSend?.(text);
    setValue("");
  }

  return (
    <form className="compose" onSubmit={submit}>
      {/* Media actions */}
      <div className="compose-group">
        <button
          type="button"
          className="compose-btn"
          aria-label="Add image"
          onClick={() => imgRef.current?.click()}
          title="Add image"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M8 10.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Zm12 6-5.2-6.4a1 1 0 0 0-1.6 0L8 16l-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input ref={imgRef} type="file" accept="image/*" hidden />
        </button>

        <button
          type="button"
          className="compose-btn"
          aria-label="Attach file"
          onClick={() => fileRef.current?.click()}
          title="Attach file"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12.5 11.5 20a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 1 1 5 5L9 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input ref={fileRef} type="file" hidden />
        </button>
      </div>

      {/* Text field */}
      <input
        className="compose-input"
        placeholder={sending ? "Carys is thinking…" : "Message Carys…"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={sending}
        aria-label="Message Carys"
      />

      {/* Send */}
      <button
        type="submit"
        className="compose-send"
        disabled={sending || !value.trim()}
        aria-label="Send"
        title="Send"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 12h9M5 5l14 7-14 7 3-7-3-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
}

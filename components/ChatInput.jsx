'use client';
import { useRef, useState } from 'react';
import { Image, Paperclip, Send, Download } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const imageRef = useRef(null);
  const fileRef = useRef(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
    try { if (navigator?.vibrate) navigator.vibrate(30); } catch {}
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      <div className="left-icons">
        <input type="file" accept="image/*" ref={imageRef} hidden onChange={()=>{}} />
        <button className="icon-btn img" title="Upload image" onClick={()=>imageRef.current?.click()}>
          <Image />
        </button>
        <input type="file" ref={fileRef} hidden onChange={()=>{}} />
        <button className="icon-btn file" title="Upload file" onClick={()=>fileRef.current?.click()}>
          <Paperclip />
        </button>
        <button className="icon-btn down" title="Download chat (demo)" onClick={()=>alert('Export coming soon')}>
          <Download />
        </button>
      </div>
      <div className="input-wrap">
        <input
          value={text}
          onChange={e=>setText(e.target.value)}
          onKeyDown={onKey}
          placeholder="Carys is listening..."
          aria-label="Message Carys"
          disabled={disabled}
        />
      </div>
      <button className="send-btn" disabled={disabled} onClick={handleSend} title="Send">
        <Send />
      </button>
    </div>
  );
}

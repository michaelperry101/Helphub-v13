'use client';
import { useEffect, useRef, useState } from 'react';
import MessageBubble from '../../components/MessageBubble';
import ChatInput from '../../components/ChatInput';

export default function ChatPage(){
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I’m Carys. How can I help today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [tts, setTts] = useState(true);
  const scroller = useRef(null);

  useEffect(()=>{
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(()=>{
    try { setTts((localStorage.getItem('hh_tts') ?? 'true') === 'true'); } catch {}
  }, []);

  useEffect(()=>{
    if (!tts) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== 'assistant') return;
    try {
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(last.content);
      const voices = synth.getVoices();
      const uk = voices.find(v => v.lang === 'en-GB') || voices[0];
      if (uk) utter.voice = uk;
      synth.speak(utter);
    } catch {}
  }, [messages, tts]);

  async function send(userText){
    const next = [...messages, { role:'user', content: userText }];
    setMessages(next);
    setLoading(true);
    try{
      const res = await fetch('/api/chat', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ messages: next })
      });
      const data = await res.json();
      const reply = data?.reply || "Sorry, I couldn't generate a response.";
      setMessages(m => [...m, { role:'assistant', content: reply }]);
    }catch(e){
      setMessages(m => [...m, { role:'assistant', content: 'Network error.' }]);
    }finally{
      setLoading(false);
    }
  }

  return (
    <main className="chat-page">
      <div className="chat-scroll" ref={scroller}>
        <div className="chat-stream">
          {messages.map((m,i)=>(<MessageBubble key={i} role={m.role}>{m.content}</MessageBubble>))}
          {loading && <MessageBubble role="assistant">Thinking…</MessageBubble>}
        </div>
      </div>
      <ChatInput onSend={send} disabled={loading} />
    </main>
  );
}

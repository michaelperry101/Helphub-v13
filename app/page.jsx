'use client';
import { useEffect, useState } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('light');
  const [textSize, setTextSize] = useState('md');
  const [voice, setVoice] = useState('en-GB');
  const [haptics, setHaptics] = useState(true);

  useEffect(()=>{
    try {
      setTheme(localStorage.getItem('hh_theme') || 'light');
      setTextSize(localStorage.getItem('hh_textSize') || 'md');
      setVoice(localStorage.getItem('hh_voice') || 'en-GB');
      setHaptics((localStorage.getItem('hh_haptics') ?? 'true') === 'true');
    } catch {}
  }, []);

  useEffect(()=>{
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('hh_theme', theme);
      localStorage.setItem('hh_textSize', textSize);
      localStorage.setItem('hh_voice', voice);
      localStorage.setItem('hh_haptics', String(haptics));
    } catch {}
  }, [theme, textSize, voice, haptics]);

  return (
    <main className="doc">
      <h1>Settings</h1>

      <div className="card">
        <h3>Appearance</h3>
        <div className="row">
          <label>Theme</label>
          <select value={theme} onChange={e=>setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="row">
          <label>Text size</label>
          <select value={textSize} onChange={e=>setTextSize(e.target.value)}>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
      </div>

      <div className="card">
        <h3>Voice & Haptics</h3>
        <div className="row">
          <label>Voice</label>
          <select value={voice} onChange={e=>setVoice(e.target.value)}>
            <option value="en-GB">English (UK)</option>
            <option value="en-US">English (US)</option>
          </select>
        </div>
        <div className="row">
          <label>
            <input type="checkbox" checked={haptics} onChange={e=>setHaptics(e.target.checked)} />
            Enable haptic feedback
          </label>
        </div>
      </div>

      <div className="card">
        <h3>Data & Privacy</h3>
        <button className="btn" onClick={()=>alert('Export coming soon')}>Export chats</button>
        <button className="btn danger" onClick={()=>alert('Delete all coming soon')}>Delete all chats</button>
      </div>
    </main>
  );
}

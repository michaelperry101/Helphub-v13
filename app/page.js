import Link from 'next/link';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="home">
      <div className="home-inner">
        <img src="/logo.png" alt="HelpHub247" className="home-logo" />
        <h1>HelpHub247 — <span className="accent">Carys</span></h1>
        <p>24/7 AI helpline. Chat, voice and uploads.</p>
        <Link href="/chat" className="btn primary">🚀 Start chatting</Link>
      </div>
    </main>
  );
}

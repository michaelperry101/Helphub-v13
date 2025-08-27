'use client';
export const dynamic = 'force-static';

export default function Subscribe() {
  async function goCheckout(){
    const res = await fetch('/api/stripe/create-session', { method:'POST' });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert(data?.error || 'Checkout error');
  }
  async function openPortal(){
    const res = await fetch('/api/stripe/create-portal', { method:'POST' });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
    else alert(data?.error || 'Portal error');
  }
  return (
    <main className="doc">
      <h1>Subscribe</h1>
      <p>Go Pro for £9.99/month. Cancel anytime.</p>
      <div className="card">
        <h3>Pro — £9.99 / month</h3>
        <ul>
          <li>Unlimited chats</li>
          <li>Image/file uploads</li>
          <li>Priority support</li>
        </ul>
        <div className="row">
          <button className="btn primary" onClick={goCheckout}>Subscribe</button>
          <button className="btn" onClick={openPortal}>Manage billing</button>
        </div>
      </div>
    </main>
  );
}

export const dynamic = 'force-static';
export default function Terms() {
  return (
    <main className="doc">
      <h1>Terms of Service</h1>
      <h2>Use of Service</h2>
      <p>You must comply with all applicable laws. You won’t use HelpHub247 to harm others, violate intellectual property, or attempt to break security.</p>
      <h2>AI Responses</h2>
      <p>AI output may be inaccurate or incomplete. You are responsible for how you use the information.</p>
      <h2>Subscriptions & Billing</h2>
      <p>Paid plans renew automatically unless cancelled. Taxes may apply. We may update prices with notice.</p>
      <h2>Termination</h2>
      <p>We may suspend or terminate accounts that violate these Terms.</p>
      <h2>Contact</h2>
      <p>support@helphub247.co.uk</p>
      <p>Last updated: {new Date().toISOString().slice(0,10)}</p>
    </main>
  );
}

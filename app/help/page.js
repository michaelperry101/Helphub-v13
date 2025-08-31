export const metadata = { title: "Help & FAQs — HelpHub247" };

export default function HelpPage() {
  return (
    <section className="page narrow">
      <h1>Help & FAQs</h1>
      <details open>
        <summary>How do I start a chat with Carys?</summary>
        <p>Open the sidebar → “New Chat”, or go to <code>/chat</code>.</p>
      </details>
      <details>
        <summary>Can I mute voice responses?</summary>
        <p>Yes — use the mute toggle on the chat page (or your device volume).</p>
      </details>
      <details>
        <summary>Billing questions</summary>
        <p>Go to Settings → Billing, or email support@helphub247.com.</p>
      </details>
    </section>
  );
}

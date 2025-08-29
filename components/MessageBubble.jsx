export default function MessageBubble({ role, children }) {
  const mine = role === "user";
  return (
    <li className={`msg ${mine ? "user" : "assistant"}`}>
      <div className="bubble">{children}</div>
    </li>
  );
}

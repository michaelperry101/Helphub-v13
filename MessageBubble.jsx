export default function MessageBubble({ role, children }) {
  const isUser = role === 'user';
  return (
    <div className={`msg ${isUser ? 'user' : 'ai'}`}>
      {children}
    </div>
  );
}

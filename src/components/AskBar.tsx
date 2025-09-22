import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface AskBarProps {
  onSubmit?: (message: string) => void;
}

export const AskBar = ({ onSubmit }: AskBarProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSubmit) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-muted rounded-2xl px-4 py-4 flex items-center gap-3">
      <MessageCircle size={20} className="text-muted-foreground" />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Dermaself anything..."
        className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
      />
      {message.trim() && (
        <button 
          type="submit" 
          className="text-primary hover:text-primary/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full active:scale-95"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      )}
    </form>
  );
};
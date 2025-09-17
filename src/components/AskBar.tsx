import { MessageCircle } from 'lucide-react';
import { openAICosmetologist } from '@/lib/services/chat';

export const AskBar = () => {
  return (
    <button
      onClick={openAICosmetologist}
      className="w-full bg-muted rounded-2xl px-4 py-4 flex items-center gap-3 hover:bg-muted/80 transition-colors"
    >
      <MessageCircle size={20} className="text-muted-foreground" />
      <span className="text-muted-foreground">Ask Lóvi anything...</span>
    </button>
  );
};
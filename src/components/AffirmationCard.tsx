import { useState } from 'react';
import { useAffirmationStore } from '@/store/affirmationStore';
import { Dice6 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AffirmationCard = () => {
  const { getAffirmation, rerollAffirmation } = useAffirmationStore();
  const [revealed, setRevealed] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  const affirmation = getAffirmation(today);

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
    }
  };

  const handleReroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    rerollAffirmation(today);
    setRevealed(true);
  };

  return (
    <div 
      className="gradient-affirmation rounded-3xl p-8 text-center relative cursor-pointer min-h-[200px] flex flex-col justify-center"
      onClick={handleReveal}
    >
      <h3 className="text-2xl font-bold text-white mb-2">Daily Affirmation</h3>
      
      {/* Sparkle decoration */}
      <div className="absolute top-6 right-6 text-white/60 text-2xl">✨</div>
      
      {!revealed ? (
        <p className="text-white/90 text-lg">Tap to reveal</p>
      ) : (
        <div className="animate-fade-in">
          <p className="text-white text-lg font-medium leading-relaxed mb-4">
            "{affirmation}"
          </p>
          <button
            onClick={handleReroll}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-white/20 text-white hover:bg-white/30 transition-colors"
            )}
          >
            <Dice6 size={16} />
            <span className="text-sm">New affirmation</span>
          </button>
        </div>
      )}
    </div>
  );
};
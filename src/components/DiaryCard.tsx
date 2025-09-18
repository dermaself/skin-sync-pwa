import { useState } from 'react';
import { useDiaryStore } from '@/store/diaryStore';
import { cn } from '@/lib/utils';

type MoodType = 'bad' | 'not_great' | 'okay' | 'good' | 'awesome';

const moods: { type: MoodType; emoji: string; label: string }[] = [
  { type: 'bad', emoji: '😞', label: 'Bad' },
  { type: 'not_great', emoji: '😕', label: 'Not great' },
  { type: 'okay', emoji: '😐', label: 'Okay' },
  { type: 'good', emoji: '😊', label: 'Good' },
  { type: 'awesome', emoji: '😄', label: 'Awesome' },
];

export const DiaryCard = () => {
  const { setMood, getMood } = useDiaryStore();
  const today = new Date().toISOString().split('T')[0];
  const currentMood = getMood(today);

  const handleMoodSelect = (moodType: MoodType) => {
    setMood(today, moodType);
  };

  return (
    <div className="space-y-6">
      {/* Mood selector */}
      <div className="dermaself-card">
        <h3 className="font-semibold text-center mb-6">How does your skin feel today?</h3>
        
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.type}
              onClick={() => handleMoodSelect(mood.type)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all",
                currentMood === mood.type
                  ? "bg-primary/10 ring-2 ring-primary transform scale-105"
                  : "hover:bg-muted"
              )}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs text-muted-foreground font-medium">
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* K-Beauty routine CTA */}
      <div className="dermaself-card flex items-center gap-4">
        <div className="flex-1">
          <h3 className="font-semibold">Try a Tailored K-Beauty Routine</h3>
        </div>
        <div className="text-2xl">😊</div>
      </div>
    </div>
  );
};
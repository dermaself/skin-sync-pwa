import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MoodType = 'bad' | 'not_great' | 'okay' | 'good' | 'awesome';

interface DiaryStore {
  moods: Record<string, MoodType>;
  setMood: (date: string, mood: MoodType) => void;
  getMood: (date: string) => MoodType | undefined;
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      moods: {},
      setMood: (date, mood) => set((state) => ({
        moods: {
          ...state.moods,
          [date]: mood
        }
      })),
      getMood: (date) => {
        const state = get();
        return state.moods[date];
      }
    }),
    {
      name: 'diary-store'
    }
  )
);
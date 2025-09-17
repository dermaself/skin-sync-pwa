import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AFFIRMATIONS } from '@/lib/affirmations';

interface AffirmationStore {
  byDate: Record<string, string>;
  getAffirmation: (date: string) => string;
  rerollAffirmation: (date: string) => void;
}

export const useAffirmationStore = create<AffirmationStore>()(
  persist(
    (set, get) => ({
      byDate: {},
      getAffirmation: (date) => {
        const state = get();
        if (!state.byDate[date]) {
          const randomAffirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
          set((state) => ({
            byDate: {
              ...state.byDate,
              [date]: randomAffirmation
            }
          }));
          return randomAffirmation;
        }
        return state.byDate[date];
      },
      rerollAffirmation: (date) => {
        const randomAffirmation = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
        set((state) => ({
          byDate: {
            ...state.byDate,
            [date]: randomAffirmation
          }
        }));
      }
    }),
    {
      name: 'affirmation-store'
    }
  )
);
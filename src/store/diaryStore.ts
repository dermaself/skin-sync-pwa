import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MoodType = 'bad' | 'not_great' | 'okay' | 'good' | 'awesome';

interface DiaryEntry {
  mood?: MoodType;
  photo?: string; // base64 or URL
  routinesCompleted?: number;
  totalRoutines?: number;
  notes?: string;
}

interface DiaryStore {
  moods: Record<string, MoodType>; // Legacy, keep for backward compatibility
  entries: Record<string, DiaryEntry>;
  setMood: (date: string, mood: MoodType) => void;
  getMood: (date: string) => MoodType | undefined;
  setEntry: (date: string, entry: DiaryEntry) => void;
  getEntry: (date: string) => DiaryEntry | undefined;
  getDatesWithEntries: () => string[];
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      moods: {},
      entries: {},
      setMood: (date, mood) => set((state) => ({
        moods: {
          ...state.moods,
          [date]: mood
        },
        entries: {
          ...state.entries,
          [date]: {
            ...state.entries[date],
            mood
          }
        }
      })),
      getMood: (date) => {
        const state = get();
        return state.moods[date] || state.entries[date]?.mood;
      },
      setEntry: (date, entry) => set((state) => ({
        entries: {
          ...state.entries,
          [date]: {
            ...state.entries[date],
            ...entry
          }
        }
      })),
      getEntry: (date) => {
        const state = get();
        return state.entries[date];
      },
      getDatesWithEntries: () => {
        const state = get();
        return Object.keys(state.entries);
      }
    }),
    {
      name: 'diary-store'
    }
  )
);
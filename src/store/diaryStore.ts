import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import faceScan1 from '@/assets/face-scan-1.jpg';
import faceScan2 from '@/assets/face-scan-2.jpg';
import faceScan3 from '@/assets/face-scan-3.jpg';
import faceScan4 from '@/assets/face-scan-4.jpg';

type MoodType = 'bad' | 'not_great' | 'okay' | 'good' | 'awesome';

interface ScanEntry {
  type: 'face' | 'cosmetic';
  image: string; // base64 or URL
  timestamp: number;
  productName?: string; // For cosmetic scans
}

interface DiaryEntry {
  mood?: MoodType;
  photo?: string; // base64 or URL
  routinesCompleted?: number;
  totalRoutines?: number;
  notes?: string;
  scans?: ScanEntry[];
}

interface DiaryStore {
  moods: Record<string, MoodType>; // Legacy, keep for backward compatibility
  entries: Record<string, DiaryEntry>;
  setMood: (date: string, mood: MoodType) => void;
  getMood: (date: string) => MoodType | undefined;
  setEntry: (date: string, entry: DiaryEntry) => void;
  getEntry: (date: string) => DiaryEntry | undefined;
  getDatesWithEntries: () => string[];
  addScan: (date: string, scan: ScanEntry) => void;
}

export const useDiaryStore = create<DiaryStore>()(
  persist(
    (set, get) => ({
      moods: {},
      entries: {
        // Example entries with scans
        '2025-01-05': {
          mood: 'good',
          routinesCompleted: 3,
          totalRoutines: 4,
          notes: 'Pelle più luminosa oggi!',
          scans: [
            {
              type: 'face',
              image: faceScan1,
              timestamp: new Date('2025-01-05T09:30:00').getTime()
            }
          ]
        },
        '2025-01-04': {
          mood: 'okay',
          routinesCompleted: 2,
          totalRoutines: 4,
          scans: [
            {
              type: 'cosmetic',
              image: '/images/products/cerave-pm.png',
              timestamp: new Date('2025-01-04T20:15:00').getTime(),
              productName: 'CeraVe PM Lotion'
            }
          ]
        },
        '2025-01-03': {
          mood: 'awesome',
          routinesCompleted: 4,
          totalRoutines: 4,
          notes: 'Routine completa! Mi sento benissimo',
          scans: [
            {
              type: 'face',
              image: faceScan2,
              timestamp: new Date('2025-01-03T08:00:00').getTime()
            },
            {
              type: 'cosmetic',
              image: '/images/products/fab-cleanser.png',
              timestamp: new Date('2025-01-03T20:30:00').getTime(),
              productName: 'First Aid Beauty Cleanser'
            }
          ]
        },
        '2025-01-02': {
          mood: 'not_great',
          routinesCompleted: 1,
          totalRoutines: 4,
          notes: 'Un po\' di rossore oggi',
          scans: [
            {
              type: 'face',
              image: faceScan3,
              timestamp: new Date('2025-01-02T09:45:00').getTime()
            }
          ]
        },
        '2025-01-01': {
          mood: 'good',
          routinesCompleted: 3,
          totalRoutines: 4,
          scans: [
            {
              type: 'face',
              image: faceScan4,
              timestamp: new Date('2025-01-01T10:00:00').getTime()
            },
            {
              type: 'cosmetic',
              image: '/images/products/pixi-milky.png',
              timestamp: new Date('2025-01-01T21:00:00').getTime(),
              productName: 'Pixi Milky Serum'
            },
            {
              type: 'cosmetic',
              image: '/images/products/ordinary-rosehip.png',
              timestamp: new Date('2025-01-01T21:10:00').getTime(),
              productName: 'The Ordinary Rosehip Oil'
            }
          ]
        }
      },
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
      },
      addScan: (date, scan) => set((state) => ({
        entries: {
          ...state.entries,
          [date]: {
            ...state.entries[date],
            scans: [...(state.entries[date]?.scans || []), scan]
          }
        }
      }))
    }),
    {
      name: 'diary-store'
    }
  )
);
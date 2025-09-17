import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DayStore {
  selectedDay: number;
  completed: Record<number, string[]>;
  setSelectedDay: (day: number) => void;
  toggleTask: (day: number, task: string) => void;
  isTaskCompleted: (day: number, task: string) => boolean;
}

export const useDayStore = create<DayStore>()(
  persist(
    (set, get) => ({
      selectedDay: 2,
      completed: {
        1: ["Morning Routine", "DIY Super Hydrating Mask"],
        2: ["Morning Routine", "DIY Super Hydrating Mask"]
      },
      setSelectedDay: (day) => set({ selectedDay: day }),
      toggleTask: (day, task) => set((state) => {
        const dayTasks = state.completed[day] || [];
        const newTasks = dayTasks.includes(task)
          ? dayTasks.filter(t => t !== task)
          : [...dayTasks, task];
        
        return {
          completed: {
            ...state.completed,
            [day]: newTasks
          }
        };
      }),
      isTaskCompleted: (day, task) => {
        const state = get();
        return (state.completed[day] || []).includes(task);
      }
    }),
    {
      name: 'day-store'
    }
  )
);
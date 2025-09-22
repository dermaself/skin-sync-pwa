import { useDayStore } from '@/store/dayStore';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export const DayPills = () => {
  const { selectedDay, setSelectedDay, completed } = useDayStore();

  const days = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="flex items-center justify-between gap-1 mb-8 px-4">
      {days.map((day) => {
        const isSelected = day === selectedDay;
        const isCompleted = completed[day] && completed[day].length > 0;
        const hasFullCompletions = completed[day] && completed[day].length >= 2;

        return (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={cn(
              "day-pill relative",
              isSelected && "selected",
              !isSelected && isCompleted && "completed",
              !isSelected && !isCompleted && "inactive"
            )}
          >
            <span className="text-xs font-medium">
              {day <= 2 ? `Day ${day}` : day}
            </span>
            
            {/* Completion badge */}
            {hasFullCompletions && !isSelected && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <Check size={10} className="text-primary-foreground" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
import { useDayStore } from '@/store/dayStore';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { it } from 'date-fns/locale';

export const DayPills = () => {
  const { selectedDay, setSelectedDay, completed } = useDayStore();

  // Get current week starting from Monday
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Get month name from the first day of the week
  const monthName = format(weekStart, 'MMMM', { locale: it });

  return (
    <div className="mb-8 px-4">
      <div className="flex items-center justify-between gap-1 mb-2">
        {days.map((date, index) => {
          const dayNumber = index + 1; // Maps to 1-7 in the store
          const isSelected = dayNumber === selectedDay;
          const isCompleted = completed[dayNumber] && completed[dayNumber].length > 0;
          const hasFullCompletions = completed[dayNumber] && completed[dayNumber].length >= 2;
          const dayInitial = format(date, 'EEEEE', { locale: it }).toUpperCase();
          const dateNumber = format(date, 'd');

          return (
            <button
              key={dayNumber}
              onClick={() => setSelectedDay(dayNumber)}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 rounded-full min-w-[40px] transition-all relative",
                isSelected && "bg-foreground",
                !isSelected && "hover:bg-accent"
              )}
            >
              <span className={cn(
                "text-[10px] font-medium uppercase",
                isSelected ? "text-background" : "text-muted-foreground"
              )}>
                {dayInitial}
              </span>
              <span className={cn(
                "text-base font-medium",
                isSelected ? "text-background" : isCompleted ? "text-primary" : "text-foreground"
              )}>
                {dateNumber}
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
      <p className="text-center text-xs text-muted-foreground/60 capitalize">
        {monthName}
      </p>
    </div>
  );
};
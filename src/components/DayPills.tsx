import { useDayStore } from '@/store/dayStore';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import { dailyRoutines } from '@/lib/routines';

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
      <div className="flex items-center justify-center gap-1.5 mb-3">
        {days.map((date, index) => {
          const dayNumber = index + 1; // Maps to 1-7 in the store
          const isSelected = dayNumber === selectedDay;
          const dayRoutines = dailyRoutines[dayNumber] || [];
          const completedTasks = completed[dayNumber] || [];
          const hasFullCompletions = dayRoutines.length > 0 && completedTasks.length === dayRoutines.length;
          const dayInitial = format(date, 'EEEEE', { locale: it }).toUpperCase();
          const dateNumber = format(date, 'd');

          return (
            <button
              key={dayNumber}
              onClick={() => setSelectedDay(dayNumber)}
              className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-2xl min-w-[44px] transition-all duration-200 relative font-obviously",
                isSelected && "bg-foreground shadow-lg scale-105",
                !isSelected && "bg-accent/30 hover:bg-accent/50 hover:scale-102"
              )}
            >
              <span className={cn(
                "text-[9px] font-medium uppercase tracking-wider",
                isSelected ? "text-background" : "text-muted-foreground/70"
              )}>
                {dayInitial}
              </span>
              <span className={cn(
                "text-lg font-bold",
                isSelected ? "text-background" : hasFullCompletions ? "text-primary" : "text-foreground"
              )}>
                {dateNumber}
              </span>
              
              {/* Completion badge */}
              {hasFullCompletions && !isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <Check size={10} className="text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs font-medium text-muted-foreground/50 capitalize tracking-wide">
        {monthName}
      </p>
    </div>
  );
};
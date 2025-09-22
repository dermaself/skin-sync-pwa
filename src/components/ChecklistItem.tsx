import { useDayStore } from '@/store/dayStore';
import { cn } from '@/lib/utils';
import { Check, Sun, Moon } from 'lucide-react';
import { useHaptic } from '@/hooks/use-haptic';

interface ChecklistItemProps {
  task: string;
  icon?: 'sun' | 'moon';
}

export const ChecklistItem = ({ task, icon }: ChecklistItemProps) => {
  const { selectedDay, toggleTask, isTaskCompleted } = useDayStore();
  const { notificationFeedback } = useHaptic();
  const completed = isTaskCompleted(selectedDay, task);

  const handleToggle = () => {
    toggleTask(selectedDay, task);
    notificationFeedback(completed ? 'warning' : 'success');
  };

  const IconComponent = icon === 'sun' ? Sun : icon === 'moon' ? Moon : null;

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "dermaself-card flex items-center gap-4 w-full text-left transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[64px] py-4",
        completed && "opacity-75"
      )}
      aria-label={`${completed ? 'Mark as incomplete' : 'Mark as complete'}: ${task}`}
    >
      {/* Check circle */}
      <div
        className={cn(
          "flex-shrink-0 min-w-[36px] min-h-[36px] rounded-full border-2 flex items-center justify-center transition-all",
          completed
            ? "bg-primary border-primary text-primary-foreground shadow-md"
            : "border-muted-foreground hover:border-primary hover:scale-110"
        )}
      >
        {completed && <Check size={18} />}
      </div>

      {/* Task text */}
      <span
        className={cn(
          "flex-1 font-medium transition-all text-base",
          completed && "text-muted-foreground line-through"
        )}
      >
        {task}
      </span>

      {/* Icon */}
      {IconComponent && (
        <div className="flex-shrink-0 text-muted-foreground">
          <IconComponent size={22} />
        </div>
      )}
    </button>
  );
};
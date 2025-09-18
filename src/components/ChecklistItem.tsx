import { useDayStore } from '@/store/dayStore';
import { cn } from '@/lib/utils';
import { Check, Sun, Moon } from 'lucide-react';

interface ChecklistItemProps {
  task: string;
  icon?: 'sun' | 'moon';
}

export const ChecklistItem = ({ task, icon }: ChecklistItemProps) => {
  const { selectedDay, toggleTask, isTaskCompleted } = useDayStore();
  const completed = isTaskCompleted(selectedDay, task);

  const handleToggle = () => {
    toggleTask(selectedDay, task);
  };

  const IconComponent = icon === 'sun' ? Sun : icon === 'moon' ? Moon : null;

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "dermaself-card flex items-center gap-4 w-full text-left transition-all hover:scale-[1.02]",
        completed && "opacity-75"
      )}
    >
      {/* Check circle */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all",
          completed
            ? "bg-primary border-primary text-primary-foreground"
            : "border-muted-foreground hover:border-primary"
        )}
      >
        {completed && <Check size={16} />}
      </div>

      {/* Task text */}
      <span
        className={cn(
          "flex-1 font-medium transition-all",
          completed && "text-muted-foreground line-through"
        )}
      >
        {task}
      </span>

      {/* Icon */}
      {IconComponent && (
        <div className="flex-shrink-0 text-muted-foreground">
          <IconComponent size={20} />
        </div>
      )}
    </button>
  );
};
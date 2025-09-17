import { cn } from '@/lib/utils';
import { Sun, Moon, Sparkles } from 'lucide-react';

interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    icon?: 'sun' | 'moon' | 'sparkles';
  }>;
}

export const SegmentedControl = ({ value, onChange, options }: SegmentedControlProps) => {
  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'sun':
        return <Sun size={16} />;
      case 'moon':
        return <Moon size={16} />;
      case 'sparkles':
        return <Sparkles size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="inline-flex bg-muted rounded-full p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
            value === option.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {getIcon(option.icon)}
          {option.label}
        </button>
      ))}
    </div>
  );
};
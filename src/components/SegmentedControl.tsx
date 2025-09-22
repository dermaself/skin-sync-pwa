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
    <div className="inline-flex bg-muted rounded-full p-1 w-full max-w-sm">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all min-h-[44px] flex-1",
            value === option.value
              ? "bg-background text-foreground shadow-sm scale-105"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          {getIcon(option.icon)}
          <span className="hidden xs:inline">{option.label}</span>
        </button>
      ))}
    </div>
  );
};
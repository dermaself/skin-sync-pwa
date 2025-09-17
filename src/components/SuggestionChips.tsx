interface SuggestionChipsProps {
  onChipClick?: (text: string) => void;
}

const suggestions = [
  "⚠️ Skincare layering mistakes you should know for sensitive skin",
  "🌞 Best sunscreens for sensitive, normal skin",
  "How to prevent wrinkles on sensitive skin. Try these tips",
  "🤔 How old does your face look? Fine lines edition",
  "Improve smile lines: Gentle methods for sensitive skin",
  "Lifestyle tweaks for healthier, less sensitive skin"
];

export const SuggestionChips = ({ onChipClick }: SuggestionChipsProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onChipClick?.(suggestion)}
          className="bg-white border border-border rounded-2xl px-4 py-3 text-sm text-left hover:border-primary hover:bg-primary/5 transition-colors shadow-sm"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};
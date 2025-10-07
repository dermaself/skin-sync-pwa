import { useState } from 'react';
import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Calendar } from '@/components/ui/calendar';
import { useDiaryStore } from '@/store/diaryStore';
import { useDayStore } from '@/store/dayStore';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { it } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { dailyRoutines } from '@/lib/routines';

const moods: Record<string, { emoji: string; label: string }> = {
  bad: { emoji: '😞', label: 'Male' },
  not_great: { emoji: '😕', label: 'Non benissimo' },
  okay: { emoji: '😐', label: 'Ok' },
  good: { emoji: '😊', label: 'Bene' },
  awesome: { emoji: '😄', label: 'Fantastico' },
};

interface DiaryHistorySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiaryHistorySheet = ({ isOpen, onClose }: DiaryHistorySheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
  const { getEntry, getDatesWithEntries } = useDiaryStore();
  const { completed } = useDayStore();

  const datesWithEntries = getDatesWithEntries();

  // Get completion data for a specific date
  const getCompletionForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = getEntry(dateStr);
    
    // Calculate day of week (1-7)
    const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
    const routines = dailyRoutines[dayOfWeek] || [];
    const completedTasks = completed[dayOfWeek] || [];
    
    return {
      routinesCompleted: completedTasks.length,
      totalRoutines: routines.length,
      entry
    };
  };

  // Calculate streak and missed days
  const calculateStats = () => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    let completedDays = 0;
    let missedDays = 0;
    
    daysInMonth.forEach(day => {
      if (day > today) return; // Don't count future days
      
      const { routinesCompleted, totalRoutines } = getCompletionForDate(day);
      if (routinesCompleted > 0) {
        completedDays++;
      } else {
        missedDays++;
      }
    });
    
    return { completedDays, missedDays, totalDays: daysInMonth.length };
  };

  const stats = calculateStats();

  // Custom day content with completion indicators
  const modifiers = {
    completed: (date: Date) => {
      const { routinesCompleted, totalRoutines } = getCompletionForDate(date);
      return routinesCompleted === totalRoutines && totalRoutines > 0;
    },
    partial: (date: Date) => {
      const { routinesCompleted, totalRoutines } = getCompletionForDate(date);
      return routinesCompleted > 0 && routinesCompleted < totalRoutines;
    },
    withEntry: (date: Date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return datesWithEntries.includes(dateStr);
    }
  };

  const modifiersClassNames = {
    completed: 'bg-primary text-primary-foreground hover:bg-primary/90 font-semibold',
    partial: 'bg-primary/30 text-foreground hover:bg-primary/40 ring-2 ring-primary/50',
    withEntry: 'ring-2 ring-primary/20',
  };

  const selectedEntry = selectedDate ? getEntry(format(selectedDate, 'yyyy-MM-dd')) : undefined;
  const selectedCompletion = selectedDate ? getCompletionForDate(selectedDate) : undefined;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
        <SheetHeader className="relative pb-4">
          <button 
            onClick={onClose}
            className="absolute left-0 top-0 p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <SheetTitle className="text-center text-2xl">Diario Pelle</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto h-full pb-32">
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="dermaself-card text-center p-4">
              <div className="text-2xl font-bold text-primary">{stats.completedDays}</div>
              <div className="text-xs text-muted-foreground">Giorni completati</div>
            </div>
            <div className="dermaself-card text-center p-4">
              <div className="text-2xl font-bold text-destructive">{stats.missedDays}</div>
              <div className="text-xs text-muted-foreground">Giorni saltati</div>
            </div>
            <div className="dermaself-card text-center p-4">
              <div className="text-2xl font-bold">{Math.round((stats.completedDays / stats.totalDays) * 100)}%</div>
              <div className="text-xs text-muted-foreground">Completamento</div>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setViewMode('month')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                viewMode === 'month' 
                  ? "bg-card text-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Mese
            </button>
            <button
              onClick={() => setViewMode('year')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                viewMode === 'year' 
                  ? "bg-card text-foreground shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Anno
            </button>
          </div>

          {/* Calendar */}
          <div className="dermaself-card mb-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              className="w-full"
              locale={it}
            />
          </div>

          {/* Legend */}
          <div className="mb-6 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary"></div>
              <span>Completato</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/30 ring-2 ring-primary/50"></div>
              <span>Parziale</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-border"></div>
              <span>Non fatto</span>
            </div>
          </div>

          {/* Selected Day Details */}
          {selectedDate && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {format(selectedDate, 'EEEE d MMMM yyyy', { locale: it })}
              </h3>

              {/* Mood */}
              {selectedEntry?.mood && (
                <div className="dermaself-card">
                  <h4 className="text-sm font-medium mb-3">Come si sentiva la tua pelle</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{moods[selectedEntry.mood].emoji}</span>
                    <span className="text-lg font-medium">{moods[selectedEntry.mood].label}</span>
                  </div>
                </div>
              )}

              {/* Routine Completion */}
              {selectedCompletion && (
                <div className="dermaself-card">
                  <h4 className="text-sm font-medium mb-3">Routine completate</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all"
                        style={{ 
                          width: `${(selectedCompletion.routinesCompleted / selectedCompletion.totalRoutines) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {selectedCompletion.routinesCompleted}/{selectedCompletion.totalRoutines}
                    </span>
                  </div>
                </div>
              )}

              {/* Photo */}
              {selectedEntry?.photo && (
                <div className="dermaself-card">
                  <h4 className="text-sm font-medium mb-3">Foto del giorno</h4>
                  <img 
                    src={selectedEntry.photo} 
                    alt="Skin photo" 
                    className="w-full rounded-xl object-cover aspect-square"
                  />
                </div>
              )}

              {/* Before & After - TODO: Implement comparison with latest photo */}
              {selectedEntry?.photo && (
                <div className="dermaself-card">
                  <h4 className="text-sm font-medium mb-3">Progressi</h4>
                  <p className="text-sm text-muted-foreground">
                    Confronta le foto per vedere i tuoi progressi nel tempo
                  </p>
                  {/* TODO: Add before/after comparison slider */}
                </div>
              )}

              {/* Notes */}
              {selectedEntry?.notes && (
                <div className="dermaself-card">
                  <h4 className="text-sm font-medium mb-3">Note</h4>
                  <p className="text-sm">{selectedEntry.notes}</p>
                </div>
              )}

              {/* Empty state */}
              {!selectedEntry?.mood && !selectedEntry?.photo && selectedCompletion?.routinesCompleted === 0 && (
                <div className="dermaself-card text-center py-8">
                  <p className="text-muted-foreground">Nessun dato registrato per questo giorno</p>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

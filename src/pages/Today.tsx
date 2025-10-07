import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useDayStore } from '@/store/dayStore';
import { DayPills } from '@/components/DayPills';
import { format, addDays, startOfWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import { ChecklistItem } from '@/components/ChecklistItem';
import { DiaryCard } from '@/components/DiaryCard';
import { SectionHeader } from '@/components/SectionHeader';
import { SegmentedControl } from '@/components/SegmentedControl';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailSheet } from '@/components/ProductDetailSheet';
import { SuggestionChips } from '@/components/SuggestionChips';
import { AskBar } from '@/components/AskBar';
import { AffirmationCard } from '@/components/AffirmationCard';
import { ChatbotUI } from '@/components/ChatbotUI';
import { DiaryHistorySheet } from '@/components/DiaryHistorySheet';
import VideoPlayer, { type VideoStep } from '@/components/VideoPlayer';
import { seedProducts } from '@/lib/seed';
import type { Product } from '@/lib/seed';
import { dailyRoutines } from '@/lib/routines';

// Video tutorials mapping for each routine type
const routineVideos: Record<string, VideoStep[]> = {
  'Routine Mattutina': [
    { id: '1', title: 'Step 1: Detersione', description: 'Come detergere il viso al mattino' },
    { id: '2', title: 'Step 2: Tonico', description: 'Applicazione del tonico' },
    { id: '3', title: 'Step 3: Siero', description: 'Come applicare il siero' },
    { id: '4', title: 'Step 4: Idratante', description: 'Applicazione della crema idratante' },
    { id: '5', title: 'Step 5: Protezione solare', description: 'Come applicare la protezione solare' },
  ],
  'Routine Serale': [
    { id: '1', title: 'Step 1: Struccaggio', description: 'Come rimuovere il trucco' },
    { id: '2', title: 'Step 2: Detersione', description: 'Doppia detersione serale' },
    { id: '3', title: 'Step 3: Esfoliazione', description: 'Esfoliazione delicata (se necessaria)' },
    { id: '4', title: 'Step 4: Siero', description: 'Applicazione siero notturno' },
    { id: '5', title: 'Step 5: Crema notte', description: 'Come applicare la crema notte' },
  ],
  'Maschera Idratante': [
    { id: '1', title: 'Preparazione', description: 'Preparare la pelle per la maschera' },
    { id: '2', title: 'Applicazione', description: 'Come applicare la maschera idratante' },
    { id: '3', title: 'Tempo di posa', description: 'Quanto tempo lasciare in posa' },
    { id: '4', title: 'Rimozione', description: 'Come rimuovere la maschera' },
  ],
  'Esfoliazione Delicata': [
    { id: '1', title: 'Preparazione', description: 'Preparare la pelle per l\'esfoliazione' },
    { id: '2', title: 'Applicazione', description: 'Come esfoliare delicatamente' },
    { id: '3', title: 'Massaggio', description: 'Tecnica di massaggio per l\'esfoliazione' },
    { id: '4', title: 'Risciacquo', description: 'Come risciacquare correttamente' },
  ],
  'Trattamento Viso Settimanale': [
    { id: '1', title: 'Preparazione', description: 'Preparare la pelle per il trattamento' },
    { id: '2', title: 'Esfoliazione', description: 'Esfoliazione profonda settimanale' },
    { id: '3', title: 'Maschera', description: 'Applicazione maschera purificante' },
    { id: '4', title: 'Siero intensivo', description: 'Applicazione siero trattamento' },
    { id: '5', title: 'Finalizzazione', description: 'Come concludere il trattamento' },
  ],
  'Relax & Self-Care': [
    { id: '1', title: 'Massaggio viso', description: 'Tecniche di auto-massaggio facciale' },
    { id: '2', title: 'Maschera rilassante', description: 'Applicazione maschera per relax' },
    { id: '3', title: 'Contorno occhi', description: 'Cura speciale del contorno occhi' },
    { id: '4', title: 'Meditazione', description: 'Momento di mindfulness' },
  ],
};

const Today = () => {
  const navigate = useNavigate();
  const { selectedDay } = useDayStore();
  const [selectedRoutine, setSelectedRoutine] = useState('Morning');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string>('');
  const [isDiaryHistoryOpen, setIsDiaryHistoryOpen] = useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [currentVideoPlaylist, setCurrentVideoPlaylist] = useState<VideoStep[]>([]);
  
  const routineOptions = [
    { value: 'Morning', label: 'Mattina', icon: 'sun' as const },
    { value: 'Evening', label: 'Sera', icon: 'moon' as const },
    { value: 'Weekly', label: 'Settimanale', icon: 'sparkles' as const },
  ];

  // Calculate the selected date based on the day number (1-7 maps to Mon-Sun)
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const selectedDate = addDays(weekStart, selectedDay - 1);
  const formattedDate = format(selectedDate, 'EEEE d MMMM', { locale: it });

  const morningProducts = seedProducts['Routine – Morning'] || [];
  const currentDayRoutines = dailyRoutines[selectedDay] || dailyRoutines[1];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsSheetOpen(true);
  };

  const handleChatOpen = (message?: string) => {
    if (message) {
      setInitialMessage(message);
    }
    setChatOpen(true);
  };

  const handleVideoOpen = (task: string) => {
    const playlist = routineVideos[task] || [];
    if (playlist.length > 0) {
      setCurrentVideoPlaylist(playlist);
      setIsVideoPlayerOpen(true);
    }
  };

  return (
    <div className="mobile-content">
      <div className="mobile-main mobile-container animate-fade-in">
        {/* Header gradient with brand enhancement */}
        <div className="gradient-header -mx-4 px-4 pt-12 pb-8 mb-6 rounded-b-3xl relative overflow-hidden">
          {/* Brand pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-50"></div>
          
          <div className="relative z-10">
            {/* Greeting with brand typography */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  Buongiorno, <span className="text-primary font-obviously">Lorenzo</span> ✨
                </h1>
                <p className="text-muted-foreground text-sm">Pronto a splendere oggi?</p>
              </div>
              <button 
                className="min-w-[48px] min-h-[48px] bg-card/90 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-card transition-all active:scale-95 shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/20"
                aria-label="Diario pelle e storico"
                onClick={() => setIsDiaryHistoryOpen(true)}
              >
                <Calendar size={20} className="text-primary" />
              </button>
            </div>

            {/* Day Pills */}
            <DayPills />
          </div>
        </div>

      {/* Daily Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Hai skincherato oggi?</h2>
          <span className="text-sm text-muted-foreground capitalize">{formattedDate}</span>
        </div>
        
        <div className="space-y-3">
          {currentDayRoutines.map((routine, index) => (
            <ChecklistItem 
              key={`${selectedDay}-${routine.task}-${index}`}
              task={routine.task} 
              icon={routine.icon}
              onVideoClick={() => handleVideoOpen(routine.task)}
            />
          ))}
        </div>
      </div>

      {/* Primary CTA - Green variant */}
      <div className="mb-8">
        <div 
          className="cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] p-6 rounded-3xl relative overflow-hidden border border-[#9cffbc]/30"
          onClick={() => navigate('/routine-for-you')}
          style={{
            backgroundColor: 'rgba(156, 255, 188, 0.74)'
          }}
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <h3 className="text-lg font-space-grotesk font-bold mb-1 text-foreground">Scopri la TUA skincare routine</h3>
              <p className="text-sm text-foreground/80 font-space-grotesk">Consigli personalizzati in base al tuo tipo di pelle</p>
            </div>
            <div className="text-3xl ml-4">✨</div>
          </div>
        </div>
      </div>

      {/* Skin Diary - Simplified */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Come si sente la tua pelle?</h2>
        <DiaryCard />
      </div>

      {/* Quick Product Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">I tuoi Prodotti</h2>
          <button 
            className="text-primary font-medium hover:underline min-h-[44px] px-2"
            onClick={() => navigate('/routine-for-you')}
          >
            Vedi tutto
          </button>
        </div>

        <ProductDetailSheet
          product={selectedProduct}
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
        >
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">
            {morningProducts.slice(0, 3).map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onClick={handleProductClick}
                className="flex-shrink-0 w-[160px] snap-center"
              />
            ))}
          </div>
        </ProductDetailSheet>
      </div>

      {/* AI Assistant - Simplified */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Chatta con l'AI di Dermaself</h2>
        <AskBar onSubmit={handleChatOpen} />
      </div>

        {/* Chatbot UI */}
        <ChatbotUI 
          open={chatOpen} 
          onOpenChange={setChatOpen}
          initialMessage={initialMessage}
          trigger={<></>}
        />

        {/* Diary History Sheet */}
        <DiaryHistorySheet 
          isOpen={isDiaryHistoryOpen}
          onClose={() => setIsDiaryHistoryOpen(false)}
        />

        {/* Video Player */}
        <VideoPlayer
          isOpen={isVideoPlayerOpen}
          onClose={() => setIsVideoPlayerOpen(false)}
          playlist={currentVideoPlaylist}
        />
      </div>
    </div>
  );
};

export default Today;
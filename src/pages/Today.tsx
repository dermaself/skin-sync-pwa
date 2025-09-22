import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { useDayStore } from '@/store/dayStore';
import { DayPills } from '@/components/DayPills';
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
import { seedProducts } from '@/lib/seed';
import type { Product } from '@/lib/seed';

const Today = () => {
  const navigate = useNavigate();
  const [selectedRoutine, setSelectedRoutine] = useState('Morning');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string>('');
  
  const routineOptions = [
    { value: 'Morning', label: 'Morning', icon: 'sun' as const },
    { value: 'Evening', label: 'Evening', icon: 'moon' as const },
    { value: 'Weekly', label: 'Weekly', icon: 'sparkles' as const },
  ];

  const morningProducts = seedProducts['Routine – Morning'] || [];

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

  return (
    <div className="mobile-content">
      <div className="mobile-main mobile-container animate-fade-in">
        {/* Header gradient */}
        <div className="gradient-header -mx-4 px-4 pt-12 pb-6 mb-6">
        {/* Greeting */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Morning, <span className="text-primary">Lorenzo</span>
          </h1>
          <button 
            className="min-w-[48px] min-h-[48px] bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors active:scale-95"
            aria-label="Daily rewards and achievements"
          >
            <Gift size={20} className="text-foreground" />
          </button>
        </div>

        {/* Day Pills */}
        <DayPills />
      </div>

      {/* Daily Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Progress</h2>
          <span className="text-sm text-muted-foreground">Day {useDayStore.getState().selectedDay}</span>
        </div>
        
        <div className="space-y-3">
          <ChecklistItem task="Morning Routine" icon="sun" />
          <ChecklistItem task="Evening Routine" icon="moon" />
        </div>
      </div>

      {/* Skin Diary - Simplified */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How does your skin feel?</h2>
        <DiaryCard />
      </div>

      {/* Primary CTA - Routine Discovery */}
      <div className="mb-8">
        <div 
          className="dermaself-card cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20"
          onClick={() => navigate('/routine-for-you')}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Discover Your Perfect Routine</h3>
              <p className="text-sm text-muted-foreground">Personalized skincare recommendations</p>
            </div>
            <div className="text-3xl">✨</div>
          </div>
        </div>
      </div>

      {/* Quick Product Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Picks</h2>
          <button 
            className="text-primary font-medium hover:underline min-h-[44px] px-2"
            onClick={() => navigate('/routine-for-you')}
          >
            View all
          </button>
        </div>

        <ProductDetailSheet
          product={selectedProduct}
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
        >
          <div className="mobile-grid-2">
            {morningProducts.slice(0, 2).map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                onClick={handleProductClick}
              />
            ))}
          </div>
        </ProductDetailSheet>
      </div>

      {/* AI Assistant - Simplified */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ask Dermaself AI</h2>
        <AskBar onSubmit={handleChatOpen} />
      </div>

        {/* Chatbot UI */}
        <ChatbotUI 
          open={chatOpen} 
          onOpenChange={setChatOpen}
          initialMessage={initialMessage}
          trigger={<></>}
        />
      </div>
    </div>
  );
};

export default Today;
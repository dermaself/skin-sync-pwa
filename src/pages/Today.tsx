import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gift } from 'lucide-react';
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
    <div className="max-w-screen-sm mx-auto px-4 sm:px-5 animate-fade-in">
      {/* Header gradient */}
      <div className="gradient-header -mx-4 px-4 pt-12 pb-6 mb-6">
        {/* Greeting */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            Morning, <span className="text-primary">Lorenzo</span>
          </h1>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <Gift size={20} className="text-foreground" />
          </button>
        </div>

        {/* Day Pills */}
        <DayPills />
      </div>

      {/* Daily Plan */}
      <SectionHeader className="mb-6">Daily Plan</SectionHeader>
      
      <div className="space-y-4 mb-8">
        <ChecklistItem task="Morning Routine" icon="sun" />
        <ChecklistItem task="DIY Super Hydrating Mask" />
        <ChecklistItem task="What Results to Expect and When?" />
        <ChecklistItem task="Evening Routine" icon="moon" />
      </div>

      {/* Skin Diary */}
      <SectionHeader className="mb-6">Skin Diary</SectionHeader>
      <DiaryCard />

      {/* Routine for you */}
      <div className="mt-12 mb-8">
        <h2 className="text-xl font-semibold mb-4">Routine for you</h2>
        
        <div className="mb-6">
          <SegmentedControl
            value={selectedRoutine}
            onChange={setSelectedRoutine}
            options={routineOptions}
          />
        </div>

        <ProductDetailSheet
          product={selectedProduct}
          isOpen={isSheetOpen}
          onOpenChange={setIsSheetOpen}
        >
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide mb-6">
            {morningProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-44">
                <ProductCard 
                  product={product} 
                  onClick={handleProductClick}
                />
              </div>
            ))}
          </div>
        </ProductDetailSheet>

        <div className="text-center">
          <button 
            className="text-primary font-medium hover:underline"
            onClick={() => navigate('/routine-for-you')}
          >
            Show all
          </button>
        </div>
      </div>

      {/* Ask Dermaself AI Cosmetologist */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Ask Dermaself <span className="text-muted-foreground">AI Cosmetologist</span>
        </h2>
        
        <SuggestionChips onChipClick={handleChatOpen} />
        <AskBar onSubmit={handleChatOpen} />
      </div>

      {/* Daily Affirmation */}
      <div className="mb-8">
        <AffirmationCard />
      </div>

      {/* Chatbot UI */}
      <ChatbotUI 
        open={chatOpen} 
        onOpenChange={setChatOpen}
        initialMessage={initialMessage}
        trigger={<></>}
      />
    </div>
  );
};

export default Today;
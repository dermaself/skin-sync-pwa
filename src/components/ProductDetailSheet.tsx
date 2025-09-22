import { useState } from 'react';
import { Share, AlertTriangle, Play, ShoppingCart, Info } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '@/lib/seed';
import { FitAnalysisSheet } from '@/components/FitAnalysisSheet';
import { useHaptic } from '@/hooks/use-haptic';
import { cn } from '@/lib/utils';

interface ProductDetailSheetProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const ProductDetailSheet = ({ product, isOpen, onOpenChange, children }: ProductDetailSheetProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isFitAnalysisOpen, setIsFitAnalysisOpen] = useState(false);
  const { selectionChanged, lightImpact } = useHaptic();

  if (!product) return children;

  const getFitPillClass = (fitPct: number) => {
    if (fitPct >= 90) return 'bg-violet-500 text-white';
    if (fitPct >= 75) return 'bg-emerald-500 text-white';
    return 'bg-gray-400 text-white';
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const alternativeProducts: Product[] = [
    {
      id: 'alt1',
      name: 'Advanced Snail 96 Mucin Power Essence',
      brand: 'COSRX',
      category: 'Treatment',
      price: 16.70,
      currency: 'EUR',
      retailer: 'amazon',
      fitPct: 92,
      imageUrl: '/images/products/ordinary-rosehip.png'
    },
    {
      id: 'alt2', 
      name: 'Real Ferment Micro Essence',
      brand: 'Neogen',
      category: 'Treatment',
      price: 23.99,
      currency: 'EUR',
      retailer: 'amazon',
      fitPct: 88,
      imageUrl: '/images/products/pai-rosehip.png'
    }
  ];

  const buyOptions = [
    { retailer: 'Amazon', domain: 'amazon.de', price: product.price, currency: product.currency },
    { retailer: 'Amazon', domain: 'amazon.de', price: product.price + 1.79, currency: product.currency },
    { retailer: 'Amazon', domain: 'amazon.de', price: product.price - 0.02, currency: product.currency },
    { retailer: 'Amazon', domain: 'amazon.com', price: 20.82, currency: 'USD' },
  ];

  const questions = [
    "Is this suitable for very sensitive skin?",
    "Can it be used on infants and children?"
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[95vh] p-0 bg-background rounded-t-3xl">
        <ScrollArea className="h-full">
          {/* Swipe handle area */}
          <div 
            className="sticky top-0 z-10 flex justify-center py-4 bg-background rounded-t-3xl"
            onTouchStart={(e) => {
              const startY = e.touches[0].clientY;
              const element = e.currentTarget;
              
              const handleTouchMove = (e: TouchEvent) => {
                const currentY = e.touches[0].clientY;
                const deltaY = currentY - startY;
                
                // If swipe down more than 100px, close the sheet
                if (deltaY > 100) {
                  onOpenChange(false);
                  element.removeEventListener('touchmove', handleTouchMove);
                  element.removeEventListener('touchend', handleTouchEnd);
                }
              };
              
              const handleTouchEnd = () => {
                element.removeEventListener('touchmove', handleTouchMove);
                element.removeEventListener('touchend', handleTouchEnd);
              };
              
              element.addEventListener('touchmove', handleTouchMove);
              element.addEventListener('touchend', handleTouchEnd);
            }}
          >
            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full cursor-pointer" />
          </div>
          
          <div className="px-4 pb-20 -mt-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pt-6">
              <Button variant="ghost" className="flex items-center gap-2 text-foreground min-h-[44px] px-4">
                <Share size={18} />
                <span>Share</span>
              </Button>
              <div className="w-12 h-1.5 bg-transparent rounded-full" />
              <Button variant="ghost" className="flex items-center gap-2 text-foreground min-h-[44px] px-4">
                <AlertTriangle size={18} />
                <span>Wrong?</span>
              </Button>
            </div>

            {/* Product Image */}
            <div className="flex justify-center mb-10">
              <img
                src={product.imageUrl}
                alt={`${product.brand} ${product.name}`}
                className="w-full max-w-60 sm:max-w-72 h-60 sm:h-72 object-contain"
              />
            </div>

            {/* Category with decorative lines */}
            <div className="flex items-center gap-4 text-muted-foreground mb-8">
              <div className="flex-1 h-px bg-muted-foreground/30"></div>
              <span className="text-sm font-medium">Treatment & Moisturizing</span>
              <div className="flex-1 h-px bg-muted-foreground/30"></div>
            </div>

            {/* Brand and Name */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold leading-tight">
                <span className="text-muted-foreground">{product.brand}</span>{' '}
                <span className="text-foreground">{product.name}</span>
              </h1>
            </div>

            {/* Fit Percentage */}
            <div className="flex justify-center mb-10">
              <FitAnalysisSheet 
                product={product}
                isOpen={isFitAnalysisOpen}
                onOpenChange={setIsFitAnalysisOpen}
              >
                <button
                  className={cn(
                    "inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold cursor-pointer hover:opacity-90 transition-all min-h-[56px] active:scale-95",
                    getFitPillClass(product.fitPct)
                  )}
                  onClick={() => {
                    setIsFitAnalysisOpen(true);
                    lightImpact();
                  }}
                >
                  <span>{product.fitPct}% fit for you</span>
                  <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                    <Info size={14} className="text-white" />
                  </div>
                </button>
              </FitAnalysisSheet>
            </div>

            {/* Rating Indicators */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 relative">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                <div className="font-bold text-foreground">Low Risk</div>
                <div className="text-xs text-muted-foreground">Safety</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 relative">
                  <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                <div className="font-bold text-foreground">Average</div>
                <div className="text-xs text-muted-foreground">Effectiveness</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 relative">
                  <div className="w-4 h-4 bg-muted-foreground rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-muted-foreground rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                <div className="font-bold text-foreground">Average</div>
                <div className="text-xs text-muted-foreground">Normal Skin Fit</div>
              </div>
            </div>

            {/* Buy Online */}
            <div className="bg-muted/30 rounded-3xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-6">Buy Online</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-foreground">
                      <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-foreground">from Amazon</span>
                </div>
                <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg min-h-[48px] flex items-center">
                  {formatPrice(product.price, product.currency)}
                </div>
              </div>
            </div>

            {/* Lóvi Assistant */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">Lóvi Assistant says:</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-2xl flex-shrink-0">🧴</div>
                  <div className="flex-1">
                    <div className="font-bold mb-2 text-foreground">About:</div>
                    <div className="text-muted-foreground leading-relaxed">
                      This soothing and hydrating fluid is ideal for sensitive and dry skin, providing 
                      essential moisture and protection for daily use. It is suitable for both adults and 
                      children, including infants, making it a versatile choice for those seeking to restore 
                      and maintain their skin barrier.
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-2xl flex-shrink-0">✨</div>
                  <div className="flex-1">
                    <div className="font-bold mb-2 text-foreground">For You:</div>
                    <div className="text-muted-foreground leading-relaxed">
                      The product presents a low to absent risk of irritation and offers general 
                      skincare benefits such as hydration and soothing, but its formulation is not ideally 
                      suited for normal skin, leading to a moderate overall fit score.
                    </div>
                  </div>
                </div>
              </div>

              {/* Ask Lóvi Button */}
              <div className="flex justify-end mt-6">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 font-bold min-h-[48px] transition-all active:scale-95">
                  💬 Ask Lóvi...
                </Button>
              </div>

              {/* Questions */}
              <div className="space-y-3 mt-6">
                {questions.map((question, index) => (
                  <button
                    key={index}
                    className={cn(
                      "bg-blue-50 text-blue-700 px-5 py-4 rounded-3xl cursor-pointer transition-all min-h-[56px] flex items-center hover:bg-blue-100 active:scale-[0.98] w-full text-left",
                      selectedQuestion === question && "bg-blue-500 text-white"
                    )}
                    onClick={() => {
                      setSelectedQuestion(selectedQuestion === question ? null : question);
                      selectionChanged();
                    }}
                    aria-label={`Ask question: ${question}`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-xl flex-shrink-0">{index === 0 ? '🧴' : '👶'}</span>
                      <span className="flex-1 font-medium leading-snug">{question}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">Alternatives</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {alternativeProducts.map((alt) => {
                  const getFitColor = (fitPct: number) => {
                    if (fitPct >= 90) return 'bg-violet-500';
                    if (fitPct >= 75) return 'bg-emerald-500';
                    return 'bg-gray-400';
                  };
                  
                  return (
                    <button 
                      key={alt.id} 
                      className="bg-card border rounded-2xl p-4 hover:shadow-md transition-all active:scale-[0.98] text-left w-full relative"
                      onClick={() => {
                        lightImpact();
                        // TODO: Handle alternative product selection
                      }}
                      aria-label={`View alternative product: ${alt.brand} ${alt.name}`}
                    >
                      {/* Fit percentage badge */}
                      <div className={`absolute top-3 left-3 ${getFitColor(alt.fitPct)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        {alt.fitPct}% fit
                      </div>
                      
                      <div className="text-center mb-4 pt-8">
                        <img
                          src={alt.imageUrl}
                          alt={`${alt.brand} ${alt.name}`}
                          className="w-20 h-20 object-contain mx-auto mb-3"
                        />
                        <div className="font-bold text-foreground mb-1">{alt.brand}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2 leading-tight">{alt.name}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="icon" className="bg-gray-100 hover:bg-gray-200 min-h-[36px] min-w-[36px]">
                          <ShoppingCart size={16} />
                        </Button>
                        <div className="text-sm font-bold">{formatPrice(alt.price, alt.currency)}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-center">
                <Button variant="ghost" className="text-muted-foreground font-bold min-h-[48px]">
                  See All
                </Button>
              </div>
            </div>

            {/* How to use */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">How to use the product</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                For normal, sensitive skin aiming to tackle acne and blemishes, apply a small amount of moisturizer 
                evenly across your face using gentle, upward strokes. Allow it to fully absorb into the skin without rinsing, 
                ensuring it provides lasting hydration and support for your skin's needs.
              </p>

              {/* Video Tutorial */}
              <div className="bg-muted/30 rounded-3xl p-6 flex items-center gap-4">
                <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Play size={24} className="text-muted-foreground ml-1" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-foreground mb-2">Watch a tutorial</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play size={12} />
                      3 min
                    </span>
                    <span>Treatment</span>
                    <span>🌻 AM</span>
                    <span>💤 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulation */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">Formulation</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="font-bold mb-3 text-foreground">Key Ingredients:</div>
                  <p className="text-muted-foreground leading-relaxed">
                    Niacinamide, Glycerin, Butyrospermum Parkii Butter Shea Butter, 
                    Dimethicone, Brassica Campestris Oleifera Oil Seed Oil Brassica Campestris Oil Seed Oil
                  </p>
                </div>

                <div>
                  <div className="font-bold mb-3 text-foreground">All Ingredients:</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Water, Glycerin, Niacinamide, Dimethicone, Paraffinum Liquidum, Mineral Oil, 
                    Caprylic Capric Triglyceride, Brassica Campestris Oleifera Oil, Brassica Campestris 
                    Seed Oil, Dimethiconol, Sodium Hydroxide, Ammonium Polyacryldimethyltauramide, 
                    Ammonium Polyacryloyldimethyl Taurate, Disodium Edta, Caprylyl Glycol, Xanthan 
                    Gum, Acrylates C10-30 Alkyl Acrylate Crosspolymer, Butyrospermum Parkii Butter, 
                    Shea Butter, Phenoxyethanol
                  </p>
                </div>
              </div>
            </div>

            {/* Buy Online Options */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">Buy online</h3>
              
              <div className="space-y-4">
                {buyOptions.map((option, index) => (
                  <div key={index} className="bg-muted/30 rounded-3xl p-6 flex items-center justify-between min-h-[72px] hover:bg-muted/40 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-foreground">
                          <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{option.retailer}</div>
                        <div className="text-sm text-muted-foreground">{option.domain}</div>
                      </div>
                    </div>
                    <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold min-h-[48px] flex items-center">
                      {formatPrice(option.price, option.currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
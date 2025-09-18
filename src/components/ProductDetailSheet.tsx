import { useState } from 'react';
import { Share, AlertTriangle, Play, ShoppingCart } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '@/lib/seed';
import { ProductCard } from '@/components/ProductCard';
import { FitAnalysisSheet } from '@/components/FitAnalysisSheet';
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
      <SheetContent side="bottom" className="h-[95vh] sm:h-[90vh] p-0 bg-background">
        <ScrollArea className="h-full">
          <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-foreground text-sm min-h-[48px] px-4">
                <Share size={18} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Share</span>
              </Button>
              <div className="w-12 sm:w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-foreground text-sm min-h-[48px] px-4">
                <AlertTriangle size={18} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Wrong?</span>
              </Button>
            </div>

            {/* Product Image */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <img
                src={product.imageUrl}
                alt={`${product.brand} ${product.name}`}
                className="w-48 h-48 sm:w-64 sm:h-64 object-contain"
              />
            </div>

            {/* Category */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="flex items-center gap-4 text-muted-foreground max-w-full">
                <div className="flex-1 h-px bg-muted-foreground/30"></div>
                <span className="text-sm px-3 whitespace-nowrap">Treatment & Moisturizing</span>
                <div className="flex-1 h-px bg-muted-foreground/30"></div>
              </div>
            </div>

            {/* Brand and Name */}
            <div className="text-center mb-6 sm:mb-8 px-2">
              <h1 className="text-xl sm:text-2xl font-bold leading-tight">
                <span className="text-muted-foreground block sm:inline">{product.brand}</span>{' '}
                <span className="text-foreground">{product.name}</span>
              </h1>
            </div>

            {/* Fit Percentage */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <FitAnalysisSheet 
                product={product}
                isOpen={isFitAnalysisOpen}
                onOpenChange={setIsFitAnalysisOpen}
              >
                <button
                  className={cn(
                    "inline-flex items-center gap-3 sm:gap-3 px-8 sm:px-8 py-4 sm:py-4 rounded-full text-lg sm:text-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity min-h-[56px]",
                    getFitPillClass(product.fitPct)
                  )}
                  onClick={() => setIsFitAnalysisOpen(true)}
                >
                  <span>{product.fitPct}% fit for you</span>
                  <div className="w-6 h-6 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm sm:text-sm font-bold">i</span>
                  </div>
                </button>
              </FitAnalysisSheet>
            </div>

            {/* Rating Indicators */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
              <div className="text-center">
                <div className="w-14 h-14 sm:w-12 sm:h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="font-semibold text-foreground text-sm sm:text-base">Low Risk</div>
                <div className="text-xs text-muted-foreground">Safety</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 sm:w-12 sm:h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-3">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                </div>
                <div className="font-semibold text-foreground text-sm sm:text-base">Average</div>
                <div className="text-xs text-muted-foreground">Effectiveness</div>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 sm:w-12 sm:h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-3">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                </div>
                <div className="font-semibold text-foreground text-sm sm:text-base">Average</div>
                <div className="text-xs text-muted-foreground">Normal Skin Fit</div>
              </div>
            </div>

            {/* Buy Online */}
            <div className="bg-muted/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-10">
              <h3 className="text-xl sm:text-xl font-bold mb-4 sm:mb-6">Buy Online</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-4">
                <div className="flex items-center gap-4 sm:gap-4">
                  <div className="w-8 h-8 sm:w-8 sm:h-8 flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-foreground">
                      <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-base sm:text-base">from Amazon</div>
                  </div>
                </div>
                <div className="bg-yellow-400 text-black px-6 sm:px-6 py-3 sm:py-3 rounded-full font-bold text-base sm:text-lg min-h-[48px] flex items-center">
                  {formatPrice(product.price, product.currency)}
                </div>
              </div>
            </div>

            {/* Lóvi Assistant */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Lóvi Assistant says:</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="text-xl sm:text-2xl flex-shrink-0">🧴</div>
                  <div className="flex-1">
                    <div className="font-bold mb-2 text-foreground text-sm sm:text-base">About:</div>
                    <div className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      This soothing and hydrating fluid is ideal for sensitive and dry skin, providing 
                      essential moisture and protection for daily use. It is suitable for both adults and 
                      children, including infants, making it a versatile choice for those seeking to restore 
                      and maintain their skin barrier.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="text-xl sm:text-2xl flex-shrink-0">✨</div>
                  <div className="flex-1">
                    <div className="font-bold mb-2 text-foreground text-sm sm:text-base">For You:</div>
                    <div className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                      The product presents a low to absent risk of irritation and offers general 
                      skincare benefits such as hydration and soothing, but its formulation is not ideally 
                      suited for normal skin, leading to a moderate overall fit score.
                    </div>
                  </div>
                </div>
              </div>

              {/* Ask Lóvi Button */}
              <div className="flex justify-end mt-6 sm:mt-8">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 sm:px-8 py-3 font-semibold text-base sm:text-base min-h-[48px]">
                  💬 Ask Lóvi...
                </Button>
              </div>

              {/* Questions */}
              <div className="space-y-3 mt-6 sm:mt-6">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className={cn(
                      "bg-blue-50 text-blue-700 px-4 sm:px-5 py-4 sm:py-4 rounded-xl sm:rounded-3xl cursor-pointer transition-colors min-h-[56px] flex items-center",
                      selectedQuestion === question && "bg-blue-500 text-white"
                    )}
                    onClick={() => setSelectedQuestion(selectedQuestion === question ? null : question)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <span className="text-xl flex-shrink-0">{index === 0 ? '🧴' : '👶'}</span>
                      <span className="flex-1 font-medium text-base sm:text-base leading-snug">{question}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">Alternatives</h3>
              
              <div className="flex gap-3 mb-6 flex-wrap">
                <Badge className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full font-semibold">
                  92% fit
                </Badge>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold">
                  88% fit
                </Badge>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                {alternativeProducts.map((alt) => (
                  <div key={alt.id} className="flex-shrink-0">
                    <ProductCard 
                      product={alt}
                      className="w-48"
                    />
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Button variant="ghost" className="text-muted-foreground font-semibold min-h-[48px]">
                  See All
                </Button>
              </div>
            </div>

            {/* How to use */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">How to use the product</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-base">
                For normal, sensitive skin aiming to tackle acne and blemishes, apply a small amount of moisturizer 
                evenly across your face using gentle, upward strokes. Allow it to fully absorb into the skin without rinsing, 
                ensuring it provides lasting hydration and support for your skin's needs.
              </p>

              {/* Video Tutorial */}
              <div className="bg-muted/30 rounded-3xl p-4 sm:p-6 flex items-center gap-4 sm:gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-2xl flex items-center justify-center">
                    <Play size={20} className="text-muted-foreground ml-1" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground mb-2">Watch a tutorial</div>
                  <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play size={10} />
                      3 min
                    </span>
                    <span>Treatment</span>
                    <span className="flex items-center gap-1">
                      🌻 AM
                    </span>
                    <span className="flex items-center gap-1">
                      💤 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulation */}
            <div className="mb-10">
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
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-xl font-bold mb-6 sm:mb-6">Buy online</h3>
              
              <div className="space-y-4 sm:space-y-4">
                {buyOptions.map((option, index) => (
                  <div key={index} className="bg-muted/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex items-center justify-between min-h-[72px] sm:min-h-[72px]">
                    <div className="flex items-center gap-4 sm:gap-4">
                      <div className="w-10 h-10 sm:w-10 sm:h-10 flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-foreground">
                          <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-base sm:text-base">{option.retailer}</div>
                        <div className="text-sm sm:text-sm text-muted-foreground">{option.domain}</div>
                      </div>
                    </div>
                    <div className="bg-yellow-400 text-black px-4 sm:px-6 py-3 sm:py-3 rounded-full font-bold text-base sm:text-base min-h-[48px] flex items-center">
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
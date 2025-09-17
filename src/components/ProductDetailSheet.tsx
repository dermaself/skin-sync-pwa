import { useState } from 'react';
import { Share, AlertTriangle, ChevronRight, Play } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '@/lib/seed';
import { cn } from '@/lib/utils';

interface ProductDetailSheetProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const ProductDetailSheet = ({ product, isOpen, onOpenChange, children }: ProductDetailSheetProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

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

  const alternativeProducts = [
    {
      id: 'alt1',
      name: 'Advanced Snail 96 Mucin Power Essence',
      brand: 'COSRX',
      price: 16.70,
      currency: 'EUR',
      fitPct: 92,
      imageUrl: '/images/products/ordinary-rosehip.png'
    },
    {
      id: 'alt2', 
      name: 'Real Ferment Micro Essence',
      brand: 'Neogen',
      price: 23.99,
      currency: 'EUR',
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
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <ScrollArea className="h-full">
          <div className="px-4 pt-6 pb-32">
            {/* Header */}
            <SheetHeader className="flex flex-row items-center justify-between mb-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share size={16} />
                Share
              </Button>
              <div className="w-12 h-1 bg-muted rounded-full" />
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <AlertTriangle size={16} />
                Wrong?
              </Button>
            </SheetHeader>

            {/* Product Image */}
            <div className="flex justify-center mb-8">
              <img
                src={product.imageUrl}
                alt={`${product.brand} ${product.name}`}
                className="w-48 h-48 object-contain"
              />
            </div>

            {/* Category */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-6 h-0.5 bg-current"></div>
                <span className="text-sm">Treatment & Moisturizing</span>
              </div>
            </div>

            {/* Brand and Name */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">
                <span className="text-muted-foreground">{product.brand}</span>{' '}
                <span className="text-foreground">{product.name}</span>
              </h1>
            </div>

            {/* Fit Percentage */}
            <div className="flex justify-center mb-8">
              <div className={cn(
                "inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold",
                getFitPillClass(product.fitPct)
              )}>
                <span>{product.fitPct}% fit for you</span>
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">i</span>
                </div>
              </div>
            </div>

            {/* Rating Pills */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="font-semibold text-sm">Low Risk</div>
                <div className="text-xs text-muted-foreground">Safety</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
                <div className="font-semibold text-sm">Average</div>
                <div className="text-xs text-muted-foreground">Effectiveness</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
                <div className="font-semibold text-sm">Average</div>
                <div className="text-xs text-muted-foreground">Normal Skin Fit</div>
              </div>
            </div>

            {/* Buy Online */}
            <div className="bg-muted/50 rounded-2xl p-4 mb-8">
              <h3 className="text-lg font-semibold mb-4">Buy Online</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
                    <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
                  </svg>
                  <div>
                    <div className="font-medium">from Amazon</div>
                  </div>
                </div>
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                  {formatPrice(product.price, product.currency)}
                </div>
              </div>
            </div>

            {/* Lóvi Assistant */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Lóvi Assistant says:</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="text-2xl">🧴</div>
                  <div>
                    <div className="font-semibold mb-1">About:</div>
                    <div className="text-muted-foreground">
                      This soothing and hydrating fluid is ideal for sensitive and dry skin, providing 
                      essential moisture and protection for daily use. It is suitable for both adults and 
                      children, including infants, making it a versatile choice for those seeking to restore 
                      and maintain their skin barrier.
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="text-2xl">✨</div>
                  <div>
                    <div className="font-semibold mb-1">For You:</div>
                    <div className="text-muted-foreground">
                      The product presents a low to absent risk of irritation and offers general 
                      skincare benefits such as hydration and soothing, but its formulation is not ideally 
                      suited for normal skin, leading to a moderate overall fit score.
                    </div>
                  </div>
                </div>
              </div>

              {/* Ask Lóvi Button */}
              <div className="flex justify-end mt-6">
                <Button className="bg-primary text-primary-foreground rounded-full px-6 py-3">
                  💬 Ask Lóvi...
                </Button>
              </div>

              {/* Questions */}
              <div className="space-y-3 mt-4">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className={cn(
                      "bg-primary/10 text-primary px-4 py-3 rounded-2xl cursor-pointer transition-colors",
                      selectedQuestion === question && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => setSelectedQuestion(selectedQuestion === question ? null : question)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{index === 0 ? '🧴' : '👶'}</span>
                      <span className="flex-1">{question}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Alternatives</h3>
              
              <div className="flex gap-2 mb-4">
                <Badge className="bg-violet-500 text-white">92% fit</Badge>
                <Badge className="bg-emerald-500 text-white">88% fit</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {alternativeProducts.map((alt) => (
                  <div key={alt.id} className="space-y-3">
                    <img
                      src={alt.imageUrl}
                      alt={`${alt.brand} ${alt.name}`}
                      className="w-full h-32 object-contain"
                    />
                    <div>
                      <div className="text-xs text-muted-foreground">{alt.brand}</div>
                      <div className="font-medium text-sm">{alt.name}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
                        </svg>
                        <span className="text-sm font-medium">
                          {formatPrice(alt.price, alt.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button variant="ghost" className="text-muted-foreground">
                  See All
                </Button>
              </div>
            </div>

            {/* How to use */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">How to use the product</h3>
              <p className="text-muted-foreground mb-6">
                For normal, sensitive skin aiming to tackle acne and blemishes, apply a small amount of moisturizer 
                evenly across your face using gentle, upward strokes. Allow it to fully absorb into the skin without rinsing, 
                ensuring it provides lasting hydration and support for your skin's needs.
              </p>

              {/* Video Tutorial */}
              <div className="bg-muted rounded-2xl p-4 flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center">
                    <Play size={20} className="text-white ml-1" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Watch a tutorial</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Play size={12} />
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
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Formulation</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-2">Key Ingredients:</div>
                  <p className="text-muted-foreground">
                    Niacinamide, Glycerin, Butyrospermum Parkii Butter Shea Butter, 
                    Dimethicone, Brassica Campestris Oleifera Oil Seed Oil Brassica Campestris Oil Seed Oil
                  </p>
                </div>

                <div>
                  <div className="font-semibold mb-2">All Ingredients:</div>
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
              <h3 className="text-lg font-semibold mb-4">Buy online</h3>
              
              <div className="space-y-3">
                {buyOptions.map((option, index) => (
                  <div key={index} className="bg-muted/50 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
                      </svg>
                      <div>
                        <div className="font-semibold">{option.retailer}</div>
                        <div className="text-sm text-muted-foreground">{option.domain}</div>
                      </div>
                    </div>
                    <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
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
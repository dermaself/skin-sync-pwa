import { useState } from 'react';
import { Share, AlertTriangle, Play, ShoppingCart } from 'lucide-react';
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
      <SheetContent side="bottom" className="h-[90vh] p-0 bg-background">
        <ScrollArea className="h-full">
          <div className="px-6 pt-6 pb-32">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-foreground">
                <Share size={16} />
                Share
              </Button>
              <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-foreground">
                <AlertTriangle size={16} />
                Wrong?
              </Button>
            </div>

            {/* Product Image */}
            <div className="flex justify-center mb-8">
              <img
                src={product.imageUrl}
                alt={`${product.brand} ${product.name}`}
                className="w-64 h-64 object-contain"
              />
            </div>

            {/* Category */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex-1 h-px bg-muted-foreground/30"></div>
                <span className="text-sm px-2">Treatment & Moisturizing</span>
                <div className="flex-1 h-px bg-muted-foreground/30"></div>
              </div>
            </div>

            {/* Brand and Name */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold leading-tight">
                <span className="text-muted-foreground">{product.brand}</span>{' '}
                <span className="text-foreground">{product.name}</span>
              </h1>
            </div>

            {/* Fit Percentage */}
            <div className="flex justify-center mb-8">
              <div className={cn(
                "inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold",
                getFitPillClass(product.fitPct)
              )}>
                <span>{product.fitPct}% fit for you</span>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">i</span>
                </div>
              </div>
            </div>

            {/* Rating Indicators */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="font-semibold text-foreground">Low Risk</div>
                <div className="text-sm text-muted-foreground">Safety</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                </div>
                <div className="font-semibold text-foreground">Average</div>
                <div className="text-sm text-muted-foreground">Effectiveness</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                </div>
                <div className="font-semibold text-foreground">Average</div>
                <div className="text-sm text-muted-foreground">Normal Skin Fit</div>
              </div>
            </div>

            {/* Buy Online */}
            <div className="bg-muted/30 rounded-3xl p-6 mb-10">
              <h3 className="text-xl font-bold mb-6">Buy Online</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-foreground">
                      <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">from Amazon</div>
                  </div>
                </div>
                <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg">
                  {formatPrice(product.price, product.currency)}
                </div>
              </div>
            </div>

            {/* Lóvi Assistant */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6">Lóvi Assistant says:</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-2xl">🧴</div>
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
                  <div className="text-2xl">✨</div>
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
              <div className="flex justify-end mt-8">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 font-semibold">
                  💬 Ask Lóvi...
                </Button>
              </div>

              {/* Questions */}
              <div className="space-y-4 mt-6">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className={cn(
                      "bg-blue-50 text-blue-700 px-5 py-4 rounded-3xl cursor-pointer transition-colors",
                      selectedQuestion === question && "bg-blue-500 text-white"
                    )}
                    onClick={() => setSelectedQuestion(selectedQuestion === question ? null : question)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{index === 0 ? '🧴' : '👶'}</span>
                      <span className="flex-1 font-medium">{question}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6">Alternatives</h3>
              
              <div className="flex gap-3 mb-6">
                <Badge className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-full font-semibold">
                  92% fit
                </Badge>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full font-semibold">
                  88% fit
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {alternativeProducts.map((alt) => (
                  <div key={alt.id} className="space-y-4">
                    <div className="bg-muted/30 rounded-2xl p-4 flex items-center justify-center h-40">
                      <img
                        src={alt.imageUrl}
                        alt={`${alt.brand} ${alt.name}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{alt.brand}</div>
                      <div className="font-semibold text-foreground mb-3 leading-tight">{alt.name}</div>
                      <div className="flex items-center gap-2">
                        <ShoppingCart size={16} className="text-muted-foreground" />
                        <span className="font-bold text-foreground">
                          {formatPrice(alt.price, alt.currency)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button variant="ghost" className="text-muted-foreground font-semibold">
                  See All
                </Button>
              </div>
            </div>

            {/* How to use */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6">How to use the product</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                For normal, sensitive skin aiming to tackle acne and blemishes, apply a small amount of moisturizer 
                evenly across your face using gentle, upward strokes. Allow it to fully absorb into the skin without rinsing, 
                ensuring it provides lasting hydration and support for your skin's needs.
              </p>

              {/* Video Tutorial */}
              <div className="bg-muted/30 rounded-3xl p-6 flex items-center gap-6">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
                    <Play size={24} className="text-muted-foreground ml-1" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-foreground mb-2">Watch a tutorial</div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-6">Buy online</h3>
              
              <div className="space-y-4">
                {buyOptions.map((option, index) => (
                  <div key={index} className="bg-muted/30 rounded-3xl p-6 flex items-center justify-between">
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
                    <div className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold">
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
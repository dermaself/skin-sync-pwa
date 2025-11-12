import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, ChevronUp, ChevronDown, Star } from 'lucide-react';
import { SegmentedControl } from '@/components/SegmentedControl';
import { AlternativeProductCard } from '@/components/AlternativeProductCard';
import { ProductDetailSheet } from '@/components/ProductDetailSheet';
import { Product } from '@/lib/seed';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface RoutineStepProduct {
  name: string;
  brand: string;
  price: string; // formatted with currency symbol
  fitPct: number;
  verified?: boolean;
  image: string;
}

interface RoutineStep {
  step: number;
  title: string;
  product: RoutineStepProduct;
  whyPicked: string;
}

interface AlternativeItem {
  id: string;
  name: string;
  brand: string;
  price: string; // formatted with currency symbol
  fitPct: number;
  image: string;
}

// Sample routine data based on the uploaded images
const routineFormula = {
  name: "La Formula Routine di Lorenzo",
  goal: "Mantenimento delicato con ingredienti calmanti per pelle mista sensibile",
  targetGoal: "Mantenere una pelle sana con cure delicate",
  age: "28 anni",
  skinType: "Mista (zona T grassa, guance normali)",
  skinConcerns: "Imperfezioni occasionali, sensibilità",
  skinConditions: "Nessuna segnalata",
  sensitivity: "Alta - reagisce ai prodotti profumati",
  climate: "Ambiente urbano temperato",
  routineExperience: "Intermedio - ha una routine consolidata"
};

// Alternative products for each step - expanded to cover all routine steps
const alternativeProducts = {
  'morning-1': [
    { id: 'alt1', name: 'CeraVe Foaming Facial Cleanser', brand: 'CeraVe', price: '$12.99', fitPct: 92, image: '/images/products/cerave-pm.png' },
    { id: 'alt2', name: 'La Roche-Posay Toleriane Cleanser', brand: 'La Roche-Posay', price: '$14.99', fitPct: 88, image: '/images/products/lrp-toleriane.png' }
  ],
  'morning-2': [
    { id: 'alt3', name: 'Paula\'s Choice CALM Toner', brand: 'Paula\'s Choice', price: '$22.00', fitPct: 94, image: '/images/products/pai-rosehip.png' },
    { id: 'alt4', name: 'Klairs Supple Preparation Toner', brand: 'Klairs', price: '$18.00', fitPct: 89, image: '/images/products/pixi-milky.png' }
  ],
  'morning-3': [
    { id: 'alt5', name: 'EltaMD UV Clear SPF 46', brand: 'EltaMD', price: '$37.00', fitPct: 96, image: '/images/products/fab-cleanser.png' },
    { id: 'alt6', name: 'Neutrogena Ultra Sheer SPF 60', brand: 'Neutrogena', price: '$8.99', fitPct: 85, image: '/images/products/naturium-mandelic.png' }
  ],
  'evening-1': [
    { id: 'alt7', name: 'Banila Co Clean It Zero', brand: 'Banila Co', price: '$18.00', fitPct: 91, image: '/images/products/ordinary-rosehip.png' },
    { id: 'alt8', name: 'DHC Deep Cleansing Oil', brand: 'DHC', price: '$28.00', fitPct: 87, image: '/images/products/pacifica-sea-foam.png' }
  ],
  'evening-2': [
    { id: 'alt9', name: 'CeraVe Foaming Facial Cleanser', brand: 'CeraVe', price: '$12.99', fitPct: 92, image: '/images/products/cerave-pm.png' },
    { id: 'alt10', name: 'La Roche-Posay Toleriane Cleanser', brand: 'La Roche-Posay', price: '$14.99', fitPct: 88, image: '/images/products/lrp-toleriane.png' }
  ],
  'evening-3': [
    { id: 'alt11', name: 'Paula\'s Choice CALM Toner', brand: 'Paula\'s Choice', price: '$22.00', fitPct: 94, image: '/images/products/pai-rosehip.png' },
    { id: 'alt12', name: 'Klairs Supple Preparation Toner', brand: 'Klairs', price: '$18.00', fitPct: 89, image: '/images/products/pixi-milky.png' }
  ],
  'evening-4': [
    { id: 'alt13', name: 'The Ordinary Niacinamide', brand: 'The Ordinary', price: '$7.20', fitPct: 93, image: '/images/products/ordinary-rosehip.png' },
    { id: 'alt14', name: 'Paula\'s Choice 2% BHA', brand: 'Paula\'s Choice', price: '$30.00', fitPct: 88, image: '/images/products/ren-aha-tonic.png' }
  ],
  'evening-5': [
    { id: 'alt15', name: 'CeraVe PM Facial Moisturizer', brand: 'CeraVe', price: '$16.99', fitPct: 94, image: '/images/products/cerave-pm.png' },
    { id: 'alt16', name: 'Neutrogena Hydro Boost', brand: 'Neutrogena', price: '$15.99', fitPct: 86, image: '/images/products/fab-cleanser.png' }
  ],
  'weekly-1': [
    { id: 'alt17', name: 'Banila Co Clean It Zero', brand: 'Banila Co', price: '$18.00', fitPct: 91, image: '/images/products/ordinary-rosehip.png' },
    { id: 'alt18', name: 'DHC Deep Cleansing Oil', brand: 'DHC', price: '$28.00', fitPct: 87, image: '/images/products/pacifica-sea-foam.png' }
  ],
  'weekly-2': [
    { id: 'alt19', name: 'CeraVe Foaming Facial Cleanser', brand: 'CeraVe', price: '$12.99', fitPct: 92, image: '/images/products/cerave-pm.png' },
    { id: 'alt20', name: 'La Roche-Posay Toleriane Cleanser', brand: 'La Roche-Posay', price: '$14.99', fitPct: 88, image: '/images/products/lrp-toleriane.png' }
  ],
  'weekly-3': [
    { id: 'alt21', name: 'Tatcha Rice Enzyme Powder', brand: 'Tatcha', price: '$65.00', fitPct: 89, image: '/images/products/pai-rosehip.png' },
    { id: 'alt22', name: 'Dermalogica Daily Microfoliant', brand: 'Dermalogica', price: '$59.00', fitPct: 85, image: '/images/products/pixi-milky.png' }
  ],
  'weekly-4': [
    { id: 'alt23', name: 'Freeman Charcoal & Black Sugar', brand: 'Freeman', price: '$3.99', fitPct: 82, image: '/images/products/naturium-mandelic.png' },
    { id: 'alt24', name: 'Origins Clear Improvement', brand: 'Origins', price: '$26.00', fitPct: 87, image: '/images/products/ordinary-rosehip.png' }
  ],
  'weekly-5': [
    { id: 'alt25', name: 'Paula\'s Choice CALM Toner', brand: 'Paula\'s Choice', price: '$22.00', fitPct: 94, image: '/images/products/pai-rosehip.png' },
    { id: 'alt26', name: 'Klairs Supple Preparation Toner', brand: 'Klairs', price: '$18.00', fitPct: 89, image: '/images/products/pixi-milky.png' }
  ],
  'weekly-6': [
    { id: 'alt27', name: 'The Ordinary Niacinamide', brand: 'The Ordinary', price: '$7.20', fitPct: 93, image: '/images/products/ordinary-rosehip.png' },
    { id: 'alt28', name: 'Paula\'s Choice 2% BHA', brand: 'Paula\'s Choice', price: '$30.00', fitPct: 88, image: '/images/products/ren-aha-tonic.png' }
  ],
  'weekly-7': [
    { id: 'alt29', name: 'CeraVe PM Facial Moisturizer', brand: 'CeraVe', price: '$16.99', fitPct: 94, image: '/images/products/cerave-pm.png' },
    { id: 'alt30', name: 'Neutrogena Hydro Boost', brand: 'Neutrogena', price: '$15.99', fitPct: 86, image: '/images/products/fab-cleanser.png' }
  ]
};

const routineSteps = {
  morning: [
    {
      step: 1,
      title: "Cleanser",
      product: {
        name: "The Simple Mild Foam Cleanser",
        brand: "Simple",
        price: "$6.99",
        fitPct: 95,
        verified: true,
        image: "/images/products/fab-cleanser.png"
      },
      whyPicked: "Perfetto per pelle sensibile con formula delicata e non irritante. Rimuove le impurità senza eliminare gli oli naturali."
    },
    {
      step: 2,
      title: "Tonico Lenitivo",
      product: {
        name: "Madagascar Centella Probio-CICA Essence Toner",
        brand: "SKIN1004",
        price: "$17.90",
        fitPct: 94,
        verified: true,
        image: "/images/products/pixi-milky.png"
      },
      whyPicked: "La Centella asiatica aiuta a calmare l'infiammazione e ridurre il rossore. I probiotici supportano la salute della barriera cutanea."
    },
    {
      step: 3,
      title: "Crema Idratante con Protezione Solare",
      product: {
        name: "Soon Jung Mild Defence Sun Cream",
        brand: "Etude House",
        price: "$15.00",
        fitPct: 96,
        verified: true,
        image: "/images/products/cerave-pm.png"
      },
      whyPicked: "SPF 50+ fornisce un'eccellente protezione. Pantenolo e madecassoside leniscono la pelle sensibile mentre proteggono dai danni UV."
    }
  ],
  evening: [
    {
      step: 1,
      title: "Pre-Detergente",
      product: {
        name: "Deep Cleansing Oil",
        brand: "DHC",
        price: "$28.00",
        fitPct: 91,
        verified: true,
        image: "/images/products/ordinary-rosehip.png"
      },
      whyPicked: "La formula a base di olio d'oliva scioglie trucco e protezione solare efficacemente senza sfregamenti aggressivi."
    },
    {
      step: 2,
      title: "Detergente",
      product: {
        name: "The Simple Mild Foam Cleanser",
        brand: "Simple",
        price: "$6.99",
        fitPct: 95,
        verified: true,
        image: "/images/products/fab-cleanser.png"
      },
      whyPicked: "Seconda detersione per rimuovere le impurità rimanenti mantenendo l'equilibrio naturale della pelle."
    },
    {
      step: 3,
      title: "Tonico Lenitivo",
      product: {
        name: "Madagascar Centella Probio-CICA Essence Toner",
        brand: "SKIN1004",
        price: "$17.90",
        fitPct: 94,
        verified: true,
        image: "/images/products/pixi-milky.png"
      },
      whyPicked: "Prepara la pelle per i prodotti trattanti fornendo benefici calmanti."
    },
    {
      step: 4,
      title: "Siero o Trattamento",
      product: {
        name: "Centella Unscented Serum",
        brand: "Mad Hippie",
        price: "$24.99",
        fitPct: 93,
        verified: true,
        image: "/images/products/naturium-mandelic.png"
      },
      whyPicked: "Alta concentrazione di centella fornisce benefici lenitivi intensivi per la pelle reattiva."
    },
    {
      step: 5,
      title: "Crema Idratante",
      product: {
        name: "Centella Asiatica Ampoule",
        brand: "PURITO",
        price: "$16.90",
        fitPct: 94,
        verified: true,
        image: "/images/products/pai-rosehip.png"
      },
      whyPicked: "Formula leggera ma nutriente con ceramidi e centella per la riparazione notturna della pelle."
    }
  ],
  weekly: [
    {
      step: 1,
      title: "Pre-Cleanser",
      product: {
        name: "Deep Cleansing Oil",
        brand: "DHC",
        price: "$28.00",
        fitPct: 91,
        verified: true,
        image: "/images/products/ordinary-rosehip.png"
      },
      whyPicked: "Removes makeup and sunscreen buildup for deeper cleansing."
    },
    {
      step: 2,
      title: "Cleanser",
      product: {
        name: "The Simple Mild Foam Cleanser",
        brand: "Simple",
        price: "$6.99",
        fitPct: 95,
        verified: true,
        image: "/images/products/fab-cleanser.png"
      },
      whyPicked: "Gentle base cleanse before enzyme treatment."
    },
    {
      step: 3,
      title: "Enzyme Powder",
      product: {
        name: "Phyto Enzyme Powder Wash",
        brand: "Tatcha",
        price: "$65.00",
        fitPct: 89,
        verified: true,
        image: "/images/products/pixi-milky.png"
      },
      whyPicked: "Rice-based enzymes provide gentle exfoliation without physical scrubbing."
    },
    {
      step: 4,
      title: "Cleansing Mask",
      product: {
        name: "Cica Bubble Sparkling Booster",
        brand: "VT Cosmetics",
        price: "$18.00",
        fitPct: 92,
        verified: true,
        image: "/images/products/pacifica-sea-foam.png"
      },
      whyPicked: "Bubbling action deep cleans pores while centella soothes any irritation."
    },
    {
      step: 5,
      title: "Soothing Toner",
      product: {
        name: "Madagascar Centella Probio-CICA Essence Toner",
        brand: "SKIN1004",
        price: "$17.90",
        fitPct: 94,
        verified: true,
        image: "/images/products/pixi-milky.png"
      },
      whyPicked: "Restores pH balance and prepares skin after intensive cleansing."
    },
    {
      step: 6,
      title: "Serum or Treatment",
      product: {
        name: "Centella Unscented Serum",
        brand: "Mad Hippie",
        price: "$24.99",
        fitPct: 93,
        verified: true,
        image: "/images/products/naturium-mandelic.png"
      },
      whyPicked: "Concentrated treatment to repair and strengthen skin barrier."
    },
    {
      step: 7,
      title: "Moisturizer",
      product: {
        name: "Centella Asiatica Ampoule",
        brand: "PURITO",
        price: "$16.90",
        fitPct: 94,
        verified: true,
        image: "/images/products/pai-rosehip.png"
      },
      whyPicked: "Rich, nourishing formula for intensive overnight repair after weekly treatment."
    }
  ]
};

const RoutineForYou = () => {
  const navigate = useNavigate();
  const [selectedRoutine, setSelectedRoutine] = useState<'Morning' | 'Evening' | 'Weekly'>('Morning');
  const [expandedAlternatives, setExpandedAlternatives] = useState<Set<string>>(new Set());
  const [expandedFormula, setExpandedFormula] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);
  const morningRef = useRef<HTMLDivElement>(null);
  const eveningRef = useRef<HTMLDivElement>(null);
  const weeklyRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    navigate(-1);
  };

  const scrollToSection = (value: 'Morning' | 'Evening' | 'Weekly') => {
    setSelectedRoutine(value);
    let targetRef;
    switch (value) {
      case 'Morning':
        targetRef = morningRef;
        break;
      case 'Evening':
        targetRef = eveningRef;
        break;
      case 'Weekly':
        targetRef = weeklyRef;
        break;
    }
    
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleAlternatives = (stepKey: string) => {
    setExpandedAlternatives(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepKey)) {
        newSet.delete(stepKey);
      } else {
        newSet.add(stepKey);
      }
      return newSet;
    });
  };

  const handleProductClick = (step: RoutineStep) => {
    const product: Product = {
      id: `routine-${step.step}`,
      name: step.product.name,
      brand: step.product.brand,
      category: 'Treatment',
      price: parseFloat(step.product.price.replace('$', '')),
      currency: 'EUR',
      retailer: 'dolcegabbana',
      fitPct: step.product.fitPct,
      imageUrl: step.product.image,
    } as Product;
    setSelectedProduct(product);
    setIsProductSheetOpen(true);
  };

  const handleAlternativeClick = (alt: AlternativeItem) => {
    const product: Product = {
      id: alt.id,
      name: alt.name,
      brand: alt.brand,
      category: 'Treatment',
      price: parseFloat(alt.price.replace('$', '')),
      currency: 'EUR',
      retailer: 'dolcegabbana',
      fitPct: alt.fitPct,
      imageUrl: alt.image,
    } as Product;
    setSelectedProduct(product);
    setIsProductSheetOpen(true);
  };

  const getFitPillClass = (fitPct: number) => {
    if (fitPct >= 90) return 'fit-pill-violet';
    if (fitPct >= 75) return 'fit-pill-emerald';
    return 'fit-pill-gray';
  };

  const renderProductStep = (step: RoutineStep, routineType: 'morning' | 'evening' | 'weekly') => {
    const stepKey = `${routineType}-${step.step}`;
    const alternatives = (alternativeProducts as Record<string, AlternativeItem[]>)[stepKey] || [];
    const isExpanded = expandedAlternatives.has(stepKey);

    const starCount = Math.max(1, Math.min(5, Math.round(step.product.fitPct / 20)));

    return (
      <div key={stepKey} className="mb-8">
        <div className="dermaself-card">
          {/* Header */}
          <div className="flex items-start gap-4 mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
              {step.step}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight mb-1">{step.title}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-semibold ${getFitPillClass(step.product.fitPct)}`}>
                  {step.product.fitPct}% fit
                </span>
                {step.product.verified && (
                  <span className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-medium">
                    ✓ MD Verified
                  </span>
                )}
                {/* Star rating from fit */}
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn('h-3.5 w-3.5', i < starCount ? 'text-emerald-fit fill-emerald-fit' : 'text-muted-foreground/40')} />
                  ))}
                </span>
              </div>
            </div>
          </div>

          <Separator className="my-3" />

          {/* Product content */}
          <button 
            className="flex gap-4 mb-4 w-full text-left hover:bg-muted/30 rounded-2xl p-3 transition-all active:scale-[0.98]"
            onClick={() => handleProductClick(step)}
          >
            <div className="flex-shrink-0">
              <img 
                src={step.product.image} 
                alt={step.product.name}
                className="w-20 h-20 rounded-lg object-cover bg-muted"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <span className="category-chip">{step.product.brand}</span>
              </div>
              <h4 className="font-medium text-base leading-tight mb-2 line-clamp-2">{step.product.name}</h4>
              <div className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">
                💰 {step.product.price}
              </div>
            </div>
          </button>

          <div className="bg-muted/50 rounded-lg p-3 mb-4">
            <p className="text-sm leading-relaxed">{step.whyPicked}</p>
          </div>

          {alternatives.length > 0 && (
            <Button
              variant="ghost"
              className="w-full justify-between text-sm"
              onClick={() => toggleAlternatives(stepKey)}
            >
              <span>Visualizza {alternatives.length} alternative</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}

          {isExpanded && alternatives.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Queste alternative funzionano benissimo anche per il tuo profilo cutaneo:
              </p>
              {/* Horizontal scrolling alternatives */}
              <div className="mobile-scroll-container pb-4 -mx-4 px-4">
                <div className="flex gap-3">
                  {alternatives.map((alt) => (
                    <div key={alt.id} className="mobile-scroll-item max-w-40">
                      <AlternativeProductCard
                        product={{...alt, fitPercent: alt.fitPct}}
                        onClick={() => handleAlternativeClick(alt)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mobile-content bg-background">
        {/* Enhanced Sticky Header with Navigation */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-20 border-b">
          {/* Top bar with title and close */}
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-semibold">Routine per te</h1>
            <Button variant="ghost" size="icon" onClick={handleClose} className="min-w-[44px] min-h-[44px]">
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Sticky Routine Navigation */}
          <div className="px-4 pb-3 flex justify-center">
            <SegmentedControl
              options={[
                { value: 'Morning', label: 'Mattina', icon: 'sun' },
                { value: 'Evening', label: 'Sera', icon: 'moon' },
                { value: 'Weekly', label: 'Settimanale', icon: 'sparkles' }
              ]}
              value={selectedRoutine}
              onChange={scrollToSection}
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="px-4 py-4">
          {/* Routine Formula Card */}
          <div className="dermaself-card mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <h2 className="text-lg font-semibold leading-tight">{routineFormula.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{routineFormula.goal}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setExpandedFormula(!expandedFormula)}
                className="shrink-0 min-w-[44px] min-h-[44px]"
              >
                <ChevronUp className={`h-5 w-5 transition-transform ${expandedFormula ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {expandedFormula && (
              <div className="space-y-4 mb-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-start py-2">
                    <span className="text-muted-foreground">Obiettivo</span>
                    <span className="font-medium text-right max-w-[60%]">{routineFormula.targetGoal}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-muted-foreground">Età</span>
                    <span className="font-medium text-right">{routineFormula.age}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-muted-foreground">Tipo di Pelle</span>
                    <span className="font-medium text-right max-w-[60%]">{routineFormula.skinType}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-muted-foreground">Problematiche</span>
                    <span className="font-medium text-right max-w-[60%]">{routineFormula.skinConcerns}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-muted-foreground">Condizioni</span>
                    <span className="font-medium text-right max-w-[60%]">{routineFormula.skinConditions}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-muted-foreground">Sensibilità</span>
                    <span className="font-medium text-right max-w-[60%]">{routineFormula.sensitivity}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-muted-foreground">Clima</span>
                    <span className="font-medium text-right max-w-[60%]">{routineFormula.climate}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-muted-foreground">Esperienza Routine</span>
                    <span className="font-medium text-right max-w-[60%]">{routineFormula.routineExperience}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust Message */}
          <div className="mb-8 dermaself-card p-4">
            <h3 className="text-base font-medium mb-2 text-center">La tua pelle è il nostro obiettivo principale</h3>
            <p className="text-sm text-muted-foreground text-center">
              Tutte le raccomandazioni sono imparziali e non sponsorizzate. Scelte dall'AI di Dermaself e Revisionate dai nostri Medici.
            </p>
          </div>

          {/* Morning Section */}
          <div ref={morningRef} className="mb-12">
            <div className="text-center py-6 mb-6">
              <div className="text-4xl mb-3">🌅</div>
              <h2 className="text-2xl font-bold">Routine Mattutina</h2>
            </div>
            {routineSteps.morning.map((step) => renderProductStep(step, 'morning'))}
          </div>

          {/* Trust Message Between Sections */}
          <div className="mb-8 dermaself-card p-4">
            <h3 className="text-base font-medium mb-2 text-center">La tua pelle è il nostro obiettivo principale</h3>
            <p className="text-sm text-muted-foreground text-center">
              Tutte le raccomandazioni sono imparziali e non sponsorizzate. Scelte dall'AI di Dermaself e Revisionate dai nostri Medici.
            </p>
          </div>

          {/* Evening Section */}
          <div ref={eveningRef} className="mb-12">
            <div className="text-center py-6 mb-6">
              <div className="text-4xl mb-3">🌙</div>
              <h2 className="text-2xl font-bold">Routine Serale</h2>
            </div>
            {routineSteps.evening.map((step) => renderProductStep(step, 'evening'))}
          </div>

          {/* Trust Message Between Sections */}
          <div className="mb-8 dermaself-card p-4">
            <h3 className="text-base font-medium mb-2 text-center">La tua pelle è il nostro obiettivo principale</h3>
            <p className="text-sm text-muted-foreground text-center">
              Tutte le raccomandazioni sono imparziali e non sponsorizzate. Scelte dall'AI di Dermaself e Revisionate dai nostri Medici.
            </p>
          </div>

          {/* Weekly Section */}
          <div ref={weeklyRef} className="mb-12">
            <div className="text-center py-6 mb-6">
              <div className="text-4xl mb-3">✨</div>
              <h2 className="text-2xl font-bold mb-4">Settimanale</h2>
              <p className="text-base mb-6 text-muted-foreground">Un trattamento settimanale per la tua pelle 🤗</p>
              <div className="dermaself-card p-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎁</div>
                  <div>
                    <p className="font-medium mb-2">Goditi un programma speciale con passaggi aggiuntivi per trattare la tua pelle nel miglior modo possibile!</p>
                    <p className="text-sm text-muted-foreground">Per risultati ottimali, usa questi 1-2 volte al posto della tua routine serale regolare e goditi il tuo tempo per te radiosa 👑</p>
                  </div>
                </div>
              </div>
            </div>
            {routineSteps.weekly.map((step) => renderProductStep(step, 'weekly'))}
          </div>
        </div>
      </ScrollArea>
    </div>

    {/* Product Detail Sheet - Only opens on specific clicks */}
    <ProductDetailSheet
      product={selectedProduct}
      isOpen={isProductSheetOpen}
      onOpenChange={setIsProductSheetOpen}
    >
      <></>
    </ProductDetailSheet>
    </>
  );
};

export default RoutineForYou;

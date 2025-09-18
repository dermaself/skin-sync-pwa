import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronUp, ShoppingCart, RotateCcw } from 'lucide-react';
import { SegmentedControl } from '@/components/SegmentedControl';
import { AlternativeProductCard } from '@/components/AlternativeProductCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample routine data based on the uploaded images
const routineFormula = {
  name: "Lorenzo's Routine Formula",
  goal: "Visible Pores, $19 and less",
  targetGoal: "Visible Pores",
  age: "35 - 44",
  skinType: "Normal",
  skinSensitivity: "Sensitive",
  price: "Smart Savings ($19 and less)",
  skinConcerns: "Fine lines and wrinkles, Enlarged Pores",
  skinConditions: "No, I don't",
  healthConditions: "No, I don't",
  koreanSkincare: "Yes",
  lastUpdated: "17.09.2025 11:28"
};

// Alternative products for each step - expanded to cover all routine steps
const alternativeProducts = {
  'morning-1': [
    { name: "Madagascar Centella Toning Toner", brand: "SKIN1004", price: "€18.39", fitPercent: 93, image: "/images/products/ren-aha-tonic.png", verified: true },
    { name: "Gentle Low pH Good Morning Cleanser", brand: "CosRX", price: "€15.20", fitPercent: 91, image: "/images/products/fab-cleanser.png", verified: true },
    { name: "Fresh Soy Cleanser", brand: "Fresh", price: "€22.50", fitPercent: 89, image: "/images/products/pacifica-sea-foam.png", verified: false },
    { name: "Hydrating Foaming Oil Cleanser", brand: "CeraVe", price: "€11.99", fitPercent: 87, image: "/images/products/cerave-pm.png", verified: true },
  ],
  'morning-2': [
    { name: "Calming Toner", brand: "Dear Klairs", price: "€16.99", fitPercent: 90, image: "/images/products/pixi-milky.png", verified: true },
    { name: "Be Plain Cicaful Calming Toner", brand: "Be Plain", price: "€14.80", fitPercent: 88, image: "/images/products/lrp-toleriane.png", verified: false },
    { name: "Glow Tonic", brand: "Pixi", price: "€18.00", fitPercent: 85, image: "/images/products/pixi-milky.png", verified: true },
    { name: "Toleriane Ultra Dermallergo Serum", brand: "La Roche Posay", price: "€21.95", fitPercent: 92, image: "/images/products/lrp-toleriane.png", verified: true },
  ],
  'morning-3': [
    { name: "Ultra Facial Cream SPF 30", brand: "Kiehl's", price: "€27.50", fitPercent: 89, image: "/images/products/cerave-pm.png", verified: true },
    { name: "Anthelios Ultra Light Fluid SPF 50+", brand: "La Roche Posay", price: "€16.95", fitPercent: 91, image: "/images/products/lrp-toleriane.png", verified: true },
    { name: "Centella Air-Fit Suncream Plus", brand: "SKIN1004", price: "€12.90", fitPercent: 88, image: "/images/products/ren-aha-tonic.png", verified: false },
  ],
  'evening-1': [
    { name: "Green Clean Makeup Removing Cleansing Balm", brand: "Farmacy", price: "€24.00", fitPercent: 94, image: "/images/products/ordinary-rosehip.png", verified: true },
    { name: "Pure Cleansing Oil", brand: "DHC", price: "€28.50", fitPercent: 92, image: "/images/products/naturium-mandelic.png", verified: true },
    { name: "Cleansing Oil", brand: "The INKEY List", price: "€9.99", fitPercent: 89, image: "/images/products/pai-rosehip.png", verified: false },
    { name: "Take The Day Off Cleansing Balm", brand: "Clinique", price: "€31.00", fitPercent: 91, image: "/images/products/drunk-slaai.png", verified: true },
  ],
  'evening-2': [
    { name: "Low pH Good Morning Gel Cleanser", brand: "CosRX", price: "€15.20", fitPercent: 91, image: "/images/products/fab-cleanser.png", verified: true },
    { name: "Hydrating Foaming Oil Cleanser", brand: "CeraVe", price: "€11.99", fitPercent: 89, image: "/images/products/cerave-pm.png", verified: true },
    { name: "Sea Foam Cleanser", brand: "Pacifica", price: "€14.50", fitPercent: 87, image: "/images/products/pacifica-sea-foam.png", verified: false },
  ],
  'evening-3': [
    { name: "Calming Toner", brand: "Dear Klairs", price: "€16.99", fitPercent: 90, image: "/images/products/pixi-milky.png", verified: true },
    { name: "Be Plain Cicaful Calming Toner", brand: "Be Plain", price: "€14.80", fitPercent: 88, image: "/images/products/lrp-toleriane.png", verified: false },
    { name: "Glow Tonic", brand: "Pixi", price: "€18.00", fitPercent: 85, image: "/images/products/pixi-milky.png", verified: true },
  ],
  'evening-4': [
    { name: "Niacinamide 10% + Zinc 1%", brand: "The Ordinary", price: "€6.90", fitPercent: 92, image: "/images/products/ordinary-rosehip.png", verified: true },
    { name: "Good Molecules Hyaluronic Acid Serum", brand: "Good Molecules", price: "€6.00", fitPercent: 89, image: "/images/products/naturium-mandelic.png", verified: false },
    { name: "BHA Blackhead Power Liquid", brand: "Paula's Choice", price: "€33.00", fitPercent: 91, image: "/images/products/pai-rosehip.png", verified: true },
  ],
  'evening-5': [
    { name: "PM Facial Moisturising Lotion", brand: "CeraVe", price: "€13.99", fitPercent: 94, image: "/images/products/cerave-pm.png", verified: true },
    { name: "Ceramide Ato Concentrate Cream", brand: "Holika Holika", price: "€15.50", fitPercent: 91, image: "/images/products/pixi-milky.png", verified: true },
    { name: "Ultra Facial Cream", brand: "Kiehl's", price: "€27.50", fitPercent: 89, image: "/images/products/lrp-toleriane.png", verified: true },
  ],
  'weekly-1': [
    { name: "Green Clean Makeup Removing Cleansing Balm", brand: "Farmacy", price: "€24.00", fitPercent: 94, image: "/images/products/ordinary-rosehip.png", verified: true },
    { name: "Pure Cleansing Oil", brand: "DHC", price: "€28.50", fitPercent: 92, image: "/images/products/naturium-mandelic.png", verified: true },
    { name: "Take The Day Off Cleansing Balm", brand: "Clinique", price: "€31.00", fitPercent: 91, image: "/images/products/drunk-slaai.png", verified: true },
  ],
  'weekly-2': [
    { name: "Low pH Good Morning Gel Cleanser", brand: "CosRX", price: "€15.20", fitPercent: 91, image: "/images/products/fab-cleanser.png", verified: true },
    { name: "Hydrating Foaming Oil Cleanser", brand: "CeraVe", price: "€11.99", fitPercent: 89, image: "/images/products/cerave-pm.png", verified: true },
  ],
  'weekly-3': [
    { name: "Rice Enzyme Powder", brand: "Tatcha", price: "€65.00", fitPercent: 91, image: "/images/products/drunk-slaai.png", verified: true },
    { name: "Brightening Enzyme Powder Wash", brand: "Dermalogica", price: "€58.00", fitPercent: 89, image: "/images/products/pai-rosehip.png", verified: true },
  ],
  'weekly-4': [
    { name: "Clear Improvement Charcoal Mask", brand: "Origins", price: "€29.00", fitPercent: 81, image: "/images/products/lrp-toleriane.png", verified: false },
    { name: "Rare Earth Deep Pore Cleansing Masque", brand: "Kiehl's", price: "€32.50", fitPercent: 79, image: "/images/products/ordinary-rosehip.png", verified: true },
  ],
  'weekly-5': [
    { name: "Calming Toner", brand: "Dear Klairs", price: "€16.99", fitPercent: 90, image: "/images/products/pixi-milky.png", verified: true },
    { name: "Be Plain Cicaful Calming Toner", brand: "Be Plain", price: "€14.80", fitPercent: 88, image: "/images/products/lrp-toleriane.png", verified: false },
  ],
  'weekly-6': [
    { name: "Niacinamide 10% + Zinc 1%", brand: "The Ordinary", price: "€6.90", fitPercent: 92, image: "/images/products/ordinary-rosehip.png", verified: true },
    { name: "Good Molecules Hyaluronic Acid Serum", brand: "Good Molecules", price: "€6.00", fitPercent: 89, image: "/images/products/naturium-mandelic.png", verified: false },
  ],
  'weekly-7': [
    { name: "PM Facial Moisturising Lotion", brand: "CeraVe", price: "€13.99", fitPercent: 94, image: "/images/products/cerave-pm.png", verified: true },
    { name: "Ultra Facial Cream", brand: "Kiehl's", price: "€27.50", fitPercent: 89, image: "/images/products/lrp-toleriane.png", verified: true },
  ]
};

const routineSteps = {
  morning: [
    {
      step: 1,
      title: "Cleanser",
      product: {
        name: "The Simple Mild Foam Cleanser",
        brand: "Scinic",
        price: "€12.00",
        store: "K-Beauty ✨",
        fitPercent: 93,
        verified: true,
        image: "/images/products/fab-cleanser.png",
        whyPicked: "This product gently cleanses your sensitive skin from impurities, leveraging Aloe Barbadensis Leaf Juice and Madecassoside to soothe and hydrate, thereby minimizing irritation and supporting skin comfort.",
        alternatives: 5
      }
    },
    {
      step: 2,
      title: "Soothing Toner",
      product: {
        name: "Madagascar Centella Probio-CICA Essence Toner",
        brand: "SKIN1004",
        price: "€18.84",
        store: "K-Beauty ✨",
        fitPercent: 93,
        verified: true,
        image: "/images/products/ren-aha-tonic.png",
        whyPicked: "As part of your routine, this product calms and re-balances skin, offering exceptional benefits for sensitive skin through its soothing Centella Asiatica Extract and hydrating Sodium Hyaluronate, which work synergistically to enhance skin texture and reduce irritation.",
        alternatives: 5
      }
    },
    {
      step: 3,
      title: "Moisturizer with Sun Protection",
      product: {
        name: "Soon Jung Mild Defence Sun Cream",
        brand: "Etude House",
        price: "£19.99",
        store: "K-Beauty ✨",
        fitPercent: 92,
        verified: true,
        image: "/images/products/cerave-pm.png",
        whyPicked: "As the final step in your morning routine, this product hydrates and defends against UV rays while soothing your sensitive skin with madecassoside and scutellaria baicalensis root extract, promoting a healthy skin barrier with panthenol.",
        alternatives: 5
      }
    }
  ],
  evening: [
    {
      step: 1,
      title: "Pre-Cleanser",
      product: {
        name: "Deep Cleansing Oil",
        brand: "Pyunkang Yul",
        price: "€19.70",
        store: "K-Beauty ✨",
        fitPercent: 96,
        verified: true,
        image: "/images/products/ordinary-rosehip.png",
        whyPicked: "As the first step in your evening routine, this product effectively removes oil-based debris, sebum, sunscreen, and makeup while leveraging allantoin and panthenol to soothe your sensitive skin and coptis japonica root extract to visibly minimize pores.",
        alternatives: 5
      }
    },
    {
      step: 2,
      title: "Cleanser",
      product: {
        name: "The Simple Mild Foam Cleanser",
        brand: "Scinic",
        price: "€12.00",
        store: "K-Beauty ✨",
        fitPercent: 93,
        verified: true,
        image: "/images/products/fab-cleanser.png",
        whyPicked: "This product gently cleanses your sensitive skin from impurities, while soothing ingredients like Aloe Barbadensis Leaf Juice and Madecassoside help to calm and hydrate the skin.",
        alternatives: 5
      }
    },
    {
      step: 3,
      title: "Soothing Toner",
      product: {
        name: "Madagascar Centella Probio-CICA Essence Toner",
        brand: "SKIN1004",
        price: "€18.84",
        store: "K-Beauty ✨",
        fitPercent: 93,
        verified: true,
        image: "/images/products/ren-aha-tonic.png",
        whyPicked: "As the third step in your routine, this product effectively calms and re-balances your normal skin with Centella Asiatica Extract and Sodium Hyaluronate, while also addressing sensitivity with its allergen-free formulation.",
        alternatives: 5
      }
    },
    {
      step: 4,
      title: "Serum or Treatment",
      product: {
        name: "Centella Unscented Serum",
        brand: "Purito",
        price: "€16.59",
        store: "K-Beauty ✨",
        fitPercent: 94,
        verified: true,
        image: "/images/products/naturium-mandelic.png",
        whyPicked: "As a treatment, it leverages Centella Asiatica Extract and Ceramide NP to effectively target visible pores and acne for sensitive skin, while enhancing hydration and barrier repair with its synergistic blend of soothing and hydrating ingredients.",
        alternatives: 5
      }
    },
    {
      step: 5,
      title: "Moisturizer",
      product: {
        name: "Centella Asiatica Ampoule",
        brand: "SKIN1004",
        price: "€18.43",
        store: "K-Beauty ✨",
        fitPercent: 96,
        verified: true,
        image: "/images/products/pixi-milky.png",
        whyPicked: "With Centella Asiatica and Sodium Hyaluronate, it moisturizes your sensitive skin while soothing inflammation and promoting hydration, effectively targeting visible pores without causing irritation.",
        alternatives: 5
      }
    }
  ],
  weekly: [
    {
      step: 1,
      title: "Pre-Cleanser",
      product: {
        name: "Deep Cleansing Oil",
        brand: "Pyunkang Yul",
        price: "€19.70",
        store: "K-Beauty ✨",
        fitPercent: 96,
        verified: true,
        image: "/images/products/ordinary-rosehip.png",
        whyPicked: "As the first step in your routine, this product effectively removes oil-based debris, sebum, sunscreen, and makeup, while its formulation, enriched with allantoin and panthenol, provides soothing and hydrating benefits, particularly beneficial for sensitive skin.",
        alternatives: 5
      }
    },
    {
      step: 2,
      title: "Cleanser",
      product: {
        name: "The Simple Mild Foam Cleanser",
        brand: "Scinic",
        price: "€12.00",
        store: "K-Beauty ✨",
        fitPercent: 93,
        verified: true,
        image: "/images/products/fab-cleanser.png",
        whyPicked: "This product gently cleans skin from impurities while soothing sensitive skin with Aloe Barbadensis Leaf Juice and Madecassoside, ensuring a comfortable and hydrating experience.",
        alternatives: 5
      }
    },
    {
      step: 3,
      title: "Enzyme Powder",
      product: {
        name: "Phyto Enzyme Powder Wash",
        brand: "Medimine",
        price: "€19.95",
        store: "K-Beauty ✨",
        fitPercent: 94,
        verified: true,
        image: "/images/products/drunk-slaai.png",
        whyPicked: "With papain and Zea Mays Starch, it digests dull surface cells, gently exfoliating normal skin to visibly minimize pores, while allantoin and licorice root extract soothe acne and blemishes.",
        alternatives: 5
      }
    },
    {
      step: 4,
      title: "Cleansing Mask",
      product: {
        name: "Cica Bubble Sparkling Booster",
        brand: "VT",
        price: "$21.73",
        store: "K-Beauty ✨",
        fitPercent: 83,
        verified: true,
        image: "/images/products/lrp-toleriane.png",
        whyPicked: "Designed for normal skin, this step deep-draws oil and impurities with kaolin and bentonite, while centella asiatica extract and madecassoside soothe and hydrate, promoting a balanced and revitalized complexion.",
        alternatives: 5
      }
    },
    {
      step: 5,
      title: "Soothing Toner",
      product: {
        name: "Madagascar Centella Probio-CICA Essence Toner",
        brand: "SKIN1004",
        price: "€18.84",
        store: "K-Beauty ✨",
        fitPercent: 93,
        verified: true,
        image: "/images/products/ren-aha-tonic.png",
        whyPicked: "As part of your routine, this product effectively calms and re-balances your skin with Centella Asiatica Extract and Sodium Hyaluronate, providing soothing benefits for sensitive skin while maintaining optimal hydration levels.",
        alternatives: 5
      }
    },
    {
      step: 6,
      title: "Serum or Treatment",
      product: {
        name: "Centella Unscented Serum",
        brand: "Purito",
        price: "€16.59",
        store: "K-Beauty ✨",
        fitPercent: 94,
        verified: true,
        image: "/images/products/naturium-mandelic.png",
        whyPicked: "As a treatment, it leverages Centella Asiatica Extract and Ceramide NP to effectively target visible pores and support barrier repair for sensitive skin, while also providing anti-inflammatory benefits and enhanced hydration.",
        alternatives: 5
      }
    },
    {
      step: 7,
      title: "Moisturizer",
      product: {
        name: "Centella Asiatica Ampoule",
        brand: "SKIN1004",
        price: "€18.43",
        store: "K-Beauty ✨",
        fitPercent: 96,
        verified: true,
        image: "/images/products/pixi-milky.png",
        whyPicked: "As the final step in your routine, this product moisturizes the skin with Centella Asiatica and Sodium Hyaluronate, providing soothing hydration ideal for sensitive skin.",
        alternatives: 5
      }
    }
  ]
};

const RoutineForYou = () => {
  const navigate = useNavigate();
  const [selectedRoutine, setSelectedRoutine] = useState<'Morning' | 'Evening' | 'Weekly'>('Morning');
  const [expandedFormula, setExpandedFormula] = useState(false);
  const [expandedAlternatives, setExpandedAlternatives] = useState<Set<string>>(new Set());
  
  // Refs for scrolling to sections
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

  const getFitPillClass = (fitPct: number) => {
    if (fitPct >= 90) return 'fit-pill-violet';
    if (fitPct >= 75) return 'fit-pill-emerald';
    return 'fit-pill-gray';
  };

  const renderProductStep = (step: any, routineType: string) => {
    const stepKey = `${routineType}-${step.step}`;
    const isExpanded = expandedAlternatives.has(stepKey);
    const alternatives = alternativeProducts[stepKey as keyof typeof alternativeProducts] || [];
    
    return (
      <div key={stepKey} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-foreground text-background px-3 py-1 rounded-full text-sm font-medium">
            Step {step.step}
          </div>
          <h3 className="text-xl font-semibold">{step.title}</h3>
        </div>

        <div className="lovi-card">
          <div className="flex gap-4 mb-4">
            <img
              src={step.product.image}
              alt={step.product.name}
              className="w-16 h-16 object-contain rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-base leading-tight mb-1">
                {step.product.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {step.product.brand} · {step.product.price} · {step.product.store}
              </p>
              <div className="flex items-center gap-2">
                <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getFitPillClass(step.product.fitPercent)}`}>
                  <span className="font-semibold">{step.product.fitPercent}% fit</span>
                </div>
                {step.product.verified && (
                  <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground">
                    <span>✓ Lóvi MD Verified</span>
                  </div>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <h5 className="font-medium mb-2">Why we picked it</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.product.whyPicked}
            </p>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6">
              <span className="mr-2 font-bold">a</span>
              {step.product.price}
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground"
              onClick={() => toggleAlternatives(stepKey)}
            >
              {step.product.alternatives} alternatives
            </Button>
          </div>

          {isExpanded && alternatives.length > 0 && (
            <div className="space-y-4 border-t pt-4">
              <h6 className="text-lg font-medium text-muted-foreground">
                Other great AI-picked options
              </h6>
              <div className="overflow-x-auto -mx-4">
                <div className="flex gap-4 px-4 pb-2 w-max">
                  {alternatives.map((alt, index) => (
                    <AlternativeProductCard
                      key={index}
                      product={alt}
                      onClick={() => {/* Handle alternative product click */}}
                    />
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 px-4 py-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Routine for you</h1>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="px-4 py-6">
          {/* Routine Formula Card */}
          <div className="lovi-card mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">{routineFormula.name}</h2>
                <p className="text-sm text-muted-foreground">{routineFormula.goal}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setExpandedFormula(!expandedFormula)}
              >
                <ChevronUp className={`h-5 w-5 transition-transform ${expandedFormula ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {expandedFormula && (
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target Goal</span>
                    <span className="font-medium">{routineFormula.targetGoal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age</span>
                    <span className="font-medium">{routineFormula.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skin type</span>
                    <span className="font-medium">{routineFormula.skinType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skin sensitivity</span>
                    <span className="font-medium">{routineFormula.skinSensitivity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-medium">{routineFormula.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skin concerns</span>
                    <span className="font-medium">{routineFormula.skinConcerns}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Skin conditions</span>
                    <span className="font-medium">{routineFormula.skinConditions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Health conditions</span>
                    <span className="font-medium">{routineFormula.healthConditions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Korean Skincare</span>
                    <span className="font-medium">{routineFormula.koreanSkincare}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-muted/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Your formula has been updated</span>
                <span className="ml-auto">🙂</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {routineFormula.lastUpdated}
              </div>
            </div>

            <Button className="w-full" variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Update Formula
            </Button>
          </div>

          {/* Routine Selector */}
          <div className="sticky top-[72px] bg-background/95 backdrop-blur-sm z-20 py-4 mb-4 -mx-4 px-4 border-b">
            <div className="flex justify-center">
              <SegmentedControl
                options={[
                  { value: 'Morning', label: 'Morning', icon: 'sun' },
                  { value: 'Evening', label: 'Evening', icon: 'moon' },
                  { value: 'Weekly', label: 'Weekly', icon: 'sparkles' }
                ]}
                value={selectedRoutine}
                onChange={scrollToSection}
              />
            </div>
          </div>

          {/* Trust Message */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-3">Your skin is our main focus</h3>
            <p className="text-sm text-muted-foreground">
              All the recommendations are unbiased and non-sponsored. Picked by Lovi AI & Reviewed by our MDs.
            </p>
          </div>

          {/* Morning Section */}
          <div ref={morningRef} className="space-y-8 mb-16">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">☀️</div>
              <h2 className="text-2xl font-bold mb-4">Morning</h2>
            </div>
            {routineSteps.morning.map((step) => renderProductStep(step, 'morning'))}
          </div>

          {/* Evening Section */}
          <div ref={eveningRef} className="space-y-8 mb-16">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🌙</div>
              <h2 className="text-2xl font-bold mb-4">Evening</h2>
            </div>
            {routineSteps.evening.map((step) => renderProductStep(step, 'evening'))}
          </div>

          {/* Weekly Section */}
          <div ref={weeklyRef} className="space-y-8 mb-16">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-2xl font-bold mb-4">Weekly</h2>
              <p className="text-lg mb-6">A weekly treat for your skin 🤗</p>
              <div className="lovi-card p-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎁</div>
                  <div>
                    <p className="font-medium mb-2">Enjoy a special program with additional steps to treat your skin in the best way possible!</p>
                    <p className="text-sm text-muted-foreground">For best results, use these 1-2 times in place of your regular evening routine and enjoy your radiant me-time 👑</p>
                  </div>
                </div>
              </div>
            </div>
            {routineSteps.weekly.map((step) => renderProductStep(step, 'weekly'))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RoutineForYou;
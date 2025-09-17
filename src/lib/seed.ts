export type Product = {
  id: string;
  brand: string;
  name: string;
  category: "Cleansing" | "Toning & Exfoliating" | "Moisturizing" | "Treatment & Moisturizing" | "Makeup Remover" | "Treatment";
  fitPct: number;
  price: number;
  currency: "EUR" | "GBP";
  retailer: "amazon";
  imageUrl: string;
};

export const seedProducts: Record<string, Product[]> = {
  "Acne-Safe PHA Serums": [
    { 
      id: "ren-aha-tonic", 
      brand: "REN Clean Skincare", 
      name: "Ready Steady Glow Daily AHA Tonic", 
      category: "Toning & Exfoliating", 
      fitPct: 97, 
      price: 21.90, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/ren-aha-tonic.png" 
    },
    { 
      id: "nat-mandelic-12", 
      brand: "Naturium", 
      name: "Mandelic Topical Acid 12%", 
      category: "Treatment", 
      fitPct: 90, 
      price: 42.49, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/naturium-mandelic.png" 
    }
  ],
  "Acne-Safe Ceramides for Fall": [
    { 
      id: "cerave-pm", 
      brand: "CeraVe", 
      name: "CeraVe PM Facial Moisturizing Lotion", 
      category: "Treatment & Moisturizing", 
      fitPct: 91, 
      price: 43.50, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/cerave-pm.png" 
    },
    { 
      id: "lrp-toleriane", 
      brand: "La Roche-Posay", 
      name: "Toleriane Double Repair Face Moisturizer", 
      category: "Moisturizing", 
      fitPct: 91, 
      price: 39.95, 
      currency: "GBP", 
      retailer: "amazon", 
      imageUrl: "/images/products/lrp-toleriane.png" 
    }
  ],
  "Acne-Safe Rosehip Oil Blends": [
    { 
      id: "pai-rosehip", 
      brand: "Pai Skincare", 
      name: "Rosehip BioRegenerate Oil", 
      category: "Treatment & Moisturizing", 
      fitPct: 81, 
      price: 37.35, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/pai-rosehip.png" 
    },
    { 
      id: "ordinary-rosehip", 
      brand: "The Ordinary", 
      name: "100% Organic Cold-Pressed Rose Hip Seed Oil", 
      category: "Treatment & Moisturizing", 
      fitPct: 79, 
      price: 9.99, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/ordinary-rosehip.png" 
    }
  ],
  "Acne-Safe Squalane Cleansers": [
    { 
      id: "pacifica-sea-foam", 
      brand: "Pacifica", 
      name: "Sea Foam Complete Face Wash", 
      category: "Cleansing", 
      fitPct: 88, 
      price: 21.95, 
      currency: "GBP", 
      retailer: "amazon", 
      imageUrl: "/images/products/pacifica-sea-foam.png" 
    },
    { 
      id: "drunk-slaai", 
      brand: "Drunk Elephant", 
      name: "Slaai™ Makeup-Melting Butter Cleanser", 
      category: "Makeup Remover", 
      fitPct: 84, 
      price: 51.63, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/drunk-slaai.png" 
    }
  ],
  "Routine – Morning": [
    { 
      id: "fab-cleanser", 
      brand: "First Aid Beauty", 
      name: "Pure Skin Face Cleanser", 
      category: "Cleansing", 
      fitPct: 93, 
      price: 20.00, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/fab-cleanser.png" 
    },
    { 
      id: "pixi-milky-tonic", 
      brand: "Pixi", 
      name: "Milky Tonic", 
      category: "Toning & Exfoliating", 
      fitPct: 90, 
      price: 12.00, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/pixi-milky.png" 
    }
  ]
};
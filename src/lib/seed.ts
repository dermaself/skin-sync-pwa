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
    },
    { 
      id: "paula-choice-bha", 
      brand: "Paula's Choice", 
      name: "Skin Perfecting 2% BHA Liquid Exfoliant", 
      category: "Toning & Exfoliating", 
      fitPct: 94, 
      price: 28.50, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/ren-aha-tonic.png" 
    },
    { 
      id: "inkey-list-pha", 
      brand: "The INKEY List", 
      name: "PHA Exfoliating Toner", 
      category: "Toning & Exfoliating", 
      fitPct: 88, 
      price: 15.99, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/naturium-mandelic.png" 
    },
    { 
      id: "cosrx-aha-bha", 
      brand: "COSRX", 
      name: "AHA/BHA Clarifying Treatment Toner", 
      category: "Toning & Exfoliating", 
      fitPct: 86, 
      price: 18.20, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/ren-aha-tonic.png" 
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
    },
    { 
      id: "cerave-daily", 
      brand: "CeraVe", 
      name: "Daily Moisturizing Lotion", 
      category: "Moisturizing", 
      fitPct: 89, 
      price: 24.99, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/cerave-pm.png" 
    },
    { 
      id: "vanicream-moisturizer", 
      brand: "Vanicream", 
      name: "Moisturizing Skin Cream", 
      category: "Moisturizing", 
      fitPct: 87, 
      price: 19.50, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/lrp-toleriane.png" 
    },
    { 
      id: "aveeno-oat-gel", 
      brand: "Aveeno", 
      name: "Calm + Restore Oat Gel Moisturizer", 
      category: "Moisturizing", 
      fitPct: 85, 
      price: 16.75, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/cerave-pm.png" 
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
    },
    { 
      id: "trilogy-rosehip", 
      brand: "Trilogy", 
      name: "Certified Organic Rosehip Oil", 
      category: "Treatment & Moisturizing", 
      fitPct: 83, 
      price: 29.90, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/pai-rosehip.png" 
    },
    { 
      id: "radha-rosehip", 
      brand: "Radha Beauty", 
      name: "Rosehip Seed Oil", 
      category: "Treatment & Moisturizing", 
      fitPct: 77, 
      price: 14.50, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/ordinary-rosehip.png" 
    },
    { 
      id: "leven-rose-rosehip", 
      brand: "Leven Rose", 
      name: "Pure Cold Pressed Rosehip Seed Oil", 
      category: "Treatment & Moisturizing", 
      fitPct: 75, 
      price: 22.99, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/pai-rosehip.png" 
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
    },
    { 
      id: "ordinary-squalane-cleanser", 
      brand: "The Ordinary", 
      name: "Squalane Cleanser", 
      category: "Cleansing", 
      fitPct: 86, 
      price: 8.20, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/pacifica-sea-foam.png" 
    },
    { 
      id: "inkey-oat-cleanser", 
      brand: "The INKEY List", 
      name: "Oat Cleansing Balm", 
      category: "Cleansing", 
      fitPct: 82, 
      price: 11.99, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/drunk-slaai.png" 
    },
    { 
      id: "good-molecules-cleanser", 
      brand: "Good Molecules", 
      name: "Cleansing Balm", 
      category: "Cleansing", 
      fitPct: 80, 
      price: 16.50, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/pacifica-sea-foam.png" 
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
    },
    { 
      id: "cerave-foaming-cleanser", 
      brand: "CeraVe", 
      name: "Foaming Facial Cleanser", 
      category: "Cleansing", 
      fitPct: 91, 
      price: 13.50, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/fab-cleanser.png" 
    },
    { 
      id: "lrp-vitamin-c", 
      brand: "La Roche-Posay", 
      name: "Pure Vitamin C Face Serum", 
      category: "Treatment", 
      fitPct: 88, 
      price: 34.99, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/pixi-milky.png" 
    },
    { 
      id: "neutrogena-hydrogel", 
      brand: "Neutrogena", 
      name: "Hydro Boost Water Gel", 
      category: "Moisturizing", 
      fitPct: 85, 
      price: 18.75, 
      currency: "EUR", 
      retailer: "amazon", 
      imageUrl: "/images/products/fab-cleanser.png" 
    }
  ]
};
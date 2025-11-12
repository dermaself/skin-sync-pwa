export type Product = {
  id: string;
  brand: string;
  name: string;
  category: "Cleansing" | "Toning & Exfoliating" | "Moisturizing" | "Treatment & Moisturizing" | "Makeup Remover" | "Treatment";
  fitPct: number;
  price: number;
  currency: "EUR" | "GBP";
  retailer: "dolcegabbana";
  imageUrl: string;
};

export const seedProducts: Record<string, Product[]> = {
  "Rituale Oro - Gold Peptides Collection": [
    { 
      id: "dg-gold-face-cream", 
      brand: "Dolce&Gabbana", 
      name: "Gold Peptides Face Cream", 
      category: "Treatment & Moisturizing", 
      fitPct: 98, 
      price: 245.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-gold-face-cream.jpg" 
    },
    { 
      id: "dg-gold-eye-serum", 
      brand: "Dolce&Gabbana", 
      name: "Gold Peptides Eye Serum", 
      category: "Treatment", 
      fitPct: 97, 
      price: 195.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-gold-eye-serum.jpg" 
    },
    { 
      id: "dg-gold-face-serum", 
      brand: "Dolce&Gabbana", 
      name: "Gold Peptides Face Serum", 
      category: "Treatment", 
      fitPct: 99, 
      price: 215.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-gold-face-serum.jpg" 
    },
    { 
      id: "dg-gold-mask", 
      brand: "Dolce&Gabbana", 
      name: "Gold Peptides Mask", 
      category: "Treatment", 
      fitPct: 96, 
      price: 165.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-gold-mask.jpg" 
    }
  ],
  "Luminosità - Glow & Radiance": [
    { 
      id: "dg-glow-ceramide", 
      brand: "Dolce&Gabbana", 
      name: "Glow Bounce Ceramide Cream", 
      category: "Moisturizing", 
      fitPct: 95, 
      price: 185.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-glow-ceramide.jpg" 
    },
    { 
      id: "dg-icy-lemon-balm", 
      brand: "Dolce&Gabbana", 
      name: "Icy Touch Lemon Balm", 
      category: "Treatment & Moisturizing", 
      fitPct: 94, 
      price: 65.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-icy-lemon-balm.jpg" 
    },
    { 
      id: "dg-illuminating-primer", 
      brand: "Dolce&Gabbana", 
      name: "Illuminating Primer Serum", 
      category: "Treatment", 
      fitPct: 93, 
      price: 125.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-serum-1.jpg" 
    }
  ],
  "Idratazione Profonda - Deep Hydration": [
    { 
      id: "dg-hydrating-essence", 
      brand: "Dolce&Gabbana", 
      name: "Mediterranean Hydrating Essence", 
      category: "Treatment", 
      fitPct: 92, 
      price: 145.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-hydrating-essence.jpg" 
    },
    { 
      id: "dg-moisture-shield", 
      brand: "Dolce&Gabbana", 
      name: "Moisture Shield Cream", 
      category: "Moisturizing", 
      fitPct: 94, 
      price: 195.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-booster-1.jpg" 
    },
    { 
      id: "dg-aqua-gel", 
      brand: "Dolce&Gabbana", 
      name: "Aqua Fresh Gel Moisturizer", 
      category: "Moisturizing", 
      fitPct: 91, 
      price: 155.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-glow-ceramide.jpg" 
    }
  ],
  "Pulizia Delicata - Gentle Cleansing": [
    { 
      id: "dg-silk-cleanser", 
      brand: "Dolce&Gabbana", 
      name: "Silk Velvet Cleansing Balm", 
      category: "Cleansing", 
      fitPct: 90, 
      price: 95.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-silk-cleanser.jpg" 
    },
    { 
      id: "dg-micellar-water", 
      brand: "Dolce&Gabbana", 
      name: "Rosa Micellar Water", 
      category: "Cleansing", 
      fitPct: 89, 
      price: 75.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-hydrating-essence.jpg" 
    },
    { 
      id: "dg-foam-cleanser", 
      brand: "Dolce&Gabbana", 
      name: "Mediterranean Foam Cleanser", 
      category: "Cleansing", 
      fitPct: 88, 
      price: 85.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-silk-cleanser.jpg" 
    }
  ],
  "Routine – Mattina": [
    { 
      id: "dg-morning-cleanser", 
      brand: "Dolce&Gabbana", 
      name: "Mediterranean Foam Cleanser", 
      category: "Cleansing", 
      fitPct: 88, 
      price: 85.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-silk-cleanser.jpg" 
    },
    { 
      id: "dg-morning-serum", 
      brand: "Dolce&Gabbana", 
      name: "Gold Peptides Face Serum", 
      category: "Treatment", 
      fitPct: 99, 
      price: 215.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-gold-face-serum.jpg" 
    },
    { 
      id: "dg-morning-cream", 
      brand: "Dolce&Gabbana", 
      name: "Glow Bounce Ceramide Cream", 
      category: "Moisturizing", 
      fitPct: 95, 
      price: 185.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-glow-ceramide.jpg" 
    }
  ],
  "Routine – Sera": [
    { 
      id: "dg-evening-balm", 
      brand: "Dolce&Gabbana", 
      name: "Silk Velvet Cleansing Balm", 
      category: "Cleansing", 
      fitPct: 90, 
      price: 95.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-silk-cleanser.jpg" 
    },
    { 
      id: "dg-evening-essence", 
      brand: "Dolce&Gabbana", 
      name: "Mediterranean Hydrating Essence", 
      category: "Treatment", 
      fitPct: 92, 
      price: 145.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-hydrating-essence.jpg" 
    },
    { 
      id: "dg-evening-face-cream", 
      brand: "Dolce&Gabbana", 
      name: "Gold Peptides Face Cream", 
      category: "Treatment & Moisturizing", 
      fitPct: 98, 
      price: 245.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-gold-face-cream.jpg" 
    },
    { 
      id: "dg-evening-eye-serum", 
      brand: "Dolce&Gabbana", 
      name: "Gold Peptides Eye Serum", 
      category: "Treatment", 
      fitPct: 97, 
      price: 195.00, 
      currency: "EUR", 
      retailer: "dolcegabbana", 
      imageUrl: "/images/products/dg-gold-eye-serum.jpg" 
    }
  ]
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { Search, QrCode, Heart, Package } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { ProductDetailSheet } from '@/components/ProductDetailSheet';
import { getAllSections } from '@/lib/services/catalog';
import { seedProducts } from '@/lib/seed';
import type { Product } from '@/lib/seed';

const Products = () => {
  const navigate = useNavigate();
  const { data: sections, isLoading } = useSWR('all-sections', getAllSections);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsSheetOpen(true);
  };

  const collectionOrder = [
    'Acne-Safe Ceramides for Fall',
    'Acne-Safe Rosehip Oil Blends', 
    'Acne-Safe Squalane Cleansers',
    'Acne-Safe PHA Serums'
  ];

  const collectionDescriptions = {
    'Acne-Safe Ceramides for Fall': 'These ceramide-rich products help soothe sensitive, acne-prone skin during seasonal changes.',
    'Acne-Safe Rosehip Oil Blends': 'These rosehip oil blends offer gentle hydration and potential scar reduction for acne-prone skin.',
    'Acne-Safe Squalane Cleansers': 'These squalane-based cleansers gently remove impurities without stripping sensitive, acne-prone skin.',
    'Acne-Safe PHA Serums': 'These PHA serums offer gentle exfoliation for sensitive, acne-prone skin, improving texture.'
  };

  return (
    <div className="mobile-main mobile-container animate-fade-in">
      {/* Header */}
      <div className="pt-12 pb-6">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        
        {/* Search bar */}
        <div className="relative mb-6">
          <div className="flex items-center gap-3 bg-muted rounded-2xl px-4 py-3">
            <Search size={20} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cosmetics (2 left)"
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
            <QrCode size={20} className="text-muted-foreground" />
          </div>
        </div>

        {/* Tiles row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div 
            className="dermaself-card text-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate('/routine-for-you')}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package size={20} className="text-primary" />
              </div>
              <span className="font-medium text-sm">Routine for you</span>
            </div>
          </div>
          
          <div className="dermaself-card text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-emerald-fit/20 rounded-full flex items-center justify-center">
                <Package size={20} className="text-emerald-fit" />
              </div>
              <span className="font-medium text-sm">My Shelf</span>
            </div>
          </div>
          
          <div className="dermaself-card text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-pink-500" />
              </div>
              <span className="font-medium text-sm">Wishlist</span>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailSheet
        product={selectedProduct}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div>
          {/* Collections */}
          {collectionOrder.map((collectionName) => {
            const products = sections?.[collectionName] || seedProducts[collectionName] || [];
            
            return (
              <div key={collectionName} className="mb-12">
                <h2 className="text-xl font-semibold mb-2">{collectionName}</h2>
                <p className="text-muted-foreground mb-6">
                  {collectionDescriptions[collectionName as keyof typeof collectionDescriptions]}
                </p>
                
                <div className="mobile-scroll-container pb-4 -mx-4 px-4">
                  <div className="flex gap-3">
                    {products.map((product) => (
                      <div key={product.id} className="mobile-scroll-item">
                        <ProductCard 
                          product={product} 
                          onClick={handleProductClick}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ProductDetailSheet>

      {isLoading && (
        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="dermaself-card h-64 animate-pulse bg-muted" />
                <div className="dermaself-card h-64 animate-pulse bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
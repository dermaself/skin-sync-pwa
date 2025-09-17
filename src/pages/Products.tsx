import { useState } from 'react';
import useSWR from 'swr';
import { Search, QrCode, Heart, Package } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { getAllSections } from '@/lib/services/catalog';
import { seedProducts } from '@/lib/seed';

const Products = () => {
  const { data: sections, isLoading } = useSWR('all-sections', getAllSections);

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
    <div className="max-w-screen-sm mx-auto px-4 sm:px-5 animate-fade-in">
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
          <div className="lovi-card text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package size={20} className="text-primary" />
              </div>
              <span className="font-medium text-sm">Routine for you</span>
            </div>
          </div>
          
          <div className="lovi-card text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-emerald-fit/20 rounded-full flex items-center justify-center">
                <Package size={20} className="text-emerald-fit" />
              </div>
              <span className="font-medium text-sm">My Shelf</span>
            </div>
          </div>
          
          <div className="lovi-card text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-pink-500" />
              </div>
              <span className="font-medium text-sm">Wishlist</span>
            </div>
          </div>
        </div>
      </div>

      {/* All Products in Single Row */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6">All Products</h2>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {collectionOrder.flatMap((collectionName) => 
            sections?.[collectionName] || seedProducts[collectionName] || []
          ).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="lovi-card h-64 animate-pulse bg-muted" />
                <div className="lovi-card h-64 animate-pulse bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
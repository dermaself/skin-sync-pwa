import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlternativeProduct {
  name: string;
  brand: string;
  price: string;
  fitPercent: number;
  image: string;
  verified?: boolean;
}

interface AlternativeProductCardProps {
  product: AlternativeProduct;
  onClick?: () => void;
}

export const AlternativeProductCard = ({ product, onClick }: AlternativeProductCardProps) => {
  const getFitPillClass = (fitPct: number) => {
    if (fitPct >= 90) return 'fit-pill-violet';
    if (fitPct >= 75) return 'fit-pill-emerald';
    return 'fit-pill-gray';
  };

  return (
    <div 
      className="flex-shrink-0 w-80 bg-card border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Header with product info and cart */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 pr-3">
          <h5 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
            {product.name}
          </h5>
          <p className="text-xs text-muted-foreground">
            {product.brand} · {product.price} · K-Beauty ✨
          </p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>

      {/* Product image centered */}
      <div className="flex justify-center mb-3">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="w-16 h-16 object-contain rounded-lg"
        />
      </div>

      {/* Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getFitPillClass(product.fitPercent)}`}>
          <span className="font-semibold">{product.fitPercent}% fit</span>
        </div>
        {product.verified && (
          <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground">
            <span>✓ Lóvi MD Verified</span>
          </div>
        )}
      </div>
    </div>
  );
};
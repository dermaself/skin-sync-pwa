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
      className="w-full bg-card border border-border rounded-2xl p-3 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[180px] flex flex-col relative z-10"
      onClick={onClick}
    >
      {/* Fit percentage pill at top */}
      <div className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium mb-2 w-fit ${getFitPillClass(product.fitPercent)}`}>
        <span className="font-semibold">{product.fitPercent}% fit</span>
      </div>

      {/* Product image centered */}
      <div className="flex justify-center mb-3 flex-grow items-center">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="w-16 h-16 object-contain rounded-lg"
        />
      </div>

      {/* Product info */}
      <div className="text-center mb-3">
        <div className="font-bold text-foreground text-sm mb-1">{product.brand}</div>
        <h5 className="text-xs text-muted-foreground leading-tight line-clamp-2 min-h-[2rem] flex items-center justify-center">
          {product.name}
        </h5>
      </div>

      {/* Bottom row with cart and price */}
      <div className="flex items-center justify-between mt-auto">
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-gray-100 hover:bg-gray-200 flex-shrink-0">
          <ShoppingCart className="h-3 w-3" />
        </Button>
        <div className="text-xs font-bold text-muted-foreground">
          {product.price}
        </div>
      </div>
    </div>
  );
};
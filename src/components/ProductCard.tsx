import { Product } from '@/lib/seed';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  onClick?: (product: Product) => void;
}

export const ProductCard = ({ product, className, onClick }: ProductCardProps) => {
  const getFitPillClass = (fitPct: number) => {
    if (fitPct >= 90) return 'fit-pill-violet';
    if (fitPct >= 75) return 'fit-pill-emerald';
    return 'fit-pill-gray';
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return (
    <div 
      className={cn(
        "dermaself-card relative cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[320px] flex flex-col border border-border/50",
        className
      )}
      onClick={() => onClick?.(product)}
    >
      {/* Fit percentage pill - Enhanced styling */}
      <div className={cn("inline-flex items-center gap-1 mb-4", getFitPillClass(product.fitPct))}>
        <span className="font-semibold text-sm">{product.fitPct}% fit</span>
      </div>
      
      {/* Category chip - Refined styling */}
      <div className="category-chip mb-4 inline-block self-start">
        {product.category}
      </div>

      {/* Product image - Better spacing */}
      <div className="flex justify-center mb-6 flex-grow items-center p-2">
        <img
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          className="w-24 h-24 object-contain drop-shadow-sm"
        />
      </div>

      {/* Product info - Improved typography */}
      <div className="text-center mb-6 mt-auto">
        <p className="text-xs text-muted-foreground mb-2 font-medium">{product.brand}</p>
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center px-2">{product.name}</h3>
      </div>

      {/* Price pill - Enhanced design */}
      <div className="price-pill justify-center min-h-[40px] text-sm">
        {/* Amazon icon - Refined */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
          <path d="M.045 18.02c.072-.116.187-.18.295-.18.061 0 .113.016.152.045 2.448 1.608 5.497 2.415 8.697 2.415 3.263 0 6.303-.815 8.697-2.415.039-.029.09-.045.152-.045.108 0 .223.064.295.18.072.116.045.234-.062.339-2.597 1.752-5.897 2.639-9.097 2.639s-6.5-.887-9.097-2.639c-.107-.105-.134-.223-.062-.339z"/>
          <path d="M17.713 11.632c-.552-.414-1.154-.707-1.799-.871-.645-.164-1.288-.224-1.925-.224-.637 0-1.279.06-1.925.224-.645.164-1.246.457-1.799.871-.402.301-.603.654-.603 1.056 0 .402.201.755.603 1.056.553.414 1.154.707 1.799.871.646.164 1.288.224 1.925.224.637 0 1.28-.06 1.925-.224.645-.164 1.247-.457 1.799-.871.402-.301.603-.654.603-1.056 0-.402-.201-.755-.603-1.056z"/>
        </svg>
        <span className="font-bold">{formatPrice(product.price, product.currency)}</span>
      </div>
    </div>
  );
};
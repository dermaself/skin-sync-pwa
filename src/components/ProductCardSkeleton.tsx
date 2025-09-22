import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
  return (
    <div className="dermaself-card min-h-[300px] flex flex-col">
      {/* Fit pill skeleton */}
      <Skeleton className="h-[36px] w-20 rounded-full mb-3" />
      
      {/* Category chip skeleton */}
      <Skeleton className="h-6 w-24 rounded-full mb-4" />
      
      {/* Product image skeleton */}
      <div className="flex justify-center mb-4 flex-grow items-center">
        <Skeleton className="w-28 h-28 rounded-lg" />
      </div>
      
      {/* Product info skeleton */}
      <div className="text-center mb-4 mt-auto space-y-2">
        <Skeleton className="h-4 w-16 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-3 w-28 mx-auto" />
      </div>
      
      {/* Price pill skeleton */}
      <Skeleton className="h-[44px] w-full rounded-full" />
    </div>
  );
};

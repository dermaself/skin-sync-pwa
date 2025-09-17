export interface PriceInfo {
  price: number;
  currency: 'EUR' | 'GBP';
  retailer: 'amazon';
}

export const getPricing = async (retailer: string, productId: string): Promise<PriceInfo | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // For now, return null to indicate we should use the seeded price
  // In a real app, this would fetch live pricing data
  return null;
};
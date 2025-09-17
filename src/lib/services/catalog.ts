import { seedProducts, Product } from '../seed';

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCatalogSection = async (sectionName: string): Promise<Product[]> => {
  await delay(300 + Math.random() * 200); // 300-500ms delay
  return seedProducts[sectionName] || [];
};

export const getAllSections = async (): Promise<Record<string, Product[]>> => {
  await delay(400 + Math.random() * 200);
  return seedProducts;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  await delay(200 + Math.random() * 100);
  
  for (const section of Object.values(seedProducts)) {
    const product = section.find(p => p.id === id);
    if (product) return product;
  }
  
  return null;
};
import { Product } from '../seed';

export interface ScanIssue {
  type: 'ingredient' | 'compatibility' | 'sensitivity';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ScanResult {
  issues: ScanIssue[];
  recommendedProducts: string[]; // Product IDs
  analysisComplete: boolean;
}

export const uploadAndScan = async (file: File): Promise<ScanResult> => {
  // Simulate upload and analysis
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Mock scan results
  return {
    issues: [
      {
        type: 'ingredient',
        title: 'Potential Irritant Detected',
        description: 'Contains fragrance which may cause sensitivity',
        severity: 'medium'
      },
      {
        type: 'compatibility',
        title: 'pH Mismatch',
        description: 'This product may not layer well with your current routine',
        severity: 'low'
      }
    ],
    recommendedProducts: ['fab-cleanser', 'pixi-milky-tonic', 'cerave-pm'],
    analysisComplete: true
  };
};
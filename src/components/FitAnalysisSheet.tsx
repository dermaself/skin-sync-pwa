import { X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Product } from '@/lib/seed';

interface FitAnalysisSheetProps {
  product: Product | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const FitAnalysisSheet = ({ product, isOpen, onOpenChange, children }: FitAnalysisSheetProps) => {
  if (!product) return children;

  const sources = [
    {
      name: "National Library of Medicine",
      url: "https://www.ncbi.nlm.nih.gov/",
      logo: "NIH",
      bgColor: "bg-blue-500",
      textColor: "text-white"
    },
    {
      name: "American Academy of Dermatology", 
      url: "https://www.aad.org/",
      logo: "AAD",
      bgColor: "bg-teal-500",
      textColor: "text-white"
    },
    {
      name: "Cosmetic Ingredient Review",
      url: "https://www.cir-safety.org/",
      logo: "CIR",
      bgColor: "bg-cyan-500",
      textColor: "text-white"
    },
    {
      name: "European Chemicals Agency",
      url: "https://echa.europa.eu/",
      logo: "ECHA",
      bgColor: "bg-yellow-500",
      textColor: "text-black"
    },
    {
      name: "Therapeutic Goods Administration",
      url: "https://www.tga.gov.au/",
      logo: "TGA",
      bgColor: "bg-gray-500",
      textColor: "text-white"
    },
    {
      name: "Food and Drug Administration",
      url: "https://www.fda.gov/",
      logo: "FDA",
      bgColor: "bg-blue-600",
      textColor: "text-white"
    },
    {
      name: "PubMed",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      logo: "PM",
      bgColor: "bg-blue-700",
      textColor: "text-white"
    },
    {
      name: "EWG",
      url: "https://www.ewg.org/",
      logo: "EWG",
      bgColor: "bg-green-500",
      textColor: "text-white"
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[95vh] p-0 bg-background rounded-t-3xl">
        <ScrollArea className="h-full">
          <div className="px-4 pt-6 pb-20">
            {/* Header - Clean design without close button */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={`${product.brand} ${product.name}`}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h1 className="font-semibold text-foreground leading-tight">
                {product.brand} {product.name}
              </h1>
            </div>

            {/* Fit Percentage Circle */}
            <div className="flex justify-center mb-12">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-muted/30"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - product.fitPct / 100)}`}
                    className="text-emerald-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-emerald-500 mb-2">{product.fitPct}%</span>
                  <span className="text-lg text-muted-foreground font-medium">Fit for you</span>
                </div>
              </div>
            </div>

            {/* What Does This Mean */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">What Does This Mean?</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                The product presents a low to absent risk of irritation and offers general skincare benefits 
                such as hydration and soothing, but its formulation is not ideally suited for normal 
                skin, leading to a moderate overall fit score.
              </p>
            </div>

            {/* Timeline Analysis */}
            <div className="mb-12 relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-500"></div>

              {/* Safety */}
              <div className="relative flex gap-6 mb-12">
                <div className="relative z-10 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-lg">1</span>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Safety</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The formulation includes hydrating and soothing components that can improve 
                    overall skin comfort, but it lacks targeted ingredients that effectively combat acne 
                    and blemishes. Therefore, while it offers general skincare benefits, it does not 
                    provide the necessary support for the existing skin issues, making it less 
                    effective for your specific needs.
                  </p>
                </div>
              </div>

              {/* Effectiveness */}
              <div className="relative flex gap-6 mb-12">
                <div className="relative z-10 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-lg">2</span>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Effectiveness</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The formulation includes a balanced mix of effective moisturizing agents and skin 
                    protectants, which are present in appropriate concentrations to deliver 
                    noticeable benefits without overwhelming the skin. This combination suggests that the product 
                    is designed to perform its intended function well, making it a reliable choice 
                    for daily use on sensitive skin.
                  </p>
                </div>
              </div>

              {/* Normal Skin Fit */}
              <div className="relative flex gap-6">
                <div className="relative z-10 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-lg">3</span>
                  </div>
                </div>
                <div className="flex-1 pt-4">
                  <h3 className="text-xl font-bold mb-4 text-foreground">Normal Skin Fit</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The formulation includes hydrating and soothing ingredients like glycerin and 
                    niacinamide, which are beneficial for normal skin. However, the focus on dry 
                    and sensitive skin suggests that it may not deliver the full range of benefits that 
                    a product specifically tailored for normal skin would provide, leading to a lower 
                    likelihood of optimal effectiveness.
                  </p>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Sources</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                The assessment method is always up-to-date with the present state of science.
              </p>
              
              <div className="space-y-6">
                {sources.map((source, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${source.bgColor} rounded-2xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${source.textColor}`}>
                      {source.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground mb-1 leading-tight">{source.name}</div>
                      <a 
                        href={source.url} 
                        className="text-blue-500 text-sm hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {source.url}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval Section */}
            <div className="bg-muted/30 rounded-3xl p-8 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/doctor-nadia.jpg" 
                  alt="Dr. Nadia Kapleva"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to colored circle if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-20 h-20 bg-blue-300 rounded-full"></div>';
                  }}
                />
              </div>
              <div className="mb-4">
                <div className="w-32 h-8 bg-muted mx-auto rounded mb-4 flex items-center justify-center">
                  <svg viewBox="0 0 200 60" className="w-full h-full">
                    <path d="M20,30 Q60,10 100,30 T180,30" stroke="currentColor" strokeWidth="2" fill="none" className="text-muted-foreground"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Approved by Nadia Kapleva,
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Lóvi Medical Director, PhD,<br />
                Cosmetic Chemist,<br />
                Cosmetologist, Aesthetic<br />
                Products Developer
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
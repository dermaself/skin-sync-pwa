import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewScan = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleScan = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      alert('Analysis complete! This would show results.');
    }, 3000);
  };

  return (
    <div className="max-w-screen-sm mx-auto px-4 sm:px-5 pt-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">New Scan</h1>
      
      <div className="lovi-card text-center">
        {isAnalyzing ? (
          <div className="py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analyzing...</h3>
            <p className="text-muted-foreground">Please wait while we scan your product</p>
          </div>
        ) : (
          <div className="py-12">
            <h3 className="text-xl font-semibold mb-4">Scan your skincare product</h3>
            <p className="text-muted-foreground mb-8">
              Take a photo or upload an image to get personalized recommendations
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={handleScan}
                className="w-full py-6 text-lg"
              >
                <Camera className="mr-2" />
                Take Photo
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleScan}
                className="w-full py-6 text-lg"
              >
                <Upload className="mr-2" />
                Upload Image
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewScan;
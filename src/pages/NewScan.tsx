import { useState } from 'react';
import { X, User, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FaceScanner from '@/components/FaceScanner';

const NewScan = () => {
  const [currentView, setCurrentView] = useState<'selection' | 'face-scanner'>('selection');

  const scanOptions = [
    {
      id: 'face',
      title: 'Face',
      description: 'See the condition of your skin',
      image: '👤',
      action: () => setCurrentView('face-scanner')
    },
    {
      id: 'cosmetics',
      title: 'Cosmetics & Food',
      description: 'See if a skincare product, food, beverage, or supplement fits you',
      image: '🥗',
      scansLeft: 2,
      action: () => {
        // TODO: Implement cosmetics scanner
        alert('Cosmetics & Food scanner coming soon!');
      }
    }
  ];

  if (currentView === 'face-scanner') {
    return <FaceScanner onClose={() => setCurrentView('selection')} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Close button */}
      <button 
        onClick={() => window.history.back()}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
      >
        <X size={20} />
      </button>

      <div className="w-full max-w-sm">
        {/* Title */}
        <h1 className="text-white text-2xl font-bold text-center mb-8">
          Make a New Scan
        </h1>

        {/* Scan Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {scanOptions.map((option) => (
            <button
              key={option.id}
              onClick={option.action}
              className="bg-white rounded-3xl p-6 text-center transition-transform hover:scale-105 active:scale-95 relative"
            >
              {/* Scans left indicator */}
              {option.scansLeft && (
                <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {option.scansLeft} scans left
                </div>
              )}
              
              {/* Image/Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center text-2xl">
                {option.id === 'face' ? (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-b from-orange-200 to-orange-300 flex items-center justify-center">
                    <User size={24} className="text-orange-800" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-b from-green-200 to-green-300 flex items-center justify-center">
                    <Package size={24} className="text-green-800" />
                  </div>
                )}
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {option.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewScan;
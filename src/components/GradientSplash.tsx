import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GradientSplash = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Check if user has visited before
          const hasVisited = localStorage.getItem('visited');
          if (!hasVisited) {
            localStorage.setItem('visited', '1');
          }
          navigate('/today');
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">
      {/* Brand Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800" />
      
      {/* Logo Container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo Image */}
        <div className="mb-8">
          <img
            src="/images/android-chrome-512x512.png"
            alt="Dermaself Logo"
            className="w-32 h-32 object-contain"
          />
        </div>
        
        {/* App Name */}
        <h1 className="text-white text-2xl font-semibold mb-2">Dermaself</h1>
        <p className="text-white/80 text-sm">Your Personal Skincare Companion</p>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
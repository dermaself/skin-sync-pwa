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
        {/* White Square Outline */}
        <div className="relative w-32 h-32 border-2 border-white rounded-lg flex items-center justify-center mb-8">
          {/* Logo Text */}
          <div className="text-white text-center">
            <div className="text-4xl font-bold">D</div>
            <div className="text-2xl font-medium ml-1">səlf</div>
          </div>
          
          {/* Green Starburst */}
          <div className="absolute -bottom-2 -left-2 w-6 h-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-full h-full text-green-400"
            >
              <path
                d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"
                fill="currentColor"
              />
            </svg>
          </div>
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
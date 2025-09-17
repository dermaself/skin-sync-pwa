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
    <div className="gradient-splash min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/splash-iphone.png"
          alt="Lóvi splash screen"
          className="w-full h-full object-cover"
        />
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
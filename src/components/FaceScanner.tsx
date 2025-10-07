import { useState, useEffect, useRef } from 'react';
import { X, HelpCircle, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ScanPhase = 'positioning' | 'detection' | 'scanning' | 'processing' | 'results';

interface SkinAnalysis {
  type: 'freckles' | 'wrinkles' | 'pores';
  position: { x: number; y: number };
  color: string;
}

const FaceScanner = ({ onClose }: { onClose: () => void }) => {
  const [phase, setPhase] = useState<ScanPhase>('positioning');
  const [scanProgress, setScanProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightingOk, setLightingOk] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Mock skin analysis data
  const skinAnalysis: SkinAnalysis[] = [
    { type: 'freckles', position: { x: 45, y: 35 }, color: '#8B5CF6' },
    { type: 'freckles', position: { x: 55, y: 42 }, color: '#8B5CF6' },
    { type: 'freckles', position: { x: 52, y: 38 }, color: '#8B5CF6' },
    { type: 'freckles', position: { x: 48, y: 45 }, color: '#8B5CF6' },
    { type: 'wrinkles', position: { x: 42, y: 28 }, color: '#6B7280' },
    { type: 'wrinkles', position: { x: 58, y: 28 }, color: '#6B7280' },
    { type: 'pores', position: { x: 50, y: 52 }, color: '#E5E7EB' },
  ];

  // Start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        // Simulate lighting check
        setTimeout(() => setLightingOk(true), 1000);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    if (phase === 'positioning' || phase === 'detection') {
      startCamera();
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [phase]);

  const handleStart = () => {
    if (phase === 'detection') {
      setPhase('scanning');
      
      // Simulate scanning progress
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Capture image before moving to processing
            captureImage();
            setPhase('processing');
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
      }
    }
  };

  useEffect(() => {
    if (phase === 'positioning' && lightingOk) {
      setTimeout(() => setPhase('detection'), 1500);
    }
  }, [phase, lightingOk]);

  useEffect(() => {
    if (phase === 'processing') {
      const steps = ['Analysing scan results...', 'Building a scan report...'];
      let stepIndex = 0;
      
      const interval = setInterval(() => {
        stepIndex++;
        setProcessingStep(stepIndex);
        
        if (stepIndex >= steps.length) {
          clearInterval(interval);
          setTimeout(() => setPhase('results'), 1000);
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [phase]);

  const filteredAnalysis = selectedFilter === 'All' 
    ? skinAnalysis 
    : skinAnalysis.filter(item => 
        selectedFilter.toLowerCase().includes(item.type)
      );

  if (phase === 'results') {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 text-white">
          <span className="text-sm opacity-60">CeraVe</span>
          <span className="text-sm opacity-60">La Roche-Posay</span>
        </div>
        
        {/* Date */}
        <div className="text-center text-white mb-4">
          <div className="text-sm opacity-80">Sep 17 at 9:14 AM</div>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white z-10"
          aria-label="Close scan results"
        >
          <X size={20} />
        </button>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="relative w-full max-w-80 h-96 rounded-3xl overflow-hidden bg-gray-200">
            {capturedImage ? (
              <>
                <img 
                  src={capturedImage}
                  alt="Scanned face"
                  className="w-full h-full object-cover"
                />
                {/* Skin Analysis Overlay */}
                {filteredAnalysis.map((analysis, index) => (
                  <div
                    key={index}
                    className="absolute w-2 h-2 rounded-full animate-pulse"
                    style={{
                      backgroundColor: analysis.color,
                      left: `${analysis.position.x}%`,
                      top: `${analysis.position.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </>
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No image captured</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="px-4 pb-8">
          <div className="flex gap-3 justify-center">
            {['All', 'Wrinkles', 'Freckles', 'Visible Pores'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted/20 text-white/70 backdrop-blur-sm'
                }`}
              >
                {filter === 'Freckles' && '🟣 '}
                {filter === 'Wrinkles' && '〰️ '}
                {filter === 'Visible Pores' && '⚪ '}
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'processing') {
    const processingSteps = ['Analysing scan results...', 'Building a scan report...'];
    
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        {/* Multiple face angles in circle */}
        <div className="relative w-full max-w-80 h-80 mb-8 mx-auto">
          {/* Center face */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-32 rounded-2xl overflow-hidden bg-gray-200">
            {capturedImage && (
              <img src={capturedImage} alt="Center face" className="w-full h-full object-cover" />
            )}
          </div>
          
          {/* Surrounding faces */}
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const angle = (index * 60) - 90; // Start from top
            const radius = 120;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <div
                key={index}
                className="absolute w-16 h-20 rounded-xl overflow-hidden bg-gray-200"
                style={{
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 40px)`,
                }}
              >
                {capturedImage && (
                  <img src={capturedImage} alt={`Face ${index}`} className="w-full h-full object-cover" />
                )}
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                  <div className="w-2 h-2 text-white">✓</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Processing Text */}
        <div className="text-white text-center">
          <div className="text-lg font-medium mb-2">
            {processingSteps[Math.min(processingStep, processingSteps.length - 1)]}
          </div>
          <div className="w-full max-w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(processingStep + 1) * 50}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
      />
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <button 
          className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white"
          aria-label="Help and instructions"
        >
          <HelpCircle size={20} />
        </button>
        
        {/* Lighting Status */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
          lightingOk ? 'bg-emerald-fit/20 text-emerald-600' : 'bg-emerald-fit/20 text-emerald-600'
        }`}>
          <Sun size={16} />
          <span className="text-sm font-medium">OK</span>
        </div>
        
        <button 
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white"
          aria-label="Close face scanner"
        >
          <X size={20} />
        </button>
      </div>

      {/* Face Detection Overlay */}
      {phase === 'positioning' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-72 h-96 border-2 border-white/50 rounded-3xl" />
        </div>
      )}

      {phase === 'detection' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-72 h-96">
            {/* Face outline */}
            <div className="w-full h-full border-2 border-white rounded-full" />
            
            {/* Grid overlay on forehead area */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-32 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 50">
                {/* Grid lines */}
                {[0, 10, 20, 30, 40, 50].map(y => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="0.5" />
                ))}
                {[0, 20, 40, 60, 80, 100].map(x => (
                  <line key={x} x1={x} y1="0" x2={x} y2="50" stroke="white" strokeWidth="0.5" />
                ))}
              </svg>
            </div>
          </div>
        </div>
      )}

      {phase === 'scanning' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-72 h-72 mx-auto">
            {/* Circular progress */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.3"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - scanProgress / 100)}`}
                className="transition-all duration-100"
              />
              {/* Progress indicators */}
              {Array.from({ length: 72 }, (_, i) => {
                const angle = (i * 5) * (Math.PI / 180);
                const x1 = 50 + 44 * Math.cos(angle);
                const y1 = 50 + 44 * Math.sin(angle);
                const x2 = 50 + 46 * Math.cos(angle);
                const y2 = 50 + 46 * Math.sin(angle);
                const isActive = i <= (scanProgress / 100) * 72;
                
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isActive ? "#10B981" : "white"}
                    strokeWidth="1"
                    opacity={isActive ? 1 : 0.3}
                  />
                );
              })}
            </svg>
            
            {/* Face in center */}
            <div className="absolute inset-4 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
              <video
                className="w-full h-full object-cover"
                ref={videoRef}
                playsInline
                muted
              />
            </div>
          </div>
          
          {/* Instruction */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full">
            <span className="text-white text-sm font-medium">
              Move your head slowly to complete the circle
            </span>
          </div>
        </div>
      )}

      {/* Start Button */}
      {phase === 'detection' && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={handleStart}
            size="lg"
            className="w-20 h-20 rounded-full bg-white text-black hover:bg-white/90 text-lg font-medium"
          >
            Start
          </Button>
        </div>
      )}
    </div>
  );
};

export default FaceScanner;
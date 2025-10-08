import { useState, useEffect, useRef } from 'react';
import { X, HelpCircle, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDiaryStore } from '@/store/diaryStore';
import { format } from 'date-fns';

type ScanPhase = 'positioning' | 'countdown' | 'capturing' | 'processing' | 'results';

interface SkinAnalysis {
  type: 'freckles' | 'wrinkles' | 'pores';
  position: { x: number; y: number };
  color: string;
}

const FaceScanner = ({ onClose }: { onClose: () => void }) => {
  const [phase, setPhase] = useState<ScanPhase>('positioning');
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceCentered, setFaceCentered] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [captureProgress, setCaptureProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightingOk, setLightingOk] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);
  const [scanSaved, setScanSaved] = useState(false);
  const { addScan } = useDiaryStore();

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

    if (phase === 'positioning') {
      startCamera();
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [phase]);

  // Simulate face detection
  useEffect(() => {
    if (phase === 'positioning' && lightingOk) {
      // Simulate detecting a face after 1.5s
      setTimeout(() => setFaceDetected(true), 1500);
      
      // Simulate face being centered after 3s
      setTimeout(() => setFaceCentered(true), 3000);
    }
  }, [phase, lightingOk]);

  // Auto-start countdown when face is centered
  useEffect(() => {
    if (faceCentered && phase === 'positioning') {
      setPhase('countdown');
    }
  }, [faceCentered, phase]);

  // Countdown timer
  useEffect(() => {
    if (phase === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase('capturing');
      }
    }
  }, [phase, countdown]);

  // Multi-frame capture
  useEffect(() => {
    if (phase === 'capturing') {
      const frames: string[] = [];
      let frameCount = 0;
      const maxFrames = 5;
      
      const captureInterval = setInterval(() => {
        if (videoRef.current && canvasRef.current) {
          const canvas = canvasRef.current;
          const video = videoRef.current;
          const ctx = canvas.getContext('2d');
          
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          if (ctx) {
            ctx.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL('image/jpeg', 0.9);
            frames.push(imageData);
            frameCount++;
            setCaptureProgress((frameCount / maxFrames) * 100);
            
            if (frameCount >= maxFrames) {
              clearInterval(captureInterval);
              setCapturedFrames(frames);
              // Select "best" frame (middle one for simplicity)
              setCapturedImage(frames[Math.floor(frames.length / 2)]);
              setPhase('processing');
            }
          }
        }
      }, 200); // Capture every 200ms
      
      return () => clearInterval(captureInterval);
    }
  }, [phase]);


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

  // Save scan to diary when results are shown
  useEffect(() => {
    if (phase === 'results' && capturedImage && !scanSaved) {
      const today = format(new Date(), 'yyyy-MM-dd');
      addScan(today, {
        type: 'face',
        image: capturedImage,
        timestamp: Date.now()
      });
      setScanSaved(true);
    }
  }, [phase, capturedImage, scanSaved, addScan]);

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
          <div className="relative w-full max-w-80 aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-2xl">
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
                    className="absolute w-3 h-3 rounded-full animate-pulse shadow-lg"
                    style={{
                      backgroundColor: analysis.color,
                      left: `${analysis.position.x}%`,
                      top: `${analysis.position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: `0 0 12px ${analysis.color}`,
                    }}
                  />
                ))}
              </>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No image captured</span>
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
          {/* Center face - larger */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-40 rounded-2xl overflow-hidden bg-muted shadow-lg">
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
                className="absolute w-20 h-24 rounded-xl overflow-hidden bg-muted shadow-md"
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 48px)`,
                }}
              >
                {capturedImage && (
                  <img src={capturedImage} alt={`Face ${index}`} className="w-full h-full object-cover" />
                )}
                <div className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Processing Text */}
        <div className="text-white text-center px-4">
          <div className="text-lg font-medium mb-4">
            {processingSteps[Math.min(processingStep, processingSteps.length - 1)]}
          </div>
          <div className="w-full max-w-64 h-1.5 bg-white/20 rounded-full overflow-hidden mx-auto">
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
      {/* Video Background - Always visible */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        playsInline
        muted
        autoPlay
      />
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
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
        <>
          {/* Dark overlay with oval cutout - z-10 to be above video */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <mask id="faceOvalMask">
                  <rect width="100" height="100" fill="white" />
                  {faceCentered ? (
                    // Oval cutout when face is centered
                    <ellipse 
                      cx="50" 
                      cy="50" 
                      rx="35" 
                      ry="45" 
                      fill="black"
                    />
                  ) : (
                    // Rectangular cutout when face not detected or not centered
                    <rect 
                      x="25" 
                      y="15" 
                      width="50" 
                      height="70" 
                      rx="8" 
                      fill="black"
                    />
                  )}
                </mask>
              </defs>
              <rect 
                width="100" 
                height="100" 
                fill="black" 
                opacity="0.6" 
                mask="url(#faceOvalMask)"
              />
            </svg>
          </div>

          {/* Guide frame */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div 
              className={`transition-all duration-700 ease-in-out ${
                faceCentered 
                  ? 'w-[280px] h-[360px] border-[3px] border-white rounded-[50%] shadow-lg' 
                  : 'w-[280px] h-[400px] border-2 border-white/50 rounded-3xl'
              }`}
            />
          </div>

          {/* Instruction text */}
          {!faceDetected && (
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full z-10">
              <span className="text-white text-sm font-medium">
                Position your face in the frame
              </span>
            </div>
          )}
          {faceDetected && !faceCentered && (
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full z-10">
              <span className="text-white text-sm font-medium">
                Center your face
              </span>
            </div>
          )}
        </>
      )}

      {/* Countdown Phase */}
      {phase === 'countdown' && (
        <>
          {/* Dark overlay with oval cutout - z-10 to be above video */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <mask id="countdownMask">
                  <rect width="100" height="100" fill="white" />
                  <ellipse cx="50" cy="50" rx="35" ry="45" fill="black" />
                </mask>
              </defs>
              <rect 
                width="100" 
                height="100" 
                fill="black" 
                opacity="0.6" 
                mask="url(#countdownMask)"
              />
            </svg>
          </div>

          {/* Oval frame */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-[280px] h-[360px] border-[3px] border-white rounded-[50%] shadow-lg" />
          </div>

          {/* Countdown number */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-white text-8xl font-bold animate-pulse drop-shadow-lg">
              {countdown}
            </div>
          </div>
        </>
      )}

      {/* Capturing Phase */}
      {phase === 'capturing' && (
        <>
          {/* Dark overlay with oval cutout - z-10 to be above video */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <mask id="capturingMask">
                  <rect width="100" height="100" fill="white" />
                  <ellipse cx="50" cy="50" rx="35" ry="45" fill="black" />
                </mask>
              </defs>
              <rect 
                width="100" 
                height="100" 
                fill="black" 
                opacity="0.6" 
                mask="url(#capturingMask)"
              />
            </svg>
          </div>

          {/* Oval frame with progress */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="relative w-[280px] h-[360px]">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <ellipse
                  cx="140"
                  cy="180"
                  rx="140"
                  ry="180"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  opacity="0.3"
                />
                <ellipse
                  cx="140"
                  cy="180"
                  rx="140"
                  ry="180"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 160}`}
                  strokeDashoffset={`${2 * Math.PI * 160 * (1 - captureProgress / 100)}`}
                  className="transition-all duration-200"
                />
              </svg>
            </div>
          </div>

          {/* Instruction */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full z-10">
            <span className="text-white text-sm font-medium">
              Capturing your skin...
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default FaceScanner;
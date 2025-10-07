import { useState } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface VideoStep {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
}

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: VideoStep[];
  initialStepIndex?: number;
}

const VideoPlayer = ({ isOpen, onClose, playlist, initialStepIndex = 0 }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

  if (!isOpen || playlist.length === 0) return null;

  const currentStep = playlist[currentStepIndex];
  const canGoPrevious = currentStepIndex > 0;
  const canGoNext = currentStepIndex < playlist.length - 1;

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentStepIndex(currentStepIndex - 1);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentStepIndex(currentStepIndex + 1);
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex-1">
          <h2 className="text-white text-lg font-bold">{currentStep.title}</h2>
          <p className="text-white/60 text-sm mt-1">{currentStep.description}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20 flex-shrink-0"
        >
          <X size={24} />
        </Button>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {/* Placeholder for video - replace with actual video element when needed */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
              <div className="text-center text-white">
                <div className="mb-4">
                  <Button
                    onClick={handlePlay}
                    size="icon"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full w-16 h-16"
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </Button>
                </div>
                <p className="text-lg opacity-80">{currentStep.title}</p>
              </div>
            </div>
            
            {/* Uncomment and use when you have actual video URLs */}
            {/* {currentStep.videoUrl && (
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={currentStep.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )} */}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="p-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-4">
            {playlist.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  setCurrentStepIndex(index);
                  setIsPlaying(false);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentStepIndex 
                    ? "bg-primary w-8" 
                    : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to step ${index + 1}: ${step.title}`}
              />
            ))}
          </div>

          {/* Previous/Next buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className="text-white hover:bg-white/20 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
              <span className="ml-2">Precedente</span>
            </Button>

            <span className="text-white/60 text-sm">
              {currentStepIndex + 1} / {playlist.length}
            </span>

            <Button
              variant="ghost"
              onClick={handleNext}
              disabled={!canGoNext}
              className="text-white hover:bg-white/20 disabled:opacity-30"
            >
              <span className="mr-2">Successivo</span>
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
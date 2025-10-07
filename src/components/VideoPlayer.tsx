import { useState } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2, RotateCcw, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface VideoStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(92); // Mock duration in seconds

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
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentStepIndex(currentStepIndex + 1);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleSkipBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 5));
  };

  const handleSkipForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 5));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col animate-fade-in">
      {/* Header with gradient overlay */}
      <div className="relative p-6 pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-white text-2xl font-bold mb-1">
              {currentStep.description}
            </h1>
            <p className="text-white/60 text-base">
              Step {currentStepIndex + 1} of {playlist.length}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              aria-label="Volume"
            >
              <Volume2 size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X size={28} />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full">
          <div className="relative w-full h-full bg-gray-900">
            {/* Placeholder for video */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
              <div className="text-center text-white">
                <p className="text-lg opacity-80">{currentStep.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative px-4 pb-8 pt-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        
        <div className="relative space-y-4">
          {/* Horizontal Playlist */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {playlist.map((step, index) => (
              <button
                key={step.id}
                onClick={() => {
                  setCurrentStepIndex(index);
                  setIsPlaying(false);
                  setCurrentTime(0);
                }}
                className={cn(
                  "flex-shrink-0 w-[200px] snap-center rounded-2xl p-4 text-left transition-all",
                  index === currentStepIndex
                    ? "bg-white text-black"
                    : "bg-white/20 text-white/60 hover:bg-white/30"
                )}
              >
                <h3 className={cn(
                  "font-semibold text-base mb-1",
                  index === currentStepIndex ? "text-black" : "text-white"
                )}>
                  {step.title}
                </h3>
                <p className={cn(
                  "text-sm",
                  index === currentStepIndex ? "text-primary" : "text-white/50"
                )}>
                  {step.duration || '1 min'}
                </p>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-white rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
            
            <div className="flex justify-between text-white/60 text-xs">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className="text-white hover:bg-white/20 disabled:opacity-30 h-12 w-12"
            >
              <SkipBack size={24} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkipBackward}
              className="text-white hover:bg-white/20 h-12 w-12"
            >
              <RotateCcw size={20} />
              <span className="absolute text-[10px] font-bold">5</span>
            </Button>

            <Button
              size="icon"
              onClick={handlePlay}
              className="bg-white hover:bg-white/90 text-black h-16 w-16 rounded-full"
            >
              {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkipForward}
              className="text-white hover:bg-white/20 h-12 w-12"
            >
              <RotateCw size={20} />
              <span className="absolute text-[10px] font-bold">5</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              disabled={!canGoNext}
              className="text-white hover:bg-white/20 disabled:opacity-30 h-12 w-12"
            >
              <SkipForward size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
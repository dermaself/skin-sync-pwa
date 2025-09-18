import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Story {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  content?: string[];
}

interface StoriesViewerProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex?: number;
}

const StoriesViewer = ({ isOpen, onClose, stories, initialStoryIndex = 0 }: StoriesViewerProps) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentStoryIndex];
  const totalSlides = currentStory?.content?.length || 1;
  const SLIDE_DURATION = 3000; // 3 seconds per slide

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / SLIDE_DURATION) * 100;
        
        if (newProgress >= 100) {
          // Move to next slide or story
          if (currentSlideIndex < totalSlides - 1) {
            setCurrentSlideIndex(prev => prev + 1);
          } else if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setCurrentSlideIndex(0);
          } else {
            // End of all stories
            onClose();
            return 0;
          }
          return 0;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, currentSlideIndex, currentStoryIndex, totalSlides, stories.length, onClose]);

  useEffect(() => {
    setCurrentStoryIndex(initialStoryIndex);
    setCurrentSlideIndex(0);
    setProgress(0);
  }, [initialStoryIndex, isOpen]);

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setCurrentSlideIndex(0);
    }
    setProgress(0);
  };

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setCurrentSlideIndex(0);
    } else {
      onClose();
    }
    setProgress(0);
  };

  const handlePause = () => setIsPlaying(false);
  const handleResume = () => setIsPlaying(true);

  if (!isOpen || !currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black animate-fade-in">
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex gap-1 mb-4">
          {stories.map((_, storyIdx) => (
            <div key={storyIdx} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: storyIdx < currentStoryIndex ? '100%' : 
                         storyIdx === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Story header */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">L</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">{currentStory.category}</h3>
              <p className="text-xs text-white/70">{currentStory.readTime}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2"
          >
            <X size={20} />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        onMouseDown={handlePause}
        onMouseUp={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        <div className="relative w-full h-full max-w-lg mx-auto">
          <img 
            src={currentStory.image} 
            alt={currentStory.title}
            className="w-full h-full object-cover"
          />
          
          {/* Content overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <h2 className="text-white text-2xl font-bold mb-2 leading-tight">
              {currentStory.title}
            </h2>
            {currentStory.content && currentStory.content[currentSlideIndex] && (
              <p className="text-white/90 text-sm leading-relaxed">
                {currentStory.content[currentSlideIndex]}
              </p>
            )}
          </div>

          {/* Navigation areas */}
          <div className="absolute inset-0 flex">
            <div 
              className="flex-1 cursor-pointer flex items-center justify-start pl-4"
              onClick={handlePrevious}
            >
              <ChevronLeft size={32} className="text-white/50 hover:text-white/80 transition-colors" />
            </div>
            <div 
              className="flex-1 cursor-pointer flex items-center justify-end pr-4"
              onClick={handleNext}
            >
              <ChevronRight size={32} className="text-white/50 hover:text-white/80 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesViewer;
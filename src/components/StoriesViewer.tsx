import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  content?: string[];
  highlightedWord?: string;
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
          if (currentSlideIndex < totalSlides - 1) {
            setCurrentSlideIndex(prev => prev + 1);
          } else if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setCurrentSlideIndex(0);
          } else {
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

  // Parse title to highlight specific words
  const renderTitle = (title: string, highlightedWord?: string) => {
    if (!highlightedWord) {
      return <span>{title}</span>;
    }

    const parts = title.split(new RegExp(`(${highlightedWord})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlightedWord.toLowerCase() ? (
        <span key={index} className="bg-pink-400 text-white px-3 py-1 rounded-full">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  if (!isOpen || !currentStory) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black animate-fade-in">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${currentStory.image})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex gap-1 mb-4">
          {stories.map((_, storyIdx) => (
            <div key={storyIdx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear rounded-full"
                style={{
                  width: storyIdx < currentStoryIndex ? '100%' : 
                         storyIdx === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Title pill and close button */}
      <div className="absolute top-16 left-4 right-4 z-20 flex items-center justify-between">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 max-w-[280px]">
          <p className="text-black text-sm font-medium leading-tight truncate">
            {currentStory.title}
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main content area with navigation */}
      <div 
        className="relative w-full h-full flex items-end pb-20"
        onMouseDown={handlePause}
        onMouseUp={handleResume}
        onTouchStart={handlePause}
        onTouchEnd={handleResume}
      >
        {/* Navigation areas (invisible touch zones) */}
        <div className="absolute inset-0 flex z-10">
          <div 
            className="flex-1 cursor-pointer"
            onClick={handlePrevious}
          />
          <div 
            className="flex-1 cursor-pointer"
            onClick={handleNext}
          />
        </div>

        {/* Bottom text content */}
        <div className="relative z-20 w-full px-6 pb-8">
          <div className="text-center">
            <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-4">
              {renderTitle(currentStory.title, currentStory.highlightedWord)}
            </h1>
            
            {currentStory.content && currentStory.content[currentSlideIndex] && (
              <p className="text-white/90 text-lg leading-relaxed max-w-md mx-auto">
                {currentStory.content[currentSlideIndex]}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoriesViewer;
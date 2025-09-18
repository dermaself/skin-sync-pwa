import { useState } from 'react';
import { X, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

const VideoPlayer = ({ isOpen, onClose, videoUrl, title }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/20"
        >
          <X size={24} />
        </Button>
      </div>
      
      <div className="w-full max-w-6xl mx-4">
        {title && (
          <h2 className="text-white text-2xl font-bold mb-4 text-center">{title}</h2>
        )}
        
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          {/* Placeholder for video - replace with actual video element when needed */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
            <div className="text-center text-white">
              <div className="mb-4">
                <Button
                  onClick={handlePlay}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </Button>
              </div>
              <p className="text-lg opacity-80">Skincare Application Tutorial</p>
            </div>
          </div>
          
          {/* Uncomment and use when you have actual video URLs */}
          {/* {videoUrl && (
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
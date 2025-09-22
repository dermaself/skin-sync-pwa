import { useState } from 'react';
import { Clock, BookOpen, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/VideoPlayer';
import StoriesViewer from '@/components/StoriesViewer';
import sugarAgingImage from '@/assets/sugar-aging-glycation.jpg';
import moisturizerImage from '@/assets/moisturizer-application.jpg';
import dullSkinImage from '@/assets/dull-vs-glowing-skin.jpg';
import acneSunImage from '@/assets/acne-sun-myth.jpg';
import foreheadMassageImage from '@/assets/forehead-massage.jpg';
import eyeMassageImage from '@/assets/eye-massage.jpg';
import hairTreatmentImage from '@/assets/hair-treatment-guide.jpg';
import skincareGuideImage from '@/assets/7day-skincare-guide.jpg';

const academyContent = [
  {
    id: '1',
    title: 'Sugar And Aging: Why We Need To Fight Glycation',
    category: 'Nutrition',
    readTime: '2 min',
    image: sugarAgingImage,
    highlightedWord: 'Fight',
    content: [
      'Sugar molecules bind to proteins in your skin through a process called glycation, forming harmful compounds called AGEs.',
      'These AGEs break down collagen and elastin, the proteins that keep your skin firm and elastic.',
      'To fight glycation, reduce sugar intake and use antioxidant-rich skincare products.',
      'Regular exercise and a balanced diet can help minimize the effects of glycation on your skin.'
    ]
  },
  {
    id: '2',
    title: 'Moisturizing As A Skincare Keystone',
    category: 'Basics',
    readTime: '2 min',
    image: moisturizerImage,
    highlightedWord: 'Keystone',
    content: [
      'Moisturizing is the foundation of healthy skin, maintaining your skin barrier function.',
      'A good moisturizer contains humectants, emollients, and occlusives to hydrate and protect.',
      'Apply moisturizer to damp skin to lock in hydration for maximum effectiveness.',
      'Choose products based on your skin type: lightweight for oily skin, richer formulas for dry skin.'
    ]
  },
  {
    id: '3',
    title: 'Why Does Skin Become Dull?',
    category: 'Dullness',
    readTime: '1 min',
    image: dullSkinImage,
    highlightedWord: 'Dull',
    content: [
      'Dull skin is often caused by dead skin cell buildup on the surface.',
      'Environmental factors like pollution and UV damage contribute to skin dullness.',
      'Lack of sleep and dehydration can make your complexion appear lackluster.',
      'Regular exfoliation and vitamin C serums can help restore your natural glow.'
    ]
  },
  {
    id: '4',
    title: 'Sunbathing won\'t cure acne and here is why',
    category: 'Acne',
    readTime: '1 min',
    image: acneSunImage,
    highlightedWord: 'cure',
    content: [
      'While sun initially dries out acne, it actually makes the problem worse long-term.',
      'UV exposure thickens the skin and clogs pores, leading to more breakouts.',
      'Sun damage can cause post-inflammatory hyperpigmentation from acne scars.',
      'Use non-comedogenic sunscreen daily and treat acne with proven ingredients like salicylic acid.'
    ]
  }
];

const massageGuides = [
  {
    title: 'Massage Forehead',
    steps: '8 steps',
    duration: '18 min',
    image: foreheadMassageImage
  },
  {
    title: 'Massage Eyes',
    steps: '7 steps',
    duration: '23 min',
    image: eyeMassageImage
  }
];

const skincareGuides = [
  {
    title: 'Hair Treatment Guide',
    category: 'Hair Care',
    readTime: '27 min',
    locked: true,
    image: hairTreatmentImage
  },
  {
    title: '7-day Skincare Guide',
    category: 'Basic Care',
    readTime: '25 min',
    locked: false,
    image: skincareGuideImage,
    description: 'Elevate your daily life with ultimate routines'
  }
];

const applicationGuides = [
  {
    title: 'Serum Application',
    image: '/images/today_2.png'
  },
  {
    title: 'Cleansing',
    duration: '2 min',
    hasStart: true,
    image: '/images/today_3.png'
  },
  {
    title: 'Moisturizer Application',
    image: '/images/today_4.png'
  }
];

const Insights = () => {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const handleWatchLearn = () => {
    setIsVideoPlayerOpen(true);
  };

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
    setIsStoriesOpen(true);
  };

  return (
    <div className="mobile-main mobile-container animate-fade-in pt-12">
      <h1 className="text-3xl font-bold mb-8">Insights</h1>
      
      {/* Skincare Academy */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">Skincare Academy</h2>
          <p className="text-muted-foreground">for Wrinkles, Enlarged Pores</p>
        </div>
        
      <div className="mobile-scroll-container pb-4 -mx-4 px-4">
        <div className="flex gap-4">
          {academyContent.map((item, index) => (
            <div key={index} className="mobile-scroll-item">
            <div 
              className="dermaself-card p-0 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform border border-border/50"
              onClick={() => handleStoryClick(index)}
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 text-primary text-xs">
                    <BookOpen size={14} />
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock size={14} />
                    <span>{item.readTime}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-sm leading-tight">{item.title}</h3>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
      </section>

      {/* Massages for your focus area */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">Massages for your focus area</h2>
          <p className="text-muted-foreground">Simple steps to sculpted face</p>
        </div>
        
        <div className="mobile-scroll-container pb-4 -mx-4 px-4">
          <div className="flex gap-4">
            {massageGuides.map((item, index) => (
              <div key={index} className="mobile-scroll-item">
              <div className="relative cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative border border-border/30">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                      {item.steps} {item.duration}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white text-lg font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Handcrafted Skincare Guides */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">Handcrafted Skincare Guides</h2>
          <p className="text-muted-foreground">by Dermaself Medical Team</p>
        </div>
        
        <div className="mobile-scroll-container pb-4 -mx-4 px-4">
          <div className="flex gap-3">
            {skincareGuides.map((item, index) => (
              <div key={index} className="mobile-scroll-item">
              <div className="dermaself-card p-0 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{item.title}</h3>
                      {item.description && (
                        <p className="text-white/80 text-sm">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-primary text-sm">
                      <BookOpen size={16} />
                      <span>{item.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock size={16} />
                      <span>{item.readTime}</span>
                    </div>
                    {item.locked && (
                      <div className="ml-auto">
                        <div className="w-4 h-4 bg-muted-foreground rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-background rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Skincare Application Guides */}
      <section className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Step-by-Step Skincare Application Guides</h2>
        </div>
        
        <div className="dermaself-card p-0 overflow-hidden border border-border/50">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10 relative overflow-hidden">
            <img 
              src="/images/skincare-tutorial.jpg" 
              alt="Skincare Application Guide"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                  Master Your Daily Skincare Routine
                </h3>
                <p className="text-white/90 text-base mb-3">
                  Learn proper application techniques for optimal results
                </p>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span className="text-sm">15 min tutorial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} />
                    <span className="text-sm">Step-by-step guide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 text-center">
            <Button 
              onClick={handleWatchLearn}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 text-base font-semibold rounded-xl"
            >
              <Play size={18} className="mr-2" />
              Watch & Learn
            </Button>
          </div>
        </div>
      </section>

      <VideoPlayer 
        isOpen={isVideoPlayerOpen}
        onClose={() => setIsVideoPlayerOpen(false)}
        title="Skincare Application Tutorial"
      />

      <StoriesViewer
        isOpen={isStoriesOpen}
        onClose={() => setIsStoriesOpen(false)}
        stories={academyContent}
        initialStoryIndex={selectedStoryIndex}
      />
    </div>
  );
};

export default Insights;

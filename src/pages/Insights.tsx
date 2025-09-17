import { Clock, BookOpen, Play } from 'lucide-react';
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
    title: 'Sugar And Aging: Why We Need To Fight Glycation',
    category: 'Nutrition',
    readTime: '2 min',
    image: sugarAgingImage
  },
  {
    title: 'Moisturizing As A Skincare Keystone',
    category: 'Basics',
    readTime: '2 min',
    image: moisturizerImage
  },
  {
    title: 'Why Does Skin Become Dull?',
    category: 'Dullness',
    readTime: '1 min',
    image: dullSkinImage
  },
  {
    title: 'Sunbathing won\'t cure acne and here is why',
    category: 'Acne',
    readTime: '1 min',
    image: acneSunImage
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
  return (
    <div className="max-w-screen-sm mx-auto px-4 sm:px-5 pt-12 pb-24 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Insights</h1>
      
      {/* Skincare Academy */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">Skincare Academy</h2>
          <p className="text-muted-foreground">for Wrinkles, Enlarged Pores</p>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {academyContent.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <div className="lovi-card p-0 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-primary text-sm">
                      <BookOpen size={16} />
                      <span>{item.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Clock size={16} />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm leading-tight">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Massages for your focus area */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">Massages for your focus area</h2>
          <p className="text-muted-foreground">Simple steps to sculpted face</p>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {massageGuides.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <div className="relative cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                      {item.steps} {item.duration}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Handcrafted Skincare Guides */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">Handcrafted Skincare Guides</h2>
          <p className="text-muted-foreground">by Lovi Medical Team</p>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {skincareGuides.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <div className="lovi-card p-0 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform">
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
      </section>

      {/* Step-by-Step Skincare Application Guides */}
      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Step-by-Step Skincare Application Guides</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {applicationGuides.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-48">
              <div className="relative cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                    {item.hasStart && (
                      <div className="flex items-center gap-2">
                        <div className="bg-white/20 rounded-full p-2">
                          <Play size={16} className="text-white fill-white" />
                        </div>
                        <span className="text-white text-sm">Start {item.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Watch & Learn */}
      <section>
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Watch & Learn</h2>
        </div>
      </section>
    </div>
  );
};

export default Insights;
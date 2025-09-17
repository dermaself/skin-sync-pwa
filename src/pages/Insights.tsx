import { TrendingUp, Award, Target, BookOpen } from 'lucide-react';

const insights = [
  {
    icon: TrendingUp,
    title: 'Your Skin Progress',
    description: 'Track improvements in hydration and texture over the past 30 days',
    color: 'text-emerald-600'
  },
  {
    icon: Award,
    title: 'Routine Consistency',
    description: 'You\'ve maintained your routine 85% of the time this month',
    color: 'text-primary'
  },
  {
    icon: Target,
    title: 'Goal Achievement',
    description: 'You\'re on track to meet your skin health goals',
    color: 'text-orange-500'
  },
  {
    icon: BookOpen,
    title: 'Learning Center',
    description: 'Discover new tips and techniques for sensitive skin',
    color: 'text-blue-500'
  }
];

const Insights = () => {
  return (
    <div className="max-w-screen-sm mx-auto px-4 sm:px-5 pt-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Insights</h1>
      
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="lovi-card flex items-start gap-4 hover:scale-[1.02] transition-transform cursor-pointer">
              <div className={`p-3 rounded-full bg-gray-100 ${insight.color}`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{insight.title}</h3>
                <p className="text-muted-foreground text-sm">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 lovi-card text-center">
        <h3 className="text-lg font-semibold mb-2">More insights coming soon!</h3>
        <p className="text-muted-foreground">
          We're working on personalized analytics for your skincare journey.
        </p>
      </div>
    </div>
  );
};

export default Insights;
import { User, Bell, Globe, Shield, Info } from 'lucide-react';

const Me = () => {
  return (
    <div className="max-w-screen-sm mx-auto px-4 sm:px-5 pt-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Lorenzo</h1>
      
      {/* Profile Section */}
      <div className="dermaself-card flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <User size={32} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Lorenzo</h3>
          <p className="text-muted-foreground">Skincare enthusiast</p>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <div className="dermaself-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-muted-foreground" />
            <span className="font-medium">Notifications</span>
          </div>
          <div className="w-12 h-6 bg-primary rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
          </div>
        </div>

        <div className="dermaself-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-muted-foreground" />
            <span className="font-medium">Language & Currency</span>
          </div>
          <span className="text-muted-foreground">EN, EUR</span>
        </div>

        <div className="dermaself-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-muted-foreground" />
            <span className="font-medium">Privacy & Data</span>
          </div>
        </div>

        <div className="dermaself-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info size={20} className="text-muted-foreground" />
            <span className="font-medium">About Dermaself</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm">Version 1.0.0</p>
      </div>
    </div>
  );
};

export default Me;
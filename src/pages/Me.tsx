import { User, Bell, Globe, Shield, Info, Crown } from 'lucide-react';
import { useState } from 'react';
import { SubscriptionSheet } from '@/components/SubscriptionSheet';

const Me = () => {
  const [isSubscriptionSheetOpen, setIsSubscriptionSheetOpen] = useState(false);
  
  return (
    <div className="mobile-main mobile-container animate-fade-in pt-12">
      <h1 className="text-3xl font-obviously font-bold mb-8 text-foreground">Lorenzo</h1>
      
      {/* Profile Section */}
        <div className="dermaself-card flex items-center gap-4 mb-6 border border-border/50 p-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <User size={28} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Lorenzo</h3>
          <p className="text-muted-foreground text-sm">Appassionato di skincare</p>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="mb-6">
        <button 
          className="dermaself-card w-full flex items-center justify-between border-2 border-primary/30 p-4 hover:border-primary/50 transition-all active:scale-[0.98]"
          onClick={() => setIsSubscriptionSheetOpen(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Crown size={20} className="text-primary" />
            </div>
            <div className="text-left">
              <span className="font-semibold block">Gestisci Abbonamento</span>
              <span className="text-sm text-muted-foreground">Night Cream & App Premium</span>
            </div>
          </div>
          <div className="text-primary text-sm font-medium">→</div>
        </button>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <div className="dermaself-card flex items-center justify-between border border-border/50 p-4">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-muted-foreground" />
            <span className="font-medium">Notifiche</span>
          </div>
          <div className="w-12 h-6 bg-primary rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
          </div>
        </div>

        <div className="dermaself-card flex items-center justify-between border border-border/50 p-4">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-muted-foreground" />
            <span className="font-medium">Lingua e Valuta</span>
          </div>
          <span className="text-muted-foreground text-sm">IT, EUR</span>
        </div>

        <div className="dermaself-card flex items-center justify-between border border-border/50 p-4">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-muted-foreground" />
            <span className="font-medium">Privacy e Dati</span>
          </div>
        </div>

        <div className="dermaself-card flex items-center justify-between border border-border/50 p-4">
          <div className="flex items-center gap-3">
            <Info size={20} className="text-muted-foreground" />
            <span className="font-medium">Informazioni su Dermaself</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm">Versione 1.0.0</p>
      </div>

      <SubscriptionSheet 
        isOpen={isSubscriptionSheetOpen}
        onClose={() => setIsSubscriptionSheetOpen(false)}
      />
    </div>
  );
};

export default Me;
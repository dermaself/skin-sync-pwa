import { User, Bell, Globe, Shield, Info } from 'lucide-react';

const Me = () => {
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
    </div>
  );
};

export default Me;
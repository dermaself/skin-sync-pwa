import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Sun, 
  Package, 
  ScanLine, 
  BarChart3, 
  User 
} from 'lucide-react';
import { createPortal } from 'react-dom';

const tabs = [
  { id: 'today', label: 'Today', icon: Sun, path: '/today' },
  { id: 'products', label: 'Products', icon: Package, path: '/products' },
  { id: 'new-scan', label: 'New Scan', icon: ScanLine, path: '/new-scan' },
  { id: 'insights', label: 'Insights', icon: BarChart3, path: '/insights' },
  { id: 'lorenzo', label: 'Lorenzo', icon: User, path: '/me' },
];

export const BottomNav = () => {
  const location = useLocation();

  const nav = (
    <nav className="bottom-nav" role="navigation" aria-label="Primary">
      <div className="flex items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all min-h-[48px] justify-center flex-1 max-w-[80px]",
                isActive 
                  ? "text-primary bg-primary/10 scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn(
                "text-xs font-medium leading-tight",
                isActive ? "font-semibold" : "font-normal"
              )}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );

  // Render via portal to avoid being affected by any ancestor transforms
  return createPortal(nav, document.body);
};
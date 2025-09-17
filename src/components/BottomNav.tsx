import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Sun, 
  Package, 
  ScanLine, 
  BarChart3, 
  User 
} from 'lucide-react';

const tabs = [
  { id: 'today', label: 'Today', icon: Sun, path: '/today' },
  { id: 'products', label: 'Products', icon: Package, path: '/products' },
  { id: 'new-scan', label: 'New Scan', icon: ScanLine, path: '/new-scan' },
  { id: 'insights', label: 'Insights', icon: BarChart3, path: '/insights' },
  { id: 'lorenzo', label: 'Lorenzo', icon: User, path: '/me' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
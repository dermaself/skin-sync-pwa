import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Package, ScanLine, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FloatingSmiley = () => {
  const [open, setOpen] = useState(false);

  const shortcuts = [
    { label: 'New Scan', icon: ScanLine, path: '/new-scan' },
    { label: 'Products', icon: Package, path: '/products' },
    { label: 'Insights', icon: BarChart3, path: '/insights' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="floating-smiley animate-scale-in">
          😊
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl">
        <div className="py-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Quick Actions</h3>
          <div className="space-y-3">
            {shortcuts.map((shortcut) => {
              const Icon = shortcut.icon;
              return (
                <Link
                  key={shortcut.path}
                  to={shortcut.path}
                  onClick={() => setOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 py-6"
                  >
                    <Icon size={20} />
                    {shortcut.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
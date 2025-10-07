import { X, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SubscriptionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubscriptionSheet = ({ isOpen, onClose }: SubscriptionSheetProps) => {
  if (!isOpen) return null;

  // Sample subscription data
  const subscription = {
    product: {
      name: "Centella Night Recovery Cream",
      brand: "PURITO",
      image: "/images/products/cerave-pm.png",
      description: "Crema notte riparativa con centella asiatica e ceramidi per la rigenerazione notturna della pelle.",
      benefits: [
        "Ripara la barriera cutanea durante la notte",
        "Riduce rossori e irritazioni",
        "Idratazione profonda e duratura",
        "Formula delicata per pelli sensibili"
      ]
    },
    plan: {
      type: "3 mesi",
      price: "29.90",
      nextDelivery: "15 Novembre 2025",
      renewalDate: "15 Gennaio 2026"
    }
  };

  const planOptions = [
    { duration: "1 mese", price: "12.90", savings: "0%" },
    { duration: "3 mesi", price: "29.90", savings: "23%", recommended: true },
    { duration: "6 mesi", price: "54.90", savings: "29%" }
  ];

  return (
    <div className="fixed inset-0 bg-background z-50 animate-slide-in-right">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-obviously font-bold">Il Tuo Abbonamento</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors active:scale-95"
            aria-label="Close subscription details"
          >
            <X size={24} />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Product Section */}
            <div className="dermaself-card">
              <div className="flex gap-4 mb-4">
                <div className="flex-shrink-0">
                  <img
                    src={subscription.product.image}
                    alt={subscription.product.name}
                    className="w-24 h-24 rounded-xl object-cover bg-muted"
                  />
                </div>
                <div className="flex-1">
                  <div className="category-chip mb-2">{subscription.product.brand}</div>
                  <h3 className="font-semibold text-lg leading-tight mb-2">
                    {subscription.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Inclusa nel tuo abbonamento
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Benefici:</h4>
                <ul className="space-y-2">
                  {subscription.product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Current Subscription Details */}
            <div className="dermaself-card space-y-4">
              <h3 className="font-semibold text-lg">Piano Attivo</h3>
              
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
                <div>
                  <p className="font-semibold text-lg">{subscription.plan.type}</p>
                  <p className="text-sm text-muted-foreground">Piano corrente</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl">€{subscription.plan.price}</p>
                  <p className="text-xs text-muted-foreground">ogni 3 mesi</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                  <Calendar className="text-primary flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium">Prossima Consegna</p>
                    <p className="text-sm text-muted-foreground">{subscription.plan.nextDelivery}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl">
                  <CreditCard className="text-primary flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium">Rinnovo Automatico</p>
                    <p className="text-sm text-muted-foreground">{subscription.plan.renewalDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Plan Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Modifica Piano</h3>
              
              <div className="space-y-3">
                {planOptions.map((plan) => (
                  <button
                    key={plan.duration}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all text-left hover:border-primary/50 active:scale-[0.98]",
                      plan.recommended ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{plan.duration}</p>
                          {plan.recommended && (
                            <span className="text-xs px-2 py-0.5 bg-primary text-primary-foreground rounded-full font-medium">
                              Consigliato
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {plan.savings !== "0%" && `Risparmia ${plan.savings}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">€{plan.price}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cancel Subscription */}
            <div className="dermaself-card bg-destructive/5 border-destructive/20">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-semibold mb-1">Cancella Abbonamento</h4>
                  <p className="text-sm text-muted-foreground">
                    Puoi cancellare il tuo abbonamento in qualsiasi momento. Continuerai ad avere accesso fino alla fine del periodo corrente.
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                Cancella Abbonamento
              </Button>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border space-y-3">
          <Button className="w-full" size="lg">
            Salva Modifiche
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Chiudi
          </Button>
        </div>
      </div>
    </div>
  );
};
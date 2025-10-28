import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { CheckCircle, Clock } from "lucide-react";
import { trackInitiateCheckout } from "@/lib/fbPixel";

export default function CTASection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 23,
    minutes: 47,
    seconds: 0
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDirectPurchase = () => {
    trackInitiateCheckout();
    setLocation("/checkout");
  };

  return (
    <section id="inscricao" className="py-16 md:py-24 gradient-bg">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="mb-8">
            <p className="text-white/90 text-sm md:text-base font-semibold mb-4 flex items-center justify-center gap-2" data-testid="text-promotion-label">
              <Clock className="h-4 w-4" />
              Promoção termina em:
            </p>
            <div className="flex justify-center gap-3 md:gap-6" data-testid="countdown-timer">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-4xl font-black text-white" data-testid="countdown-days">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-white/80 font-semibold">dias</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-4xl font-black text-white" data-testid="countdown-hours">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-white/80 font-semibold">horas</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-4xl font-black text-white" data-testid="countdown-minutes">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-white/80 font-semibold">min</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                <div className="text-2xl md:text-4xl font-black text-white" data-testid="countdown-seconds">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs md:text-sm text-white/80 font-semibold">seg</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-4" data-testid="text-cta-title">
            Prepare-se para o ENEM 2025. Comece agora!
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 mb-8" data-testid="text-cta-subtitle">
            Acesso imediato a todas as sinopses + bônus exclusivos
          </p>

          <Button 
            size="lg"
            onClick={handleDirectPurchase}
            className="bg-white text-primary hover:bg-white/90 font-bold text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-lg shadow-lg w-full md:w-auto flex items-center justify-center gap-2"
            data-testid="button-cta-main"
          >
            Quero Garantir Minha Vaga!
          </Button>
          
          <p className="text-white/70 text-sm mt-6 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> 7 dias de garantia incondicional
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> Acesso vitalício
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

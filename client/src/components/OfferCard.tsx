import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Mail, Smartphone, ShieldCheck } from "lucide-react";

export default function OfferCard() {
  const [, setLocation] = useLocation();
  const [timeLeft, setTimeLeft] = useState({
    minutes: 11,
    seconds: 23
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-deep-space relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,240,255,0.1),transparent_70%)]"></div>
      
      <div className="container relative mx-auto max-w-2xl px-4">
        <Card className="relative glass-panel text-white p-6 md:p-12 rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta"></div>
          
          <div className="absolute top-3 right-3 md:top-4 md:right-4">
            <Badge className="bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30 font-bold animate-pulse backdrop-blur-sm" data-testid="badge-sold-count">
              🔥 21 vendidos agora
            </Badge>
          </div>
          
          <div className="text-center space-y-6 md:space-y-8">
            <div className="inline-block p-4 bg-gradient-to-br from-neon-cyan/10 to-neon-violet/10 rounded-full border border-neon-cyan/20">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center text-2xl md:text-3xl font-black text-deep-space" data-testid="img-offer-logo">
                T
              </div>
            </div>
            
            <div>
              <h3 className="text-xl md:text-3xl font-black mb-3 leading-tight text-white" data-testid="text-offer-title">
                ÚLTIMAS VAGAS COM PREÇO PROMOCIONAL!
              </h3>
              <p className="text-base md:text-lg font-semibold text-gray-300" data-testid="text-offer-description">
                Packs de estudos completos, direto ao ponto
              </p>
            </div>
            
            <div className="glass-panel rounded-2xl p-6 md:p-8 backdrop-blur-xl border-neon-cyan/20">
              <p className="text-5xl md:text-7xl font-black bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta bg-clip-text text-transparent mb-2" data-testid="text-price">
                R$ 19,90
              </p>
              <p className="text-sm md:text-base text-gray-400">por apenas</p>
            </div>
            
            <div className="flex justify-center gap-3 md:gap-4">
              <div className="glass-panel rounded-xl p-3 md:p-4 min-w-[80px] md:min-w-[100px] border-neon-cyan/20">
                <div className="text-3xl md:text-5xl font-black text-neon-cyan" data-testid="text-countdown-minutes">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-400">minutos</div>
              </div>
              <div className="flex items-center text-3xl md:text-4xl font-black text-neon-violet">:</div>
              <div className="glass-panel rounded-xl p-3 md:p-4 min-w-[80px] md:min-w-[100px] border-neon-cyan/20">
                <div className="text-3xl md:text-5xl font-black text-neon-cyan" data-testid="text-countdown-seconds">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-400">segundos</div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="mt-6 md:mt-8 glass-panel rounded-2xl p-4 md:p-6 space-y-4">
          <div className="flex items-start gap-3 text-gray-300">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-neon-cyan flex-shrink-0 mt-1" />
            <p className="text-xs md:text-sm" data-testid="text-benefit-1">
              Checklist diário para organizar seus estudos e revisar tudo com foco.
            </p>
          </div>
          
          <div className="flex items-start gap-3 text-gray-300">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-neon-cyan flex-shrink-0 mt-1" />
            <p className="text-xs md:text-sm" data-testid="text-benefit-2">
              Dicas exclusivas para pular centenas de questões e ganhar tempo na prova.
            </p>
          </div>
          
          <div className="bg-neon-violet/10 border-l-4 border-neon-violet rounded p-3 md:p-4 flex items-start gap-3">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-neon-violet flex-shrink-0 mt-1" />
            <p className="text-xs md:text-sm text-gray-300 font-medium" data-testid="text-access-info">
              ⚡ Estude hoje mesmo! Acesso imediato aos packs de estudos via e-mail após a confirmação.
            </p>
          </div>
          
          <div className="bg-neon-cyan/10 border-l-4 border-neon-cyan rounded p-3 md:p-4 flex items-start gap-3">
            <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-neon-cyan flex-shrink-0 mt-1" />
            <p className="text-xs md:text-sm text-gray-300 font-medium" data-testid="text-compatibility">
              📱 Compatível com celular, tablet e computador — leve seus packs de estudos onde quiser.
            </p>
          </div>
          
          <Button 
            size="lg" 
            className="w-full bg-neon-cyan hover:bg-neon-cyan/90 text-deep-space font-bold text-base md:text-lg py-6 md:py-7 rounded-full shadow-[0_0_30px_rgba(54,240,255,0.4)] hover:shadow-[0_0_40px_rgba(54,240,255,0.6)] transition-all duration-300"
            data-testid="button-cta-offer"
            onClick={() => setLocation('/checkout')}
          >
            Quero meus packs agora ✅
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-neon-cyan">
            <Mail className="w-3 h-3 md:w-4 md:h-4" />
            <span data-testid="text-email-delivery">📧 Envio automático por e-mail • acesso imediato</span>
          </div>
          
          <p className="text-center text-neon-cyan font-semibold text-sm md:text-base" data-testid="text-personal-discount">
            Desconto pessoal ativado
          </p>
          
          <div className="flex justify-center items-center gap-2 pt-2 md:pt-4">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-neon-cyan" />
            <span className="text-neon-cyan font-bold text-sm md:text-base" data-testid="img-guarantee-badge">
              7 Dias de Garantia
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

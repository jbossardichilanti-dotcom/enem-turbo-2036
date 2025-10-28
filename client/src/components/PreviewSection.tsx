import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle } from "lucide-react";
import { trackInitiateCheckout } from "@/lib/fbPixel";

export default function PreviewSection() {
  const scrollToInscricao = () => {
    trackInitiateCheckout();
    const element = document.getElementById('inscricao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container relative mx-auto max-w-6xl px-4 space-y-12 md:space-y-20">
        <div className="bg-card border border-card-border rounded-3xl p-6 md:p-12 shadow-lg">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-12 md:p-20 flex flex-col items-center justify-center gap-6">
            <div className="flex gap-4">
              <FileText className="w-16 h-16 md:w-20 md:h-20 text-primary" />
              <Download className="w-16 h-16 md:w-20 md:h-20 text-secondary" />
              <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-accent" />
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-foreground text-center">
              Acesso Imediato às Sinopses
            </h3>
            <p className="text-muted-foreground text-center max-w-2xl">
              Receba todo o material digital direto no seu e-mail e comece a estudar agora mesmo
            </p>
          </div>
        </div>
        
        <div className="text-center px-4">
          <Button 
            size="lg"
            onClick={scrollToInscricao}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-lg shadow-lg w-full max-w-md flex items-center justify-center gap-2"
            data-testid="button-cta-preview"
          >
            <CheckCircle className="h-5 w-5" />
            Quero começar agora
          </Button>
        </div>
      </div>
    </section>
  );
}

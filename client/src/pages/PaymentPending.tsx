import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Home } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function PaymentPending() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setLocation("/");
    }
  }, [token, setLocation]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-amber-600 dark:text-amber-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-4" data-testid="text-pending-title">
            Pagamento Pendente
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4" data-testid="text-pending-message">
            Seu pagamento está sendo processado.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              <span>Tempo de aprovação</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Para pagamentos via PIX: geralmente aprovado em minutos<br />
              Para pagamentos via Boleto: aprovação em até 2 dias úteis
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              Guarde este link para acessar seus materiais após a aprovação:
            </p>
            
            <div className="bg-muted p-3 rounded-lg mb-4">
              <code className="text-xs break-all">
                {window.location.origin}/download?token={token}
              </code>
            </div>

            <Button 
              size="lg"
              onClick={() => setLocation("/")}
              data-testid="button-go-home"
            >
              <Home className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

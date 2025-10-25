import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, ArrowLeft, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function PaymentFailure() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-4" data-testid="text-failure-title">
            Pagamento Não Autorizado
          </h1>
          
          <p className="text-lg text-muted-foreground mb-4" data-testid="text-failure-message">
            Não foi possível processar seu pagamento. Isso pode ter acontecido por diversos motivos.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8 text-left">
            <div className="flex items-start gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-semibold mb-2">Possíveis motivos:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Saldo insuficiente</li>
                  <li>Dados incorretos</li>
                  <li>Transação cancelada</li>
                  <li>Limite de pagamento excedido</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setLocation("/checkout")}
              data-testid="button-try-again"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Tentar Novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

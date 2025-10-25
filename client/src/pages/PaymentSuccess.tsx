import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, BookOpen } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function PaymentSuccess() {
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
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black mb-4" data-testid="text-success-title">
            Pagamento Aprovado! 🎉
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8" data-testid="text-success-message">
            Seu pagamento foi confirmado com sucesso. Agora você pode acessar seus guias Amor & Conexão!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setLocation(`/download?token=${token}`)}
              data-testid="button-access-materials"
            >
              <Download className="w-5 h-5 mr-2" />
              Acessar Materiais
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setLocation(`/study?token=${token}`)}
              data-testid="button-start-studying"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Começar a Aprender
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

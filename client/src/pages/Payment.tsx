import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { QrCode, Receipt, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Payment() {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "boleto">("pix");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  // Pegar dados do URL (plano e valor)
  const searchParams = new URLSearchParams(window.location.search);
  const plan = searchParams.get("plan") || "completo";
  const amount = searchParams.get("amount") || "59.65";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Formatações
    if (name === "cpf") {
      formattedValue = value.replace(/\D/g, "").slice(0, 11);
      formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (name === "cardNumber") {
      formattedValue = value.replace(/\D/g, "").slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, "$1 ").trim();
    } else if (name === "cardExpiry") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
      formattedValue = formattedValue.replace(/(\d{2})(\d{2})/, "$1/$2");
    } else if (name === "cardCvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.cpf) {
      toast({
        title: "Preencha todos os campos",
        description: "Nome, email e CPF são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          amount,
          email: formData.email,
          name: formData.name,
          cpf: formData.cpf,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirecionar para o Checkout Pro do Mercado Pago
      if (data.checkoutUrl) {
        toast({
          title: "Redirecionando para o pagamento...",
          description: "Você será levado para o checkout seguro do Mercado Pago",
        });
        
        // Redirecionar após 1 segundo
        setTimeout(() => {
          window.location.href = data.checkoutUrl;
        }, 1000);
      } else {
        throw new Error('URL de checkout não disponível');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao processar pagamento",
        description: error.message || "Tente novamente.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-bg py-12">
        <div className="container mx-auto max-w-4xl px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-black mb-2" data-testid="text-payment-title">
            Finalizar Pagamento
          </h1>
          <p className="text-lg text-white/90" data-testid="text-payment-subtitle">
            Total: R$ {parseFloat(amount).toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dados do Cliente */}
            <Card className="p-6">
              <h2 className="text-xl font-black mb-4">Seus Dados</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="João da Silva"
                    required
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="joao@email.com"
                    required
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    required
                    data-testid="input-cpf"
                  />
                </div>
              </div>
            </Card>

            {/* Método de Pagamento */}
            <Card className="p-6">
              <h2 className="text-xl font-black mb-4">Forma de Pagamento</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover-elevate">
                    <RadioGroupItem value="pix" id="pix" data-testid="radio-pix" />
                    <QrCode className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-bold">PIX</div>
                      <div className="text-sm text-muted-foreground">Aprovação instantânea</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover-elevate">
                    <RadioGroupItem value="boleto" id="boleto" data-testid="radio-boleto" />
                    <Receipt className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-bold">Boleto</div>
                      <div className="text-sm text-muted-foreground">Aprovação em até 2 dias</div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isProcessing}
              className="min-w-[200px]"
              data-testid="button-submit-payment"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Redirecionando...
                </>
              ) : (
                `Pagar R$ ${parseFloat(amount).toFixed(2).replace('.', ',')}`
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Você será redirecionado para o checkout seguro do Mercado Pago
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

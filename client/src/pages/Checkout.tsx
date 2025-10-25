import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Check, BookOpen, Sparkles, Crown, FileText, Target, TrendingUp, Award, Video, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [addRedacao, setAddRedacao] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const plans = [
    {
      id: "basico",
      name: "Pack Básico",
      price: 26.90,
      oldPrice: 47.90,
      description: "Essencial para começar",
      features: [
        "Sinopses de Matemática e Linguagens",
        "Fórmulas e resumos essenciais",
        "Dicas práticas para o ENEM",
        "Acesso vitalício ao material"
      ],
      icon: BookOpen,
      popular: false,
      priceColor: "text-[hsl(var(--math-topic))]"
    },
    {
      id: "completo",
      name: "Pack Completo",
      price: 59.65,
      oldPrice: 97.90,
      description: "Mais completo e vendido",
      features: [
        "Tudo do Pack Básico",
        "Sinopses de Ciências da Natureza",
        "Sinopses de Ciências Humanas",
        "Links para videoaulas",
        "Exercícios comentados",
        "Acesso vitalício ao material"
      ],
      icon: Sparkles,
      popular: true,
      priceColor: "text-primary"
    },
    {
      id: "premium",
      name: "Pack Premium",
      price: 79.55,
      oldPrice: 147.90,
      description: "Preparação completa",
      features: [
        "Tudo do Pack Completo",
        "Todas as matérias do ENEM",
        "Cronograma de estudos",
        "Mapas mentais exclusivos",
        "Simulados comentados",
        "Suporte prioritário",
        "Acesso vitalício ao material"
      ],
      icon: Crown,
      popular: false,
      priceColor: "text-[hsl(var(--nature-topic))]"
    }
  ];

  const handlePurchase = async () => {
    if (!selectedPlan) {
      toast({
        title: "Selecione um plano",
        description: "Por favor, escolha um dos planos acima para continuar.",
        variant: "destructive"
      });
      return;
    }

    const plan = plans.find(p => p.id === selectedPlan);
    const total = (plan?.price || 0) + (addRedacao ? 19.90 : 0);

    try {
      const response = await fetch('/api/create-invictus-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          amount: total.toFixed(2),
          addRedacao: addRedacao,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.checkoutUrl) {
        toast({
          title: "Redirecionando para o pagamento...",
          description: "Você será levado para o checkout seguro",
        });
        
        setTimeout(() => {
          window.location.href = data.checkoutUrl;
        }, 1000);
      } else {
        throw new Error('URL de checkout não disponível');
      }
    } catch (error: any) {
      toast({
        title: "Erro ao processar",
        description: error.message || "Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg py-12 md:py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight" data-testid="text-checkout-title">
              ENEM Turbo 2025
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-semibold" data-testid="text-checkout-subtitle">
              Escolha seu plano e comece a estudar agora
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="planos" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/10 backdrop-blur-sm" data-testid="tabs-checkout">
              <TabsTrigger value="planos" className="data-[state=active]:bg-white data-[state=active]:text-primary font-bold" data-testid="tab-planos">
                Planos
              </TabsTrigger>
              <TabsTrigger value="produto" className="data-[state=active]:bg-white data-[state=active]:text-primary font-bold" data-testid="tab-produto">
                Sobre o Produto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="produto" className="mt-8">
              <Card className="p-6 md:p-8 bg-white/95 backdrop-blur-sm">
                <h2 className="text-3xl font-black text-foreground mb-6 text-center" data-testid="text-about-title">
                  O que você vai receber?
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--math-topic))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-[hsl(var(--math-topic))]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Sinopses Completas</h3>
                      <p className="text-sm text-muted-foreground">
                        Resumos detalhados de todas as matérias do ENEM: Matemática, Linguagens, Ciências Humanas e Natureza
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Fórmulas Essenciais</h3>
                      <p className="text-sm text-muted-foreground">
                        Todas as fórmulas importantes organizadas por matéria com exemplos práticos de aplicação
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--nature-topic))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-[hsl(var(--nature-topic))]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Dicas para o ENEM</h3>
                      <p className="text-sm text-muted-foreground">
                        Macetes exclusivos e estratégias comprovadas para otimizar seus estudos e performance
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--language-topic))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Video className="w-6 h-6 text-[hsl(var(--language-topic))]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Links para Videoaulas</h3>
                      <p className="text-sm text-muted-foreground">
                        Acesso a videoaulas selecionadas que complementam o conteúdo escrito
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--human-topic))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Download className="w-6 h-6 text-[hsl(var(--human-topic))]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Download em PDF</h3>
                      <p className="text-sm text-muted-foreground">
                        Baixe todo o material em PDF para estudar offline quando e onde quiser
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Acesso Vitalício</h3>
                      <p className="text-sm text-muted-foreground">
                        Pague uma vez e tenha acesso para sempre, com todas as atualizações incluídas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                  <h3 className="font-black text-xl mb-2 text-primary">14+ Matérias Completas</h3>
                  <p className="text-muted-foreground">
                    Mais de 269 linhas de conteúdo educacional detalhado, criado especificamente para o ENEM
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Plans */}
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <Card
                key={plan.id}
                className={`relative p-6 cursor-pointer transition-all ${
                  isSelected 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : 'hover-elevate'
                } ${plan.popular ? 'border-primary' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold">
                      MAIS VENDIDO
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-foreground mb-2" data-testid={`text-plan-name-${plan.id}`}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-semibold">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="mb-2">
                    <span className="text-lg text-muted-foreground line-through font-semibold">
                      R$ {plan.oldPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <div className={`text-5xl font-black ${plan.priceColor}`} data-testid={`text-plan-price-${plan.id}`}>
                    R$ {plan.price.toFixed(2).replace('.', ',')}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 font-semibold">pagamento único</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={isSelected ? "default" : "outline"}
                  data-testid={`button-select-${plan.id}`}
                >
                  {isSelected ? "Selecionado" : "Selecionar"}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Order Bump - Redação */}
        <Card 
          className={`p-6 mb-8 cursor-pointer transition-all ${
            addRedacao ? 'ring-2 ring-[hsl(var(--coral-topic))] shadow-lg' : 'hover-elevate'
          }`}
          onClick={() => setAddRedacao(!addRedacao)}
          data-testid="card-orderbump-redacao"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                addRedacao 
                  ? 'bg-[hsl(var(--coral-topic))] border-[hsl(var(--coral-topic))]' 
                  : 'border-muted-foreground'
              }`}>
                {addRedacao && <Check className="w-4 h-4 text-white" />}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-[hsl(var(--coral-topic))]" />
                <h3 className="text-xl font-black text-foreground" data-testid="text-orderbump-title">
                  Adicionar Guia de Redação ENEM
                </h3>
                <span className="bg-[hsl(var(--coral-topic))]/10 text-[hsl(var(--coral-topic))] px-3 py-1 rounded-full text-xs font-bold">
                  OFERTA ESPECIAL
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Estrutura completa da redação ENEM, temas prováveis, repertórios socioculturais e exemplos de redações nota 1000
              </p>

              <div className="flex items-center gap-3">
                <div className="text-3xl font-black text-[hsl(var(--coral-topic))]" data-testid="text-orderbump-price">
                  + R$ 19,90
                </div>
                <div className="text-sm text-muted-foreground line-through font-semibold">
                  de R$ 39,90
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary & Purchase */}
        <Card className="p-6 bg-muted/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Resumo do Pedido
              </h3>
              <div className="space-y-1 text-sm">
                {selectedPlan ? (
                  <>
                    <p className="text-muted-foreground">
                      {plans.find(p => p.id === selectedPlan)?.name}:{" "}
                      <span className="font-semibold text-foreground">
                        R$ {plans.find(p => p.id === selectedPlan)?.price.toFixed(2).replace('.', ',')}
                      </span>
                    </p>
                    {addRedacao && (
                      <p className="text-muted-foreground">
                        Guia de Redação ENEM:{" "}
                        <span className="font-semibold text-foreground">R$ 19,90</span>
                      </p>
                    )}
                    <div className="pt-2 mt-2 border-t">
                      <p className="text-2xl font-black text-primary" data-testid="text-total">
                        Total: R$ {(
                          (plans.find(p => p.id === selectedPlan)?.price || 0) + 
                          (addRedacao ? 19.90 : 0)
                        ).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">Nenhum plano selecionado</p>
                )}
              </div>
            </div>

            <Button
              size="lg"
              onClick={handlePurchase}
              className="bg-primary text-primary-foreground font-bold text-lg px-8 whitespace-nowrap"
              data-testid="button-purchase"
            >
              Finalizar Compra
            </Button>
          </div>
        </Card>

        {/* Garantia */}
        <Card className="p-6 mb-6 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-primary">Garantia de 5 Dias</h3>
          </div>
          <p className="text-center text-muted-foreground">
            Não gostou do material? Solicite reembolso em até 5 dias após a compra, sem perguntas. Seu dinheiro de volta garantido!
          </p>
        </Card>

        {/* Segurança */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground font-semibold">
            🔒 Pagamento 100% seguro • 📱 Acesso imediato • 🎓 Acesso vitalício
          </p>
        </div>
      </div>
    </div>
  );
}

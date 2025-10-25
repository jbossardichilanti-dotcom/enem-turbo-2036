import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Check, Star, Zap, Crown, FileText, ShoppingCart, Package, Download as DownloadIcon, CheckCircle, BookOpen, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function TabbedSales() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [addRedacao, setAddRedacao] = useState(false);
  const [activeTab, setActiveTab] = useState("venda");
  const [downloadToken, setDownloadToken] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const plans = [
    {
      id: "basico",
      name: "Pack Básico",
      price: 26.90,
      oldPrice: 47.90,
      description: "Comece sua jornada",
      features: [
        "Resumos essenciais de todas as matérias",
        "Mapas mentais básicos",
        "Cronograma de estudos",
        "Acesso vitalício ao material"
      ],
      icon: Star,
      popular: false,
      priceColor: "text-[hsl(100,70%,45%)]"
    },
    {
      id: "completo",
      name: "Pack Completo",
      price: 59.65,
      oldPrice: 97.90,
      description: "Mais vendido",
      features: [
        "Tudo do Pack Básico",
        "Questões comentadas",
        "Simulados completos",
        "Dicas de redação",
        "Material de revisão final",
        "Acesso vitalício ao material"
      ],
      icon: Zap,
      popular: true,
      priceColor: "text-[hsl(270,80%,60%)]"
    },
    {
      id: "premium",
      name: "Pack Premium",
      price: 79.55,
      oldPrice: 147.90,
      description: "Aprovação garantida",
      features: [
        "Tudo do Pack Completo",
        "Videoaulas exclusivas",
        "Plano de estudos personalizado",
        "Banco de redações corrigidas",
        "Suporte prioritário",
        "Acesso vitalício ao material"
      ],
      icon: Crown,
      popular: false,
      priceColor: "text-[hsl(320,85%,60%)]"
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
          addRedacao,
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

  const handleAction = (type: string, endpoint?: string, action?: () => void) => {
    if (!downloadToken) {
      toast({
        title: "Erro",
        description: "Token de download inválido. Faça uma nova compra.",
        variant: "destructive"
      });
      return;
    }

    if (type === 'web' && action) {
      action();
    } else if (type === 'pdf' && endpoint) {
      toast({
        title: "Download iniciado!",
        description: `O arquivo PDF começou a ser baixado.`,
      });
      window.open(endpoint, '_blank');
    }
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);
  const total = (selectedPlanData?.price || 0) + (addRedacao ? 19.90 : 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-4xl font-black text-center mb-8" data-testid="text-main-title">
          ENEM Turbo 2025
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8" data-testid="tabs-list">
            <TabsTrigger value="venda" data-testid="tab-venda">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Página de Venda
            </TabsTrigger>
            <TabsTrigger value="checkout" data-testid="tab-checkout">
              <Package className="w-4 h-4 mr-2" />
              Checkout
            </TabsTrigger>
            <TabsTrigger value="entregavel" data-testid="tab-entregavel">
              <DownloadIcon className="w-4 h-4 mr-2" />
              Entregável
            </TabsTrigger>
          </TabsList>

          {/* ABA 1: PÁGINA DE VENDA */}
          <TabsContent value="venda" className="mt-6" data-testid="content-venda">
            <div className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-black" data-testid="text-venda-title">
                  Conquiste sua aprovação no ENEM! 🎯
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-venda-subtitle">
                  Material completo e atualizado para você estudar de forma inteligente e eficiente
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  return (
                    <Card 
                      key={plan.id} 
                      className={`relative hover-elevate ${plan.popular ? 'border-primary border-2' : ''}`}
                      data-testid={`card-plan-${plan.id}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground" data-testid={`badge-popular-${plan.id}`}>
                            Mais Popular
                          </Badge>
                        </div>
                      )}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg" data-testid={`text-plan-name-${plan.id}`}>{plan.name}</h3>
                            <p className="text-sm text-muted-foreground" data-testid={`text-plan-desc-${plan.id}`}>{plan.description}</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-3xl font-black ${plan.priceColor}`} data-testid={`text-plan-price-${plan.id}`}>
                              R$ {plan.price.toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through" data-testid={`text-plan-oldprice-${plan.id}`}>
                              R$ {plan.oldPrice.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Economize R$ {(plan.oldPrice - plan.price).toFixed(2)}
                          </p>
                        </div>

                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2" data-testid={`text-feature-${plan.id}-${idx}`}>
                              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className="w-full" 
                          onClick={() => {
                            setSelectedPlan(plan.id);
                            setActiveTab("checkout");
                          }}
                          data-testid={`button-select-${plan.id}`}
                        >
                          Selecionar Plano
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="text-center space-y-4">
                <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Acesso vitalício</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Conteúdo atualizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Pagamento seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ABA 2: CHECKOUT */}
          <TabsContent value="checkout" className="mt-6" data-testid="content-checkout">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black" data-testid="text-checkout-title">
                  Finalize sua compra
                </h2>
                <p className="text-muted-foreground" data-testid="text-checkout-subtitle">
                  Você está a um passo de conquistar sua aprovação!
                </p>
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4" data-testid="text-planos-disponiveis">Planos Disponíveis</h3>
                <div className="space-y-3">
                  {plans.map((plan) => {
                    const Icon = plan.icon;
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer hover-elevate ${
                          isSelected ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                        data-testid={`option-plan-${plan.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                            }`}>
                              {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <Icon className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-semibold" data-testid={`text-checkout-plan-${plan.id}`}>{plan.name}</p>
                              <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-2xl font-black ${plan.priceColor}`} data-testid={`text-checkout-price-${plan.id}`}>
                              R$ {plan.price.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground line-through">
                              R$ {plan.oldPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setAddRedacao(!addRedacao)}
                    data-testid="option-redacao"
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      addRedacao ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {addRedacao && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <FileText className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-semibold" data-testid="text-redacao-title">Pack de Redação Extra</p>
                      <p className="text-sm text-muted-foreground">30 redações modelo + correção detalhada</p>
                    </div>
                    <p className="text-xl font-black text-primary" data-testid="text-redacao-price">+ R$ 19,90</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-3xl font-black text-primary" data-testid="text-total">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full" 
                    onClick={handlePurchase}
                    disabled={!selectedPlan}
                    data-testid="button-comprar"
                  >
                    {selectedPlan ? 'Finalizar Compra' : 'Selecione um plano'}
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground font-semibold">
                    🔒 Pagamento 100% seguro • 📱 Acesso imediato
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* ABA 3: ENTREGÁVEL */}
          <TabsContent value="entregavel" className="mt-6" data-testid="content-entregavel">
            <div className="max-w-4xl mx-auto space-y-8">
              {downloadToken ? (
                <>
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black" data-testid="text-entregavel-title">
                      Parabéns! 🎉
                    </h2>
                    <p className="text-lg text-muted-foreground" data-testid="text-entregavel-subtitle">
                      Seus packs de estudos ENEM Turbo estão prontos para download
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="hover-elevate" data-testid="card-web-viewer">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <BookOpen className="w-8 h-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg" data-testid="text-web-title">Visualizador Web Interativo</h3>
                            <Badge className="mt-1 bg-primary/20 text-primary border-0" data-testid="badge-recommended">
                              Recomendado
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground" data-testid="text-web-description">
                          Acesse seu conteúdo em uma plataforma web moderna, colorida e interativa com busca, navegação fácil e acompanhamento de progresso
                        </p>
                        <Button 
                          className="w-full"
                          onClick={() => handleAction('web', undefined, () => setLocation(`/study?token=${downloadToken}`))}
                          data-testid="button-web-access"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Acessar Visualizador
                        </Button>
                      </div>
                    </Card>

                    <Card className="hover-elevate" data-testid="card-pdf-download">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-muted rounded-lg">
                            <FileText className="w-8 h-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg" data-testid="text-pdf-title">Sinopses em PDF</h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground" data-testid="text-pdf-description">
                          Baixe todas as sinopses em PDF para estudar offline ou imprimir
                        </p>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => handleAction('pdf', `/api/download-synopsis?token=${downloadToken}`)}
                          data-testid="button-pdf-download"
                        >
                          <DownloadIcon className="w-4 h-4 mr-2" />
                          Baixar PDF
                        </Button>
                      </div>
                    </Card>
                  </div>

                  <div className="text-center pt-8 border-t">
                    <p className="text-sm text-muted-foreground">
                      Guarde o link de acesso aos seus materiais em um lugar seguro
                    </p>
                  </div>
                </>
              ) : (
                <Card className="p-12 text-center" data-testid="card-no-purchase">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2" data-testid="text-no-purchase-title">Nenhuma compra realizada</h3>
                  <p className="text-muted-foreground mb-6" data-testid="text-no-purchase-description">
                    Complete uma compra na aba Checkout para acessar seus materiais aqui
                  </p>
                  <Button onClick={() => setActiveTab("checkout")} data-testid="button-go-checkout">
                    Ir para Checkout
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

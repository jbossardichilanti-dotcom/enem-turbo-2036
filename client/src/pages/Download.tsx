import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download as DownloadIcon, FileText, CheckCircle, BookOpen, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Download() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Extrair token da URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const packs = [
    {
      title: "📱 Visualizador Web Interativo",
      description: "Acesse seu conteúdo em uma plataforma web moderna, colorida e interativa com busca, navegação fácil e acompanhamento de progresso",
      icon: BookOpen,
      type: "web",
      highlighted: true,
      action: () => setLocation(`/study?token=${token}`)
    },
    {
      title: "📄 Sinopses em PDF",
      description: "Baixe todas as sinopses em PDF para estudar offline ou imprimir",
      icon: FileText,
      type: "pdf",
      highlighted: false,
      endpoint: `/api/download-synopsis?token=${token}`
    }
  ];

  const handleAction = (pack: typeof packs[0]) => {
    if (!token) {
      toast({
        title: "Erro",
        description: "Token de download inválido. Faça uma nova compra.",
        variant: "destructive"
      });
      return;
    }

    if (pack.type === 'web' && pack.action) {
      pack.action();
    } else if (pack.type === 'pdf' && pack.endpoint) {
      toast({
        title: "Download iniciado!",
        description: `O arquivo PDF começou a ser baixado.`,
      });
      window.open(pack.endpoint, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center text-white">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4" data-testid="text-download-title">
            Parabéns! 🎉
          </h1>
          <p className="text-lg md:text-xl text-white/90" data-testid="text-download-subtitle">
            Seus guias Amor & Conexão estão prontos para download
          </p>
        </div>
      </div>

      {/* Downloads Section */}
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2" data-testid="text-downloads-title">
            Seus Materiais
          </h2>
          <p className="text-muted-foreground" data-testid="text-downloads-subtitle">
            Baixe todos os packs ou escolha os que você precisa
          </p>
        </div>

        <div className="space-y-4">
          {packs.map((pack, index) => {
            const Icon = pack.icon;
            return (
              <Card
                key={index}
                className={`p-6 hover:shadow-lg transition-all ${pack.highlighted ? 'border-primary border-2' : ''}`}
                data-testid={`card-pack-${index}`}
              >
                {pack.highlighted && (
                  <div className="mb-4">
                    <Badge className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      RECOMENDADO
                    </Badge>
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${pack.highlighted ? 'bg-gradient-to-br from-cyan-500/20 to-violet-500/20' : 'bg-primary/10'}`}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1" data-testid={`text-pack-title-${index}`}>
                      {pack.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-pack-description-${index}`}>
                      {pack.description}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleAction(pack)}
                    className={pack.highlighted ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:opacity-90 gap-2" : "bg-primary text-primary-foreground hover:bg-primary/90 gap-2"}
                    data-testid={`button-action-${index}`}
                  >
                    {pack.type === 'web' ? (
                      <>
                        <BookOpen className="w-4 h-4" />
                        Acessar Agora
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="w-4 h-4" />
                        Baixar PDF
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Instructions */}
        <Card className="mt-8 p-6 bg-muted/30" data-testid="card-instructions">
          <h3 className="text-lg font-bold text-foreground mb-4">
            📚 Como usar seus packs
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Baixe os arquivos PDF no seu dispositivo</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Abra os PDFs com qualquer leitor (Adobe, navegador, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Você pode imprimir ou estudar direto do celular/tablet</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Organize seus estudos e revise sempre que precisar</span>
            </li>
          </ul>
        </Card>

      </div>
    </div>
  );
}

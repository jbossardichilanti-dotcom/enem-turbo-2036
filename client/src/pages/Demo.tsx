import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateAndDownload = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/demo-token');
      const data = await response.json();
      
      if (data.directPdfUrl) {
        toast({
          title: "PDF gerado!",
          description: "Abrindo o PDF em uma nova aba...",
        });
        
        window.open(data.directPdfUrl, '_blank');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar o PDF",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-bg py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center text-white">
          <Eye className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black mb-4" data-testid="text-demo-title">
            Demonstração do PDF
          </h1>
          <p className="text-lg md:text-xl text-white/90" data-testid="text-demo-subtitle">
            Veja como ficou o material de estudo ENEM Turbo
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="w-6 h-6" />
              Sinopses Completas ENEM Turbo 2025
            </CardTitle>
            <CardDescription>
              Material completo com 35 tópicos cobrindo todas as áreas do ENEM
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-md">
                <div className="text-2xl font-black text-primary">6</div>
                <div className="text-sm text-muted-foreground">Linguagens</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-md">
                <div className="text-2xl font-black text-primary">6</div>
                <div className="text-sm text-muted-foreground">Matemática</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-md">
                <div className="text-2xl font-black text-primary">10</div>
                <div className="text-sm text-muted-foreground">Ciências Humanas</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-md">
                <div className="text-2xl font-black text-primary">13</div>
                <div className="text-sm text-muted-foreground">Ciências Natureza</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-lg">Conteúdo incluído:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Linguagens:</strong> Interpretação de Textos, Gêneros Textuais, Funções da Linguagem, Figuras de Linguagem, Escolas Literárias, Análise Literária</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Matemática:</strong> Razão e Proporção, Equações, Funções, Geometria Plana, Espacial e Analítica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Ciências Humanas:</strong> História do Brasil e Geral, Geografia Física e Humana, Cartografia, Filosofia e Sociologia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span><strong>Ciências da Natureza:</strong> Mecânica, Termodinâmica, Eletromagnetismo, Química Geral, Orgânica, Citologia, Genética, Evolução, Ecologia e Fisiologia</span>
                </li>
              </ul>
            </div>

            <Button 
              onClick={generateAndDownload}
              disabled={loading}
              size="lg"
              className="w-full"
              data-testid="button-download-demo"
            >
              <Download className="w-5 h-5 mr-2" />
              {loading ? "Gerando PDF..." : "Baixar PDF de Demonstração"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Este é um PDF de demonstração com todo o conteúdo real do produto
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

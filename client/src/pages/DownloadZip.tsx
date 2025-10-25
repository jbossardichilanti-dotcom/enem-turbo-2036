import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileArchive, CheckCircle } from "lucide-react";

export default function DownloadZip() {
  const handleDownload = () => {
    window.location.href = "/download-projeto-zip";
  };

  return (
    <div className="min-h-screen bg-deep-space flex items-center justify-center p-4">
      <Card className="glass-panel max-w-2xl w-full p-8 md:p-12 text-white">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center">
              <FileArchive className="w-10 h-10 text-deep-space" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent">
            Download do Projeto
          </h1>

          <p className="text-gray-300 text-lg">
            Baixe o projeto completo pronto para deploy na Netlify
          </p>

          <div className="glass-panel rounded-xl p-6 space-y-4 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-300">
                <strong className="text-white">Projeto limpo</strong> - Sem arquivos desnecessários
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-300">
                <strong className="text-white">1.4 MB</strong> - Super leve e otimizado
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-300">
                <strong className="text-white">Pronto para Netlify</strong> - Com configuração completa
              </p>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-300">
                <strong className="text-white">Pagamentos funcionando</strong> - Invictus Pay integrado
              </p>
            </div>
          </div>

          <Button
            size="lg"
            onClick={handleDownload}
            className="w-full bg-neon-cyan hover:bg-neon-cyan/90 text-deep-space font-bold text-lg py-7 rounded-full shadow-[0_0_30px_rgba(54,240,255,0.4)] hover:shadow-[0_0_40px_rgba(54,240,255,0.6)] transition-all duration-300"
            data-testid="button-download-zip"
          >
            <Download className="w-5 h-5 mr-2" />
            Baixar Projeto ZIP
          </Button>

          <p className="text-sm text-gray-400">
            O download começará automaticamente ao clicar no botão
          </p>
        </div>
      </Card>
    </div>
  );
}

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, FileText, CreditCard, RefreshCw } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <Link href="/">
            <Button variant="ghost" className="mb-6 text-white hover:bg-white/10" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight" data-testid="text-terms-title">
            Termos de Uso
          </h1>
          <p className="text-lg text-white/90 font-semibold">
            ENEM Turbo 2025 - Políticas e Garantias
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="space-y-6">
          {/* Garantia de 5 Dias */}
          <Card className="p-6 md:p-8 border-primary/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground mb-2" data-testid="text-guarantee-title">
                  Garantia de 5 Dias
                </h2>
                <p className="text-muted-foreground mb-4">
                  Oferecemos garantia incondicional de satisfação por 5 dias após a compra.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="font-bold mb-2">Como funciona:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Você tem 5 dias corridos a partir da data de compra para solicitar o reembolso</li>
                  <li>Sem perguntas, sem burocracias - seu dinheiro de volta garantido</li>
                  <li>Mesmo se você já baixou o material, a garantia é válida</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2">Como solicitar reembolso:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Envie um email para: <span className="font-semibold text-foreground">suporte@enemturbo.com.br</span></li>
                  <li>Informe seu nome completo e email usado na compra</li>
                  <li>Prazo de processamento: até 7 dias úteis</li>
                  <li>O valor será estornado no mesmo método de pagamento usado</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Produto Digital */}
          <Card className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[hsl(var(--math-topic))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[hsl(var(--math-topic))]" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground mb-2">Produto Digital</h2>
                <p className="text-muted-foreground mb-4">
                  O ENEM Turbo é um produto 100% digital. Entenda suas características:
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Acesso imediato após confirmação do pagamento</li>
                <li>Material disponível para visualização online e download em PDF</li>
                <li>Acesso vitalício - sem mensalidades ou renovações</li>
                <li>Todas as atualizações incluídas sem custo adicional</li>
                <li>Não é permitido compartilhar, revender ou distribuir o material</li>
              </ul>
            </div>
          </Card>

          {/* Pagamento */}
          <Card className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[hsl(var(--nature-topic))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-[hsl(var(--nature-topic))]" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground mb-2">Formas de Pagamento</h2>
                <p className="text-muted-foreground mb-4">
                  Processamos pagamentos de forma segura através da Invictus Pay:
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><span className="font-semibold text-foreground">PIX:</span> Aprovação instantânea</li>
                <li><span className="font-semibold text-foreground">Cartão de Crédito:</span> Aprovação em até 2 minutos</li>
                <li><span className="font-semibold text-foreground">Boleto Bancário:</span> Aprovação em até 3 dias úteis</li>
                <li>Ambiente 100% seguro com criptografia SSL</li>
                <li>Seus dados de pagamento não são armazenados em nossos servidores</li>
              </ul>
            </div>
          </Card>

          {/* Uso do Material */}
          <Card className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[hsl(var(--language-topic))]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-6 h-6 text-[hsl(var(--language-topic))]" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground mb-2">Direitos de Uso</h2>
                <p className="text-muted-foreground mb-4">
                  Ao adquirir o ENEM Turbo, você concorda com as seguintes condições:
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground">
              <div>
                <h3 className="font-bold mb-2 text-primary">✅ Você PODE:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Estudar o material quantas vezes quiser</li>
                  <li>Fazer anotações e marcações pessoais</li>
                  <li>Baixar os PDFs para estudo offline</li>
                  <li>Imprimir para uso pessoal</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2 text-destructive">❌ Você NÃO PODE:</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Compartilhar o material com outras pessoas</li>
                  <li>Revender ou redistribuir o conteúdo</li>
                  <li>Publicar trechos em redes sociais ou sites</li>
                  <li>Utilizar para fins comerciais</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground italic mt-4">
                * O descumprimento destes termos pode resultar no bloqueio do acesso sem direito a reembolso.
              </p>
            </div>
          </Card>

          {/* Contato */}
          <Card className="p-6 md:p-8 bg-muted/30">
            <h2 className="text-xl font-black text-foreground mb-4 text-center">
              Precisa de ajuda?
            </h2>
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Email:</span> suporte@enemturbo.com.br
              </p>
              <p className="text-sm text-muted-foreground">
                Respondemos em até 24 horas úteis
              </p>
            </div>
          </Card>

          {/* Última atualização */}
          <p className="text-sm text-muted-foreground text-center">
            Última atualização: Outubro de 2025
          </p>
        </div>
      </div>
    </div>
  );
}

import { X, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ComparisonChart() {
  return (
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-md">
            <div className="flex items-center justify-center gap-2 text-red-500">
              <X className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-base md:text-lg font-semibold" data-testid="text-without-label">Estudando Sozinho</span>
            </div>
            <div className="space-y-3">
              <p className="text-xs md:text-sm text-muted-foreground font-medium">Sem organização</p>
              <Progress value={35} className="h-3 md:h-4" data-testid="progress-without" />
              <p className="text-4xl md:text-5xl font-black text-red-500" data-testid="text-without-percentage">35%</p>
              <p className="text-xs text-muted-foreground">de aprovação</p>
            </div>
          </div>
          
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 text-primary">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-base md:text-lg font-semibold" data-testid="text-with-label">Com ENEM Turbo</span>
            </div>
            <div className="space-y-3">
              <p className="text-xs md:text-sm text-muted-foreground font-medium">Com sinopses organizadas</p>
              <Progress value={87} className="h-3 md:h-4 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary" data-testid="progress-with" />
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" data-testid="text-with-percentage">87%</p>
              <p className="text-xs text-muted-foreground">de aprovação</p>
            </div>
          </div>
        </div>
        
        <div className="mt-10 md:mt-16 grid md:grid-cols-2 gap-6 md:gap-12">
          <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 text-center space-y-3 shadow-md">
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Retenção de conteúdo</p>
            <Progress value={40} className="h-3 md:h-4" />
            <p className="text-4xl md:text-5xl font-black text-red-500">40%</p>
          </div>
          
          <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 md:p-8 text-center space-y-3 shadow-lg">
            <p className="text-xs md:text-sm text-muted-foreground font-medium">Retenção com revisão estruturada</p>
            <Progress value={92} className="h-3 md:h-4 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary" />
            <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">92%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

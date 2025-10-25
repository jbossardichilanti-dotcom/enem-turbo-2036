import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, Globe, FlaskConical, PenTool, TrendingUp } from "lucide-react";

const subjects = [
  { 
    name: "Matemática", 
    icon: Calculator,
    color: "bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,45%)] text-white border-[hsl(210,100%,40%)]",
    description: "Álgebra, Geometria, Funções"
  },
  { 
    name: "Linguagens", 
    icon: BookOpen,
    color: "bg-[hsl(270,70%,55%)] hover:bg-[hsl(270,70%,50%)] text-white border-[hsl(270,70%,45%)]",
    description: "Português, Literatura, Inglês"
  },
  { 
    name: "Ciências Humanas", 
    icon: Globe,
    color: "bg-[hsl(25,90%,55%)] hover:bg-[hsl(25,90%,50%)] text-white border-[hsl(25,90%,45%)]",
    description: "História, Geografia, Filosofia"
  },
  { 
    name: "Ciências da Natureza", 
    icon: FlaskConical,
    color: "bg-[hsl(145,70%,45%)] hover:bg-[hsl(145,70%,40%)] text-white border-[hsl(145,70%,35%)]",
    description: "Física, Química, Biologia"
  },
  { 
    name: "Redação", 
    icon: PenTool,
    color: "bg-[hsl(355,85%,55%)] hover:bg-[hsl(355,85%,50%)] text-white border-[hsl(355,85%,45%)]",
    description: "5 Competências + Proposta"
  },
];

export default function SubjectsGrid() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4" data-testid="text-subjects-title">
            Todas as Matérias do ENEM
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-subjects-subtitle">
            Sinopses completas e organizadas para você dominar todos os conteúdos cobrados na prova
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <Button
                key={index}
                className={`${subject.color} font-bold rounded-lg py-8 md:py-10 text-base md:text-lg border-2 shadow-lg hover:shadow-xl transition-all duration-300 h-auto flex-col items-start gap-3 hover:scale-105`}
                data-testid={`button-subject-${subject.name.toLowerCase().replace(/ /g, '-')}`}
              >
                <div className="flex items-center gap-3 w-full">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  <span className="text-xl md:text-2xl">{subject.name}</span>
                </div>
                <span className="text-sm md:text-base opacity-90 font-normal text-left">
                  {subject.description}
                </span>
              </Button>
            );
          })}
        </div>
        
        <div className="text-center px-2 mt-16">
          <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight flex items-center justify-center gap-3" data-testid="text-comparison-title">
            <TrendingUp className="h-8 w-8 text-primary" />
            Aumente sua chance de aprovação com ENEM Turbo
          </h3>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Estudantes que usam sinopses organizadas têm <span className="text-primary font-bold">3x mais chances</span> de alcançar a nota de corte desejada
          </p>
        </div>
      </div>
    </section>
  );
}

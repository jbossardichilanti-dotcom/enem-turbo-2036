import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, BookOpen, Globe, FlaskConical, PenTool, Zap, Book } from "lucide-react";

const subjects = [
  {
    title: "Matemática",
    icon: Calculator,
    color: "hsl(210, 100%, 50%)",
    description: "Funções, Geometria e Estatística",
    topics: ["Função Afim", "Função Quadrática", "Geometria Plana", "PA e PG"],
    curiosity: "40% das questões são de álgebra"
  },
  {
    title: "Linguagens",
    icon: BookOpen,
    color: "hsl(270, 70%, 55%)",
    description: "Interpretação, Literatura e Gramática",
    topics: ["Interpretação de Texto", "Figuras de Linguagem", "Literatura Brasileira"],
    curiosity: "Interpretação vale 60% da prova"
  },
  {
    title: "Ciências Humanas",
    icon: Globe,
    color: "hsl(25, 90%, 55%)",
    description: "História, Geografia, Filosofia e Sociologia",
    topics: ["Brasil Colonial", "Geopolítica", "Filosofia Moderna", "Sociologia Urbana"],
    curiosity: "Temas atuais sempre aparecem"
  },
  {
    title: "Ciências da Natureza",
    icon: FlaskConical,
    color: "hsl(145, 70%, 45%)",
    description: "Física, Química e Biologia",
    topics: ["Energia e Trabalho", "Tabela Periódica", "Ecologia", "Genética"],
    curiosity: "Meio ambiente é tema recorrente"
  },
  {
    title: "Redação",
    icon: PenTool,
    color: "hsl(355, 85%, 55%)",
    description: "5 Competências e Proposta de Intervenção",
    topics: ["Estrutura Dissertativa", "Repertório Sociocultural", "Proposta Completa"],
    curiosity: "Competência 5 elimina mais candidatos"
  }
];

export default function LearningSection() {
  return (
    <section id="conteudo" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4" data-testid="text-learning-title">
            O que você vai dominar
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-learning-subtitle">
            Todo o conteúdo do ENEM em sinopses objetivas e completas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <Card
              key={subject.title}
              className="postit-card p-6 border-2 shadow-md hover:shadow-lg transition-all"
              style={{ borderColor: subject.color }}
              data-testid={`card-subject-${index}`}
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: subject.color }}
                  >
                    <subject.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1" data-testid={`text-subject-title-${index}`}>
                      {subject.title}
                    </h3>
                    <p className="text-xs text-muted-foreground" data-testid={`text-subject-description-${index}`}>
                      {subject.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Book className="h-3 w-3" />
                    Principais tópicos:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {subject.topics.map((topic, topicIndex) => (
                      <Badge
                        key={topicIndex}
                        variant="secondary"
                        className="text-xs font-normal"
                        data-testid={`badge-topic-${index}-${topicIndex}`}
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 text-accent flex-shrink-0 mt-0.5" />
                    <span data-testid={`text-curiosity-${index}`}>{subject.curiosity}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

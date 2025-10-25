import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Julia Santos",
    initials: "JS",
    achievement: "Estudante de Medicina",
    text: "As sinopses do ENEM Turbo estão me salvando! Organizei todo meu cronograma de estudos e já sinto muito mais confiança para a prova!",
    rating: 5
  },
  {
    name: "Pedro Henrique",
    initials: "PH",
    achievement: "Foco em Redação",
    text: "A parte de redação é sensacional! Seguindo o passo a passo da Competência 5, já melhorei muito minhas notas nos simulados!",
    rating: 5
  },
  {
    name: "Beatriz Oliveira",
    initials: "BO",
    achievement: "Estudante de Engenharia",
    text: "Estudava 8 horas por dia sem foco. Com as sinopses organizadas, otimizei meu tempo e estou muito mais preparada para o ENEM 2025!",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4" data-testid="text-testimonials-title">
            Alunos que Confiam
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-testimonials-subtitle">
            Histórias reais de quem está usando ENEM Turbo para conquistar a aprovação em 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-6 bg-card shadow-md hover:shadow-lg transition-all"
              data-testid={`card-testimonial-${index}`}
            >
              <div className="space-y-4">
                <div className="flex gap-1" data-testid={`stars-${index}`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-sm text-foreground leading-relaxed" data-testid={`text-testimonial-${index}`}>
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3 pt-2 border-t">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold text-foreground" data-testid={`text-name-${index}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{testimonial.achievement}</p>
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

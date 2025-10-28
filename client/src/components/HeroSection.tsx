import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GraduationCap, CheckCircle, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { trackInitiateCheckout, trackViewContent } from "@/lib/fbPixel";

const quizQuestions = [
  {
    question: "Como está sua preparação para o ENEM?",
    options: [
      { text: "Acabei de começar a estudar", value: "beginner" },
      { text: "Estudo, mas preciso de mais organização", value: "intermediate" },
      { text: "Faltam poucos meses e preciso revisar tudo", value: "advanced" }
    ]
  },
  {
    question: "Qual sua maior dificuldade?",
    options: [
      { text: "Não sei por onde começar", value: "start" },
      { text: "Esqueço o que estudei", value: "retention" },
      { text: "Falta tempo para estudar tudo", value: "time" }
    ]
  },
  {
    question: "O que você mais precisa?",
    options: [
      { text: "Sinopses organizadas por matéria", value: "synopsis" },
      { text: "Fórmulas e conceitos essenciais", value: "formulas" },
      { text: "Estratégias de estudo eficientes", value: "strategies" }
    ]
  }
];

export default function HeroSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    trackViewContent();
  }, []);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const scrollToInscricao = () => {
    trackInitiateCheckout();
    const element = document.getElementById('inscricao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <section id="inicio" className="gradient-bg pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-white space-y-6">
            <Badge 
              className="bg-white/20 text-white border-white/30 hover-elevate active-elevate-2 backdrop-blur-sm inline-flex items-center gap-2"
              data-testid="badge-promotion"
            >
              <GraduationCap className="h-4 w-4" />
              Aprove no ENEM 2025
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight" data-testid="text-hero-title">
              Estude Menos,<br />Aprenda Mais,<br />Arrase no ENEM
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl" data-testid="text-hero-subtitle">
              Sinopses completas de todas as matérias do ENEM. Revisão rápida e eficiente para você mandar bem na prova!
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Button 
                size="lg" 
                onClick={scrollToInscricao}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base md:text-lg px-8 md:px-12 py-6 md:py-7 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                data-testid="button-cta-hero"
              >
                Garantir Minha Vaga Agora
              </Button>
              
              <div className="flex items-center gap-2 text-white/90 text-sm md:text-base">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">+850 alunos estudando</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 md:p-8 text-white" data-testid="quiz-container">
              {!showResult ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold" data-testid="quiz-progress">
                      Pergunta {currentQuestion + 1} de {quizQuestions.length}
                    </span>
                    <div className="flex gap-1">
                      {quizQuestions.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-8 rounded-full ${
                            index <= currentQuestion ? 'bg-accent' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-6" data-testid="quiz-question">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white justify-start text-left h-auto py-4 px-6 whitespace-normal break-words min-h-[3.5rem]"
                        data-testid={`quiz-option-${index}`}
                      >
                        <span className="block">{option.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black" data-testid="quiz-result-title">
                    Perfeito!
                  </h3>
                  
                  <p className="text-base md:text-lg text-white/90" data-testid="quiz-result-message">
                    Com base nas suas respostas, o <span className="font-bold text-accent">ENEM Turbo 2025</span> é ideal para você! 
                    Material completo para sua aprovação.
                  </p>

                  <div className="space-y-3 pt-4">
                    <Button 
                      size="lg"
                      onClick={scrollToInscricao}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-6 flex items-center justify-center gap-2"
                      data-testid="button-quiz-cta"
                    >
                      <CheckCircle className="h-5 w-5" />
                      Quero garantir agora!
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={resetQuiz}
                      className="w-full text-white/80 hover:text-white hover:bg-white/10"
                      data-testid="button-quiz-reset"
                    >
                      Refazer diagnóstico
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

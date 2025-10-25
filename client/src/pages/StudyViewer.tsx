import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  CheckCircle, 
  Circle,
  Download,
  ChevronRight,
  Lightbulb,
  Video,
  Calculator,
  FileText,
  Lock,
  Loader2
} from "lucide-react";
import { enemGuides, type SynopsisContent } from "@shared/content";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface TokenValidationResponse {
  valid: boolean;
  plan?: string;
  error?: string;
}

export default function StudyViewer() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  // Validar token no backend
  const { data: tokenValidation, isLoading, isError } = useQuery<TokenValidationResponse>({
    queryKey: [`/api/validate-token?token=${token}`],
    enabled: !!token,
    retry: false,
  });

  // Redirecionar se não houver token ou se for inválido
  useEffect(() => {
    if (!token || (isError || (tokenValidation && !tokenValidation.valid))) {
      toast({
        title: "Acesso negado",
        description: "Token de acesso inválido ou ausente. Faça uma compra para acessar o conteúdo.",
        variant: "destructive"
      });
      setLocation('/download');
    }
  }, [token, tokenValidation, isError, setLocation, toast]);

  // Mostrar loading enquanto valida
  if (!token || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-lg font-semibold">Validando acesso...</p>
            <p className="text-sm text-muted-foreground mt-2">Por favor, aguarde</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Bloquear se token inválido
  if (isError || !tokenValidation?.valid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <Lock className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-lg font-semibold">Acesso Negado</p>
            <p className="text-sm text-muted-foreground mt-2">Token inválido ou expirado</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    () => new Set(JSON.parse(localStorage.getItem('completedTopics') || '[]'))
  );

  // Agrupar conteúdo por matéria
  const contentBySubject = useMemo(() => {
    const grouped = new Map<string, SynopsisContent[]>();
    enemGuides.forEach(item => {
      if (!grouped.has(item.subject)) {
        grouped.set(item.subject, []);
      }
      grouped.get(item.subject)!.push(item);
    });
    return grouped;
  }, []);

  // Conteúdo filtrado
  const filteredContent = useMemo(() => {
    let content = enemGuides;

    if (selectedSubject) {
      content = content.filter(item => item.subject === selectedSubject);
      if (selectedArea) {
        content = content.filter(item => item.area === selectedArea);
      }
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      content = content.filter(item => 
        item.subject.toLowerCase().includes(term) ||
        item.area.toLowerCase().includes(term) ||
        item.topics.some(topic => 
          topic.title.toLowerCase().includes(term) ||
          topic.content.toLowerCase().includes(term)
        )
      );
    }

    return content;
  }, [selectedSubject, selectedArea, searchTerm]);

  // Calcular progresso
  const totalTopics = enemGuides.reduce((sum, item) => sum + item.topics.length, 0);
  const progressPercentage = Math.round((completedTopics.size / totalTopics) * 100);

  const toggleTopicComplete = (topicId: string) => {
    const newCompleted = new Set(completedTopics);
    if (newCompleted.has(topicId)) {
      newCompleted.delete(topicId);
    } else {
      newCompleted.add(topicId);
    }
    setCompletedTopics(newCompleted);
    localStorage.setItem('completedTopics', JSON.stringify(Array.from(newCompleted)));
  };

  const getTopicId = (subject: string, area: string, topicTitle: string) => 
    `${subject}-${area}-${topicTitle}`;

  const downloadPDF = () => {
    if (!token) {
      toast({
        title: "Erro",
        description: "Token de download inválido. Por favor, faça uma nova compra.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Download iniciado",
      description: "O arquivo PDF começará a ser baixado em instantes.",
    });
    window.open(`/api/download-synopsis?token=${token}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Gradient */}
      <div className="gradient-bg py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2" data-testid="text-viewer-title">
                ENEM Turbo 2025 - Suas Sinopses
              </h1>
              <p className="text-white/90" data-testid="text-viewer-subtitle">
                Seu material completo para aprovação no ENEM
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={downloadPDF}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              data-testid="button-download-pdf"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </div>

          {/* Progress Bar */}
          <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20" data-testid="card-progress">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">Seu Progresso</span>
                <span className="text-sm font-bold text-white">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-white/80 mt-2">
                {completedTopics.size} de {totalTopics} tópicos concluídos
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card data-testid="card-navigation">
              <CardHeader>
                <CardTitle className="text-lg">Navegação</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="p-4 space-y-2">
                    <Button
                      variant={!selectedSubject ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setSelectedSubject(null);
                        setSelectedArea(null);
                      }}
                      data-testid="button-all-subjects"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Todos os Temas
                    </Button>

                    {Array.from(contentBySubject.entries()).map(([subject, items]) => (
                      <div key={subject}>
                        <Button
                          variant={selectedSubject === subject ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => {
                            setSelectedSubject(subject);
                            setSelectedArea(null);
                          }}
                          data-testid={`button-subject-${subject}`}
                        >
                          <ChevronRight className="w-4 h-4 mr-2" />
                          {subject}
                        </Button>
                        
                        {selectedSubject === subject && (
                          <div className="ml-6 mt-2 space-y-1">
                            {items.map((item) => (
                              <Button
                                key={item.area}
                                variant={selectedArea === item.area ? "secondary" : "ghost"}
                                size="sm"
                                className="w-full justify-start text-xs"
                                onClick={() => setSelectedArea(item.area)}
                                data-testid={`button-area-${item.area}`}
                              >
                                {item.area}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por tema, área ou tópico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
            </div>

            {/* Content Cards */}
            <div className="space-y-6">
              {filteredContent.map((item, itemIndex) => (
                <Card key={itemIndex} className="overflow-hidden" data-testid={`card-content-${itemIndex}`}>
                  <CardHeader className="bg-primary/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="mb-2" data-testid={`badge-subject-${itemIndex}`}>
                          {item.subject}
                        </Badge>
                        <CardTitle className="text-xl" data-testid={`text-area-${itemIndex}`}>
                          {item.area}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {item.topics.map((topic, topicIndex) => {
                        const topicId = getTopicId(item.subject, item.area, topic.title);
                        const isCompleted = completedTopics.has(topicId);

                        return (
                          <div 
                            key={topicIndex} 
                            className="border-l-4 border-primary pl-4 space-y-3"
                            data-testid={`topic-${itemIndex}-${topicIndex}`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" />
                                {topic.title}
                              </h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleTopicComplete(topicId)}
                                className="flex-shrink-0"
                                data-testid={`button-toggle-${itemIndex}-${topicIndex}`}
                              >
                                {isCompleted ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground" />
                                )}
                              </Button>
                            </div>

                            <div className="prose prose-sm max-w-none">
                              <p className="text-foreground whitespace-pre-line">{topic.content}</p>
                            </div>

                            {topic.formulas && (
                              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-2">
                                    <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Fórmulas</p>
                                      <p className="text-sm text-blue-800 dark:text-blue-200 whitespace-pre-line font-mono">
                                        {topic.formulas}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {topic.examples && (
                              <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-2">
                                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Exemplos</p>
                                      <p className="text-sm text-purple-800 dark:text-purple-200 whitespace-pre-line">
                                        {topic.examples}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {topic.tips && (
                              <Card className="bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-2">
                                    <Lightbulb className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="font-semibold text-pink-900 dark:text-pink-100 mb-2">Dica para o ENEM</p>
                                      <p className="text-sm text-pink-800 dark:text-pink-200 whitespace-pre-line">
                                        {topic.tips}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {topic.videoLinks && (
                              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-2">
                                    <Video className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Vídeos</p>
                                      <p className="text-sm text-blue-800 dark:text-blue-200 whitespace-pre-line">
                                        {topic.videoLinks}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredContent.length === 0 && (
                <Card data-testid="card-no-results">
                  <CardContent className="p-12 text-center">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Nenhum resultado encontrado
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tente usar outros termos de busca
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

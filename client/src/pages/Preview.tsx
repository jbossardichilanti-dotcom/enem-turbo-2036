import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Search, BookOpen, Lightbulb, Globe, FlaskConical, PenTool, Video } from "lucide-react";
import { enemGuides } from "@shared/content";

const subjectIcons: Record<string, any> = {
  "Matemática": Calculator,
  "Linguagens": BookOpen,
  "Ciências Humanas": Globe,
  "Ciências da Natureza": FlaskConical,
  "Redação": PenTool
};

const subjectColors: Record<string, string> = {
  "Matemática": "bg-blue-500",
  "Linguagens": "bg-purple-500",
  "Ciências Humanas": "bg-orange-500",
  "Ciências da Natureza": "bg-green-500",
  "Redação": "bg-red-500"
};

export default function Preview() {
  const [selectedSubject, setSelectedSubject] = useState<string>("Matemática");
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = Array.from(new Set(enemGuides.map(item => item.subject)));
  
  const filteredContent = enemGuides.filter(item => {
    const matchesSubject = item.subject === selectedSubject;
    const matchesSearch = searchQuery === "" || 
      item.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-bg py-12">
        <div className="container mx-auto max-w-7xl px-4 text-center text-white">
          <BookOpen className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-black mb-4" data-testid="text-preview-title">
            Conteúdo Completo ENEM Turbo 2025
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto" data-testid="text-preview-subtitle">
            Explore todo o material do ENEM com fórmulas, exercícios e dicas práticas para sua aprovação
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por tema, tópico ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-content"
            />
          </div>
        </div>

        {/* Subject Tabs */}
        <Tabs value={selectedSubject} onValueChange={setSelectedSubject} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8" data-testid="tabs-subjects">
            {subjects.map((subject) => {
              const Icon = subjectIcons[subject] || BookOpen;
              const count = enemGuides.filter(item => item.subject === subject).reduce((acc, item) => acc + item.topics.length, 0);
              return (
                <TabsTrigger key={subject} value={subject} className="gap-2" data-testid={`tab-${subject.toLowerCase().replace(/\s/g, '-')}`}>
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{subject}</span>
                  <Badge variant="secondary" className="ml-1">{count}</Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {subjects.map((subject) => (
            <TabsContent key={subject} value={subject} className="space-y-6">
              {filteredContent.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Nenhum conteúdo encontrado para "{searchQuery}"</p>
                  </CardContent>
                </Card>
              ) : (
                filteredContent.map((area, areaIdx) => (
                  <Card key={areaIdx} className="hover-elevate" data-testid={`card-area-${areaIdx}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${subjectColors[subject]}`} />
                            {area.area}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {area.topics.length} tópico{area.topics.length !== 1 ? 's' : ''} detalhado{area.topics.length !== 1 ? 's' : ''}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {area.topics.map((topic, topicIdx) => (
                        <div key={topicIdx} className="space-y-4 pb-6 border-b last:border-b-0" data-testid={`topic-${topicIdx}`}>
                          {/* Título do Tópico */}
                          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-primary" />
                            {topic.title}
                          </h3>

                          {/* Conteúdo Principal */}
                          <div className="prose prose-sm max-w-none">
                            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                              {topic.content}
                            </p>
                          </div>

                          {/* Fórmulas */}
                          {topic.formulas && (
                            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                              <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                                <Calculator className="w-4 h-4" /> Fórmulas Importantes
                              </h4>
                              <pre className="text-xs font-mono text-blue-900 dark:text-blue-200 whitespace-pre-line">
                                {topic.formulas}
                              </pre>
                            </div>
                          )}

                          {/* Exemplos */}
                          {topic.examples && (
                            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-md p-4">
                              <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> Exemplos Práticos
                              </h4>
                              <p className="text-sm text-purple-900 dark:text-purple-200 whitespace-pre-line">
                                {topic.examples}
                              </p>
                            </div>
                          )}

                          {/* Dicas */}
                          {topic.tips && (
                            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md p-4">
                              <h4 className="text-sm font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" /> Dica para o ENEM
                              </h4>
                              <p className="text-sm text-green-900 dark:text-green-200 italic whitespace-pre-line">
                                {topic.tips}
                              </p>
                            </div>
                          )}

                          {/* Videoaulas */}
                          {topic.videoLinks && (
                            <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-md p-4">
                              <h4 className="text-sm font-bold text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-2">
                                <Video className="w-4 h-4" /> Vídeos Recomendados
                              </h4>
                              <p className="text-sm text-orange-900 dark:text-orange-200">
                                {topic.videoLinks}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

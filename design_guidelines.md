# ENEM Turbo 2025 - Design Guidelines

## Design Approach
**Educacional & Motivacional**: Landing page otimizada para conversão com estética educacional moderna e profissional, inspirada em plataformas de ensino de alto impacto com elementos motivacionais e cores vibrantes focadas em aprendizagem.

## Core Design Elements

### Color Palette

**Primary Colors:**
- Education Blue (Primary): 210 100% 50% (azul vibrante educacional)
- Success Green (accents): 145 70% 45% (verde aprovação)
- Energy Orange (CTAs): 25 95% 55% (laranja energia/ação)
- Deep Blue: 220 80% 35% (azul profundo confiança)

**Neutral Colors:**
- Background Light: 210 20% 98%
- Text Dark: 220 20% 15%
- Card White: 0 0% 100%
- Border Gray: 220 15% 88%

**Subject Colors (Matérias do ENEM):**
Use cores distintas e vibrantes para cada matéria:
- Matemática: Azul royal (210 100% 50%)
- Linguagens: Roxo (270 70% 55%)
- Ciências Humanas: Laranja (25 90% 55%)
- Ciências da Natureza: Verde (145 70% 45%)
- Redação: Vermelho coral (355 85% 55%)

### Typography

**Fonts:**
- Primary: 'Poppins' (weights: 400, 600, 700, 800, 900)
- Secondary: 'Inter' para textos longos (weights: 400, 500, 600)

**Hierarchy:**
- Hero Title: 900 weight, 4xl-6xl size, "ENEM TURBO 2025"
- Section Titles: 800 weight, 3xl-4xl size
- Subtitle/Benefits: 600 weight, xl-2xl size
- Body Text: 400 weight, base-lg size
- CTA Buttons: 700 weight, lg size

### Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24 (py-20 para sections, gap-6 para grids, p-8 para cards)

**Container:** max-w-7xl centered com px-4

**Grid Patterns:**
- Matérias: grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4
- Depoimentos: grid-cols-1 md:grid-cols-3 gap-6
- Benefícios: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

## Component Specifications

### Hero Section
- Full-width gradient background (blue-to-teal diagonal ou azul sólido com overlay)
- Centered layout com max-w-5xl
- Título "ENEM TURBO 2025" em branco, ultra-bold, com sombra sutil
- Subtítulo motivacional em branco/90% opacity: "Estude Menos, Aprenda Mais, Arrase no ENEM"
- Imagem do produto (sinopses/materiais) centralizada ou à direita
- CTA laranja vibrante destacado "QUERO GARANTIR MINHA VAGA"
- Badge "X pessoas compraram hoje" flutuante com pulse animation
- Elementos visuais: ícones de graduação, troféu, livros

### Seção Problema/Solução
- Background branco/cinza muito claro
- Título centralizado em azul escuro: "Cansado de estudar sem resultados?"
- Lista de dores comuns dos estudantes (bulletpoints com ícones X vermelhos)
- Transição para solução com ícones de check verde
- Espaçamento generoso (py-20)

### Grid de Matérias
- Background claro com leve gradiente
- Cards coloridos com shadow-lg
- Cada matéria com cor única e ícone representativo
- Hover: scale 105%, shadow aumentado, brightness 110%
- Layout responsivo (2 cols mobile, 3 tablet, 5 desktop)
- Texto branco bold sobre fundo colorido

### Seção de Benefícios/O Que Você Vai Aprender
- Cards brancos com borda colorida e ícone
- Ícones lucide-react (BookOpen, Target, TrendingUp, Award, etc.)
- Título do benefício em bold
- Descrição breve
- Layout grid 3 colunas (1 em mobile)

### Gráficos de Comparação
- Dois elementos lado a lado
- Esquerda: "Estudando Sozinho" - 35% de aprovação (vermelho/laranja)
- Direita: "Com ENEM Turbo" - 87% de aprovação (verde)
- Números grandes e bold com animação de progresso
- Barras ou círculos de progresso

### Card de Oferta/Planos
- Background branco com shadow-2xl e border sutil azul
- Planos em cards side-by-side ou stacked
- Destaque visual no plano "mais popular" (badge, border colorida)
- Preços grandes: R$ 47,00 / R$ 97,00 / R$ 147,00
- Lista de itens inclusos com check verde
- CTA laranja full-width "GARANTIR ACESSO AGORA"
- Badge "Oferta Limitada" ou "Últimas Vagas"
- Countdown timer opcional

### Depoimentos
- Cards brancos com shadow-md
- Foto circular do estudante ou inicial colorida
- 5 estrelas amarelas no topo
- Texto do depoimento em aspas ou itálico
- Nome, idade, nota/aprovação do aluno
- Layout grid 3 colunas (1 em mobile)

### Preview dos Materiais
- Screenshots ou mockups dos PDFs/sinopses
- Imagem de laptop ou tablet mostrando conteúdo
- Alternância esquerda/direita para criar ritmo visual
- Background com gradiente sutil azul/verde

### CTAs Repetidos
- Background laranja vibrante (25 95% 55%)
- Texto branco bold "COMEÇAR A ESTUDAR AGORA" ou similar
- Ícone de foguete/troféu/check
- Rounded-lg, shadow-xl
- Hover: brightness 110%, scale 102%
- Posicionados: hero, após problema, após benefícios, após planos, pré-footer

### Badge de Garantia
- Ícone de escudo ou selo
- "7 Dias de Garantia Incondicional"
- Cor verde ou azul
- Posicionado próximo aos CTAs principais

### Footer
- Background azul escuro (220 80% 20%)
- Texto centralizado branco/80%
- "© 2025 ENEM Turbo - Todos os direitos reservados"
- Links mínimos (Termos, Privacidade)

## Images Strategy

**Hero Image:** 
- Mockup 3D de materiais de estudo empilhados
- Estudante feliz com laptop/tablet
- Certificado ou diploma simbólico

**Preview Images:** 
- Screenshots de PDFs de sinopses
- Mockup de tablet/laptop com conteúdo
- Gráficos e fórmulas destacados

**Depoimentos:** 
- Fotos de estudantes (ou avatares/iniciais coloridas)

**Ícones:**
- Matérias: BookOpen, Calculator, Globe, Flask, PenTool
- Benefícios: Target, TrendingUp, Award, Check, Star, Zap

**Placeholders:** Use URLs configuráveis ou cores sólidas

## Animations & Interactions

- Pulse animation no badge "X pessoas compraram"
- Countdown timer com animação de dígitos
- Hover scale (105%) nos cards de matérias
- Scroll-triggered fade-in para depoimentos e estatísticas
- Progress bars animadas nos gráficos de comparação
- Smooth scroll para CTAs
- Nenhuma animação excessiva que distraia do conteúdo

## Accessibility & Performance

- Alto contraste texto/fundo (WCAG AA mínimo)
- Botões com área clicável mínima 44x44px
- Labels descritivos e alt text em imagens
- Carregamento rápido (imagens otimizadas)
- Mobile-first responsive design

## Conversion Optimization

- CTAs visíveis e repetidos (mínimo 4 na página)
- Prova social constante (depoimentos, números, badges)
- Urgência e escassez (countdown, "últimas vagas")
- Garantia destacada (reduz risco percebido)
- Linguagem motivacional e orientada a resultados
- Foco em benefícios, não apenas recursos

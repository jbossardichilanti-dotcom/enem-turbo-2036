export interface SynopsisContent {
  subject: string;
  area: string;
  topics: {
    title: string;
    content: string;
    examples?: string;
    formulas?: string;
    tips?: string;
    videoLinks?: string;
  }[];
}

export function getFullSynopsis(): SynopsisContent[] {
  return enemGuides;
}

export const enemGuides: SynopsisContent[] = [
  {
    subject: "Matemática",
    area: "Álgebra e Funções",
    topics: [
      {
        title: "Função Afim",
        content: "A função afim é uma das funções mais importantes do ENEM. Ela representa uma relação linear entre duas grandezas.\n\nForma Geral: f(x) = ax + b\n\nOnde:\n- a = coeficiente angular (taxa de variação)\n- b = coeficiente linear (valor quando x = 0)\n\nCaracterísticas:\n- Gráfico é sempre uma reta\n- Se a > 0: função crescente\n- Se a < 0: função decrescente\n- Se a = 0: função constante\n\nZero da Função:\nValor de x onde f(x) = 0\nax + b = 0\nx = -b/a",
        examples: "EXEMPLO 1: f(x) = 2x + 3\n- Coeficiente angular: a = 2 (crescente)\n- Coeficiente linear: b = 3\n- Zero da função: -3/2\n\nEXEMPLO 2 (ENEM): Um táxi cobra R$ 4,50 de bandeirada + R$ 2,50 por km rodado.\nFunção: C(x) = 2,50x + 4,50",
        formulas: "f(x) = ax + b\nZero: x = -b/a\nCoeficiente angular: a = (y2 - y1)/(x2 - x1)",
        tips: "DICA DE OURO: No ENEM, funções afim aparecem em problemas do dia a dia. Identifique o que é fixo (coeficiente linear) e o que varia (coeficiente angular)!",
      },
      {
        title: "Função Quadrática",
        content: "A função quadrática aparece frequentemente no ENEM em problemas de otimização e movimento.\n\nForma Geral: f(x) = ax² + bx + c (a ≠ 0)\n\nGráfico: Parábola\n- Se a > 0: concavidade para cima (U)\n- Se a < 0: concavidade para baixo (∩)\n\nVértice da Parábola:\nPonto máximo ou mínimo\nxv = -b/2a\nyv = -Δ/4a\n\nDelta (Δ):\nΔ = b² - 4ac\n- Se Δ > 0: duas raízes reais distintas\n- Se Δ = 0: uma raiz real (raiz dupla)\n- Se Δ < 0: nenhuma raiz real\n\nRaízes (Fórmula de Bhaskara):\nx = (-b ± √Δ)/2a",
        examples: "EXEMPLO ENEM: Uma empresa vende x produtos por mês. O lucro é dado por L(x) = -2x² + 120x - 1000\n\nPara máximo lucro:\nxv = -120/(2·(-2)) = 30 produtos\nLucro máximo: L(30) = R$ 800",
        formulas: "f(x) = ax² + bx + c\nΔ = b² - 4ac\nx = (-b ± √Δ)/2a\nxv = -b/2a\nyv = -Δ/4a",
        tips: "MACETE: Para encontrar o ponto de lucro/área máxima, calcule o vértice! O ENEM adora questões de otimização com funções quadráticas.",
      },
      {
        title: "Progressão Aritmética (PA)",
        content: "Sequência numérica onde a diferença entre termos consecutivos é constante.\n\nRazão: r = an - an-1\n\nTermo Geral:\nan = a1 + (n-1)·r\n\nOnde:\n- an = termo procurado\n- a1 = primeiro termo\n- n = posição do termo\n- r = razão\n\nSoma dos n primeiros termos:\nSn = n·(a1 + an)/2\n\nou\n\nSn = n·[2a1 + (n-1)·r]/2",
        examples: "EXEMPLO: PA (3, 7, 11, 15, ...)\n- a1 = 3\n- r = 4\n- a20 = 3 + (20-1)·4 = 79\n- S20 = 20·(3 + 79)/2 = 820",
        formulas: "an = a1 + (n-1)·r\nSn = n·(a1 + an)/2",
        tips: "ATENÇÃO: Cuidado com n-1! Se for o 10º termo, use n = 10, mas multiplique r por 9!",
      }
    ]
  },
  {
    subject: "Matemática",
    area: "Geometria",
    topics: [
      {
        title: "Áreas de Figuras Planas",
        content: "Cálculo de áreas é questão garantida no ENEM!\n\nPrincipais Fórmulas:\n\nQUADRADO:\nÁrea = l²\nPerímetro = 4l\n\nRETÂNGULO:\nÁrea = base × altura\nPerímetro = 2(base + altura)\n\nTRIÂNGULO:\nÁrea = (base × altura)/2\n\nCÍRCULO:\nÁrea = πr²\nPerímetro (circunferência) = 2πr\n\nTRAPÉZIO:\nÁrea = [(Base maior + Base menor) × altura]/2\n\nLOSANGO:\nÁrea = (Diagonal maior × Diagonal menor)/2",
        examples: "QUESTÃO TÍPICA ENEM:\nUm terreno retangular tem 15m de frente e 25m de fundo. Quanto de grama é necessário para cobri-lo?\n\nÁrea = 15 × 25 = 375 m²",
        formulas: "Quadrado: A = l²\nRetângulo: A = b·h\nTriângulo: A = (b·h)/2\nCírculo: A = πr²\nTrapézio: A = [(B+b)·h]/2",
        tips: "DICA: O ENEM adora misturar unidades (m², cm², hectares). Sempre converta para a mesma unidade antes de calcular!",
      },
      {
        title: "Teorema de Pitágoras",
        content: "Em todo triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.\n\na² = b² + c²\n\nOnde:\n- a = hipotenusa (lado oposto ao ângulo de 90°)\n- b e c = catetos\n\nTriângulos Pitagóricos Comuns:\n- 3, 4, 5\n- 5, 12, 13\n- 8, 15, 17\n- 7, 24, 25\n\nConhecer esses triângulos economiza tempo na prova!",
        examples: "EXEMPLO: Uma escada de 5m está apoiada numa parede, com o pé distante 3m da parede. Qual a altura alcançada?\n\nh² = 5² - 3²\nh² = 25 - 9 = 16\nh = 4 metros",
        formulas: "a² = b² + c²",
        tips: "MACETE: Memorize os triângulos 3-4-5 e 5-12-13. No ENEM, eles aparecem com frequência multiplicados (6-8-10, 10-24-26, etc.)!",
      },
      {
        title: "Volume de Sólidos",
        content: "Cálculo de volumes é essencial para questões de capacidade, recipientes e reservatórios.\n\nCUBO:\nV = a³\n\nPARALELEPÍPEDO:\nV = comprimento × largura × altura\n\nCILINDRO:\nV = πr²h\n\nCONE:\nV = (πr²h)/3\n\nESFERA:\nV = (4πr³)/3\n\nPIRÂMIDE:\nV = (Abase × h)/3",
        examples: "EXEMPLO ENEM: Uma caixa d'água cilíndrica tem 2m de raio e 3m de altura. Quantos litros cabem?\n\nV = π·2²·3 = 12π m³\nV ≈ 37,7 m³ = 37.700 litros",
        formulas: "Cubo: V = a³\nParalelepípedo: V = c·l·a\nCilindro: V = πr²h\nCone: V = (πr²h)/3\nEsfera: V = (4πr³)/3",
        tips: "CONVERSÃO IMPORTANTE: 1 m³ = 1000 litros. O ENEM adora pedir a resposta em litros!",
      }
    ]
  },
  {
    subject: "Linguagens",
    area: "Interpretação de Textos",
    topics: [
      {
        title: "Identificação de Tema e Ideia Central",
        content: "A competência mais cobrada em Linguagens é a interpretação textual.\n\nPasso a Passo:\n\n1. LEIA O ENUNCIADO PRIMEIRO\nSaber o que a questão pede direciona sua leitura\n\n2. IDENTIFIQUE O GÊNERO TEXTUAL\n- Artigo de opinião: tese + argumentos\n- Notícia: quem, o quê, quando, onde, por quê\n- Poema: linguagem conotativa, figuras de linguagem\n- Tirinha/charge: crítica social, ironia\n\n3. GRIFE PALAVRAS-CHAVE\nSubstantivos, verbos de ação, conectivos importantes\n\n4. IDENTIFIQUE A TESE/IDEIA PRINCIPAL\nGeralmente no 1º ou último parágrafo\n\n5. CUIDADO COM PEGADINHAS\n- Generalizações indevidas\n- Inversão de causa e consequência\n- Mudança sutil de sentido",
        examples: "DICA DE ANÁLISE:\n\nTEXTO: 'Apesar dos avanços tecnológicos, a desigualdade social persiste.'\n\nERRADO: 'A tecnologia aumenta a desigualdade'\nCERTO: 'A tecnologia não eliminou a desigualdade'",
        tips: "OURO: Nunca escolha alternativas com 'sempre', 'nunca', 'todo', 'nenhum'. O ENEM prefere nuances!",
      },
      {
        title: "Figuras de Linguagem",
        content: "Recursos que tornam a linguagem mais expressiva.\n\nPRINCIPAIS FIGURAS:\n\nMETÁFORA: Comparação implícita\n'Meu coração é um balde despejado'\n\nCOMPARAÇÃO: Comparação explícita (com 'como')\n'Ela é linda como uma flor'\n\nMETONÍMIA: Substituição de termos relacionados\n'Li Machado de Assis' (obra pelo autor)\n\nPERSONIFICAÇÃO: Atribuir características humanas\n'O vento sussurrava segredos'\n\nHIPÉRBOLE: Exagero intencional\n'Chorei rios de lágrimas'\n\nANTÍTESE: Oposição de ideias\n'O ódio e o amor caminham juntos'\n\nIRONIA: Dizer o contrário do que se pensa\n'Que educado!' (para alguém grosseiro)",
        examples: "QUESTÃO TÍPICA:\n\n'O silêncio gritava na sala vazia.'\n\nFiguras presentes:\n- Personificação (silêncio grita)\n- Paradoxo (silêncio × gritar)",
        tips: "MACETE: Metáfora é comparação SEM 'como'. Comparação é COM 'como'. Fácil de diferenciar!",
      }
    ]
  },
  {
    subject: "Redação",
    area: "Estrutura e Competências",
    topics: [
      {
        title: "As 5 Competências do ENEM",
        content: "Entender as competências é essencial para atingir nota máxima.\n\nCOMPETÊNCIA 1: Domínio da norma padrão (200 pontos)\n- Sem erros gramaticais graves\n- Concordância, regência, crase, pontuação\n\nCOMPETÊNCIA 2: Compreender o tema (200 pontos)\n- Não fugir ou tangenciar o tema\n- Desenvolver o tema proposto\n\nCOMPETÊNCIA 3: Seleção e argumentação (200 pontos)\n- Argumentos consistentes e bem fundamentados\n- Repertório sociocultural (citações, dados, exemplos)\n\nCOMPETÊNCIA 4: Coesão textual (200 pontos)\n- Uso correto de conectivos\n- Articulação entre parágrafos e ideias\n\nCOMPETÊNCIA 5: Proposta de intervenção (200 pontos)\n- Detalhada (5 elementos)\n- Respeito aos direitos humanos",
        examples: "PROPOSTA COMPLETA (5 elementos):\n\nAGENTE: Ministério da Educação\nAÇÃO: implementar aulas de educação digital\nMODO/MEIO: por meio de capacitação de professores\nFINALIDADE: a fim de reduzir a desinformação\nDETALHAMENTO: com foco em identificação de fake news",
        tips: "ATENÇÃO: A Competência 5 é a que mais reprova! Decore os 5 elementos e sempre inclua todos!",
      },
      {
        title: "Estrutura do Texto Dissertativo",
        content: "Seu texto DEVE ter 4 parágrafos bem definidos.\n\nINTRODUÇÃO (7-8 linhas):\n- Contextualização (repertório)\n- Apresentação do tema\n- Tese (sua opinião sobre o tema)\n\nDESENVOLVIMENTO 1 (7-8 linhas):\n- Tópico frasal (argumento 1)\n- Desenvolvimento com repertório\n- Fechamento do argumento\n\nDESENVOLVIMENTO 2 (7-8 linhas):\n- Tópico frasal (argumento 2)\n- Desenvolvimento com repertório\n- Fechamento do argumento\n\nCONCLUSÃO (7-8 linhas):\n- Retomada da tese\n- Proposta de intervenção completa (5 elementos)\n\nTOTAL: 28-32 linhas",
        examples: "MODELO DE INTRODUÇÃO:\n\n[Repertório] + [Relação com tema] + [Tese]\n\n'No filme Matrix, a humanidade vive uma ilusão digital. Similarmente, na sociedade contemporânea brasileira, as fake news criam uma realidade distorcida que ameaça a democracia.'",
        tips: "OURO: Escreva a conclusão primeiro! Assim você garante os 200 pontos da Competência 5 mesmo se o tempo acabar.",
      },
      {
        title: "Repertório Sociocultural",
        content: "Repertório é FUNDAMENTAL para pontuar bem na Competência 3.\n\nO QUE VALE COMO REPERTÓRIO:\n✓ Citações de filósofos, sociólogos, pensadores\n✓ Dados estatísticos e pesquisas\n✓ Filmes, livros, músicas (com análise crítica)\n✓ Fatos históricos\n✓ Alusões mitológicas\n✓ Conceitos de teorias (Panóptico de Foucault, etc.)\n\nO QUE NÃO VALE:\n✗ Senso comum\n✗ Exemplos pessoais\n✗ Repertório decorado sem relação com o tema\n\nREPERTÓRIOS CORINGAS:\n\n1. 'Segundo o sociólogo Zygmunt Bauman...'\n(modernidade líquida, relações frágeis)\n\n2. 'Conforme a Constituição Federal de 1988...'\n(direitos fundamentais)\n\n3. 'De acordo com dados do IBGE...'\n(sempre útil para questões sociais)\n\n4. 'O filósofo John Locke afirmava que...'\n(contrato social, papel do Estado)",
        examples: "EXEMPLO DE USO:\n\nTEMA: Desafios da educação no Brasil\n\nREPERTÓRIO BOM:\n'Segundo Paulo Freire, a educação é um ato político. Nesse sentido, o sucateamento das escolas públicas revela uma escolha política de manter desigualdades.'\n\nREPERTÓRIO RUIM:\n'A educação é importante. Eu vi na minha escola que faltam professores.'",
        tips: "ESTRATÉGIA: Tenha 5-7 repertórios coringas decorados que se encaixam em vários temas. Bauman, Constituição e Paulo Freire funcionam para quase tudo!",
      }
    ]
  },
  {
    subject: "Ciências Humanas",
    area: "História do Brasil",
    topics: [
      {
        title: "Escravidão e Abolição",
        content: "Um dos temas mais cobrados no ENEM, relacionado a direitos humanos e desigualdade.\n\nPERÍODO COLONIAL (1500-1822):\n- Escravidão indígena inicial\n- Transição para escravidão africana\n- Tráfico negreiro (Triângulo Atlântico)\n- Resistência: quilombos (Palmares)\n\nPROCESSO DE ABOLIÇÃO:\n\n1850 - Lei Eusébio de Queirós\n(Proibiu tráfico negreiro)\n\n1871 - Lei do Ventre Livre\n(Filhos de escravos nasciam livres)\n\n1885 - Lei dos Sexagenários\n(Liberdade aos 60 anos - ineficaz)\n\n1888 - Lei Áurea\n(Abolição total, sem indenização)\n\nCONSEQUÊNCIAS:\n- Sem políticas de integração\n- Marginalização social e econômica\n- Racismo estrutural até hoje",
        examples: "QUESTÃO TÍPICA ENEM:\n\nRelaciona abolição tardia → ausência de políticas públicas → desigualdade racial atual\n\nResposta: Legado da escravidão explica desigualdades contemporâneas",
        tips: "IMPORTANTE: O ENEM sempre relaciona processos históricos com atualidade. Pense nas consequências de longo prazo!",
      },
      {
        title: "Ditadura Militar (1964-1985)",
        content: "Período autoritário essencial para compreender democracia e direitos.\n\nCAUSAS DO GOLPE:\n- Guerra Fria (medo do comunismo)\n- Crise política e econômica\n- Pressão de elites conservadoras\n- Apoio dos EUA\n\nGOVERNOS:\n\n1964-1967: Castello Branco\n- AI-1 e AI-2 (cassações)\n- Bipartidarismo (ARENA x MDB)\n\n1967-1969: Costa e Silva\n- AI-5 (1968) - endurecimento máximo\n- Censura total\n\n1969-1974: Médici\n- 'Anos de chumbo'\n- Tortura sistemática\n- 'Milagre econômico'\n\n1974-1979: Geisel\n- Abertura 'lenta e gradual'\n\n1979-1985: Figueiredo\n- Lei da Anistia (1979)\n- Diretas Já (1984)\n- Fim da ditadura (1985)\n\nRESISTÊNCIA:\n- Guerrilhas urbanas e rurais\n- Movimento estudantil\n- Canções de protesto (Chico Buarque, Geraldo Vandré)",
        examples: "INTERPRETAÇÃO ENEM:\n\nCanção 'Cálice' (Chico Buarque):\n'Cálice' = 'Cale-se'\nCrítica velada à censura",
        tips: "ATENÇÃO: O ENEM cobra a relação entre ditadura e direitos humanos. Sempre mencione censura, tortura e falta de liberdade.",
      }
    ]
  },
  {
    subject: "Ciências da Natureza",
    area: "Física",
    topics: [
      {
        title: "Cinemática - Movimento Uniforme",
        content: "Movimento com velocidade constante (sem aceleração).\n\nFÓRMULA FUNDAMENTAL:\nS = S0 + vt\n\nOnde:\n- S = posição final (m)\n- S0 = posição inicial (m)\n- v = velocidade (m/s)\n- t = tempo (s)\n\nVELOCIDADE MÉDIA:\nVm = ΔS/Δt = (Sf - Si)/(tf - ti)\n\nCONVERSÕES IMPORTANTES:\nkm/h → m/s: dividir por 3,6\nm/s → km/h: multiplicar por 3,6",
        examples: "EXEMPLO: Um carro a 72 km/h viaja por 20 minutos. Qual a distância?\n\n1) Converter: 72 km/h = 20 m/s\n2) Converter: 20 min = 1200 s\n3) S = 0 + 20·1200 = 24.000 m = 24 km",
        formulas: "S = S0 + vt\nVm = ΔS/Δt",
        tips: "MACETE: Para converter km/h para m/s, divida por 3,6. Para voltar, multiplique por 3,6!",
      },
      {
        title: "Energia e Trabalho",
        content: "Conceitos fundamentais de energia aparecem em todo ENEM.\n\nENERGIA CINÉTICA (movimento):\nEc = (mv²)/2\n\nENERGIA POTENCIAL GRAVITACIONAL:\nEpg = mgh\n\nOnde:\n- m = massa (kg)\n- v = velocidade (m/s)\n- g = gravidade (10 m/s²)\n- h = altura (m)\n\nTRABALHO:\nW = F·d·cos θ\n\nTEOREMA DA ENERGIA CINÉTICA:\nW = ΔEc\n\nCONSERVAÇÃO DE ENERGIA:\nEm sistemas isolados, energia total se conserva\nEcinética + Epotencial = constante",
        examples: "EXEMPLO: Um objeto de 2 kg cai de 5 m. Qual a velocidade ao chegar no chão?\n\nEpg inicial = Ec final\nmgh = (mv²)/2\ngh = v²/2\nv² = 2gh = 2·10·5 = 100\nv = 10 m/s",
        formulas: "Ec = (mv²)/2\nEpg = mgh\nW = F·d",
        tips: "CONSERVAÇÃO: Se não há atrito, a energia mecânica total permanece constante. Use isso para resolver questões rapidamente!",
      }
    ]
  },
  {
    subject: "Ciências da Natureza",
    area: "Química",
    topics: [
      {
        title: "Tabela Periódica e Propriedades",
        content: "A Tabela Periódica organiza os elementos químicos.\n\nORGANIZAÇÃO:\n- Períodos: linhas horizontais (7 períodos)\n- Famílias/Grupos: colunas verticais (18 grupos)\n\nGRUPOS IMPORTANTES:\n\nGrupo 1: Metais Alcalinos (Li, Na, K)\n- Muito reativos\n- 1 elétron na camada de valência\n\nGrupo 2: Metais Alcalino-Terrosos (Mg, Ca)\n- 2 elétrons na camada de valência\n\nGrupo 17: Halogênios (F, Cl, Br, I)\n- Muito reativos\n- 7 elétrons na camada de valência\n\nGrupo 18: Gases Nobres (He, Ne, Ar)\n- Não reativos (estáveis)\n- 8 elétrons na camada de valência\n\nPROPRIEDADES PERIÓDICAS:\n\nRAIO ATÔMICO:\nAumenta: ← e ↓\n\nENERGIA DE IONIZAÇÃO:\nAumenta: → e ↑\n\nELETRONEGATIVIDADE:\nAumenta: → e ↑\n(Flúor é o mais eletronegativo)",
        examples: "COMPARAÇÃO:\n\nNa vs Cl:\n- Na: menor eletronegatividade (perde elétron)\n- Cl: maior eletronegatividade (ganha elétron)\n- Ligação: iônica (NaCl - sal)",
        tips: "DECOREBA ÚTIL: Fila de NOBres CaBeÇudos (F O N Br Cl S) são os mais eletronegativos!",
      }
    ]
  }
];

import { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 1,
    phase: "Fase 1: As 4 Dimensões do Gerenciamento de Serviço",
    context: "Bem-vindo à TechVanguard, Diretor! O conselho quer lançar o novo 'App de Entregas Plus' em 2 semanas. A equipe de desenvolvimento está frenética focando apenas em codificar a tecnologia, mas você nota que esqueceram de treinar o suporte e de revisar o contrato da nuvem.",
    question: "Como Diretor de TI aplicando a ITIL 4, o que você deve fazer para garantir o sucesso?",
    options: [
      { id: "A", text: "Focar em garantir que o código (Tecnologia) esteja perfeito. A nuvem e o suporte se resolvem depois.", isCorrect: false, impact: { efficiency: 5, csat: -20, budget: 0 } },
      { id: "B", text: "Convocá-los para revisar o lançamento sob as 4 Dimensões (Organizações e Pessoas, Inf. e Tecnologia, Parceiros, Fluxos e Processos).", isCorrect: true, impact: { efficiency: 15, csat: 10, budget: -5 } },
      { id: "C", text: "Contratar o dobro de desenvolvedores (Pessoas) e ignorar os processos para entregar a tempo.", isCorrect: false, impact: { efficiency: -5, csat: 0, budget: -25 } },
      { id: "D", text: "Terceirizar imediatamente toda a operação (Parceiros e Fornecedores) para tirar a pressão interna.", isCorrect: false, impact: { efficiency: -10, csat: -10, budget: -20 } }
    ],
    explanation: "✅ O correto é integrar as 4 Dimensões do Gerenciamento de Serviço. Na ITIL 4, focar em uma única dimensão (ex: apenas tecnologia) falha em entregar valor. Uma abordagem holística sobre Pessoas/Organização, Informação/Tecnologia, Parceiros/Fornecedores e Valor/Processos é mandatória."
  },
  {
    id: 2,
    phase: "Fase 1: Definição de Valor e Co-criação",
    context: "O CEO enviou um email reclamando: 'A TI é um centro de custo. Vocês precisam apenas nos entregar o software pronto e nós decidimos o que fazer. O sistema anterior não trouxe valor nenhum.'",
    question: "Como você responde, corrigindo a perspectiva do CEO sobre 'Valor' segundo a ITIL 4?",
    options: [
      { id: "A", text: "Valor é definido exclusivamente pelos SLAs técnicos que a TI entrega para o negócio.", isCorrect: false, impact: { efficiency: 0, csat: -15, budget: 0 } },
      { id: "B", text: "Valor é transferido unilateralmente do provedor (TI) para o consumidor (Negócio). O provedor é o único responsável.", isCorrect: false, impact: { efficiency: -10, csat: -10, budget: 0 } },
      { id: "C", text: "Valor é a utilidade e garantia combinadas, e só pode ser entregue se custar pouco.", isCorrect: false, impact: { efficiency: 0, csat: 0, budget: 5 } },
      { id: "D", text: "Valor é ativamente co-criado através da nossa colaboração (mútua). A TI e o Negócio devem trabalhar juntos.", isCorrect: true, impact: { efficiency: 10, csat: 15, budget: 0 } }
    ],
    explanation: "✅ A ITIL 4 mudou de 'entrega de valor' para 'co-criação de valor'. Valor não é transferido; é criado colaborativamente entre o provedor de serviço, o consumidor e os outros stakeholders. Além disso, valor é a utilidade e utilidade percebida (Perceived benefits, usefulness, and importance)."
  },
  {
    id: 3,
    phase: "Fase 2: Os 7 Princípios Orientadores",
    context: "Como novo diretor, você foi encarregado de implementar uma nova ferramenta de Service Desk (ITSM). A diretoria sugere cancelar todos os sistemas legados e criar um processo totalmente 'do zero' em 30 dias.",
    question: "Qual Princípio Orientador da ITIL 4 você deve evocar para barrar essa ideia arriscada?",
    options: [
      { id: "A", text: "Começar de onde você está (Start where you are). Devemos avaliar o estado atual para aproveitar o que já funciona.", isCorrect: true, impact: { efficiency: 20, csat: 5, budget: 15 } },
      { id: "B", text: "Otimizar e automatizar (Optimize and automate). Automatizar os processos ruins primeiro.", isCorrect: false, impact: { efficiency: -20, csat: -10, budget: -15 } },
      { id: "C", text: "Focar em valor (Focus on value). Ignorar o estado atual e pensar apenas no cliente final.", isCorrect: false, impact: { efficiency: -10, csat: 5, budget: -20 } },
      { id: "D", text: "Trabalhar de forma holística. Contratar de imediato uma consultoria global gigantesca.", isCorrect: false, impact: { efficiency: -5, csat: 0, budget: -30 } }
    ],
    explanation: "✅ 'Começar de onde você está' é crucial. Nunca destrua sem antes avaliar o estado atual de forma objetiva. Frequentemente há muita coisa funcionando e práticas existentes que podem ser melhoradas e reutilizadas, reduzindo desperdício e risco."
  },
  {
    id: 4,
    phase: "Fase 2: Princípios Orientadores (Continuação)",
    context: "O plano para atualizar toda a infraestrutura está previsto para demorar 18 meses, com o lançamento apenas no último mês em um projeto do tipo 'Cascata/Big Bang'. Stakeholders estão nervosos com o longo período de silêncio.",
    question: "Qual Princípio Orientador deve ser aplicado?",
    options: [
      { id: "A", text: "Progredir iterativamente com feedback. Dividir o mega-projeto em entregas menores e validar constantemente.", isCorrect: true, impact: { efficiency: 15, csat: 20, budget: 5 } },
      { id: "B", text: "Manter simples e prático. Ignorar a infraestrutura antiga e apenas comprar tudo novo na nuvem.", isCorrect: false, impact: { efficiency: 10, csat: -5, budget: -30 } },
      { id: "C", text: "Pensar e trabalhar de forma holística. Pausar todas as outras atividades da empresa por 18 meses.", isCorrect: false, impact: { efficiency: -30, csat: -30, budget: -20 } },
      { id: "D", text: "Focar em valor. Portanto, a equipe de TI não deve pedir feedback até o produto final ser perfeito.", isCorrect: false, impact: { efficiency: -15, csat: -20, budget: 0 } }
    ],
    explanation: "✅ 'Progredir iterativamente com feedback' (Progress iteratively with feedback). Entregas enormes frequentemente falham em atingir o alvo e entregar valor no momento correto. Iterações ágeis permitem identificar desvios cedo."
  },
  {
    id: 5,
    phase: "Fase 3: SVS e Cadeia de Valor de Serviço",
    context: "A TechVanguard identificou uma nova 'Oportunidade' de mercado para criar contas corporativas no aplicativo. Você precisa usar o Sistema de Valor de Serviço (SVS).",
    question: "Como o SVS reage estruturalmente a essa 'Oportunidade'?",
    options: [
      { id: "A", text: "A oportunidade ignora os princípios e práticas até que um gerente aprove o início da Cadeia.", isCorrect: false, impact: { efficiency: -10, csat: -5, budget: 0 } },
      { id: "B", text: "A oportunidade entra no SVS como Entrada (Input), passa pela Cadeia de Valor e seus outros componentes, resultando em Valor à direita.", isCorrect: true, impact: { efficiency: 15, csat: 10, budget: 5 } },
      { id: "C", text: "Oportunidades devem ser descartadas. O SVS reage apenas a Demandas reativas geradas pelos usuários atuais.", isCorrect: false, impact: { efficiency: -20, csat: -10, budget: 0 } },
      { id: "D", text: "A oportunidade vai direto para a atividade 'Entregar e Suportar' da Cadeia de Valor.", isCorrect: false, impact: { efficiency: -5, csat: -15, budget: -10 } }
    ],
    explanation: "✅ As entradas primárias do SVS são Oportunidade e Demanda. Os elementos centrais engrenam (Princípios, Governança, Cadeia de Valor, Práticas, Melhoria Contínua) para transformar isso no output primário: Valor co-criado."
  },
  {
    id: 6,
    phase: "Fase 4: Práticas da ITIL 4 - Incidentes vs Problemas",
    context: "Ocorreu um desastre! O sistema de checkout caiu três vezes apenas nesta quinta-feira. O Service Desk reestabelece o sistema temporariamente reiniciando o servidor em 5 minutos a cada vez.",
    question: "Como Diretor, como você gerencia essa situação separando as práticas corretas?",
    options: [
      { id: "A", text: "Acionar Gerenciamento de Problemas para focar em reestabelecer o serviço na 4ª vez o mais rápido possível.", isCorrect: false, impact: { efficiency: -10, csat: -5, budget: 0 } },
      { id: "B", text: "O gerenciamento de incidentes investigará a raiz, enquanto o de problemas focará em reiniciar o servidor sempre.", isCorrect: false, impact: { efficiency: -15, csat: -20, budget: 0 } },
      { id: "C", text: "Gerenciamento de Incidentes restaura o serviço normal o mais rápido possível (o reset). Gerenciamento de Problemas busca a causa raiz para evitar a 4ª queda.", isCorrect: true, impact: { efficiency: 20, csat: 10, budget: -5 } },
      { id: "D", text: "Ignorar práticas. Os desenvolvedores são responsáveis absolutos por corrigir os bugs quando tiverem tempo.", isCorrect: false, impact: { efficiency: -20, csat: -25, budget: 0 } }
    ],
    explanation: "✅ Incidente: Uma interrupção não planejada ou redução da qualidade. Foco = restaurar SLA o mais rápido possível (ex: workaround/reiniciar). Problema: Uma causa raiz (ou potencial raiz) de um ou mais incidentes. Foco = Identificar a causa e gerar uma solução permanente."
  },
  {
    id: 7,
    phase: "Fase 4: Habilitação de Mudança (Change Enablement)",
    context: "Após a análise de Problemas do desafio anterior, a equipe descobriu que é preciso um patch urgente de segurança em um driver do banco de dados do checkout para parar as quedas.",
    question: "Dentro da prática de Habilitação de Mudança, como esse 'patch urgente' deve ser tratado?",
    options: [
      { id: "A", text: "Como uma Mudança Padrão (Standard). Ela tem pré-autorização e baixo risco.", isCorrect: false, impact: { efficiency: -10, csat: 0, budget: -15 } },
      { id: "B", text: "Como uma Mudança Normal. Deve entrar no comitê CAB e esperar a janela daqui a 2 semanas.", isCorrect: false, impact: { efficiency: -20, csat: -20, budget: 0 } },
      { id: "C", text: "Burlar os processos. Não registrar na ferramenta para o auditor não ver, para economizar tempo.", isCorrect: false, impact: { efficiency: -30, csat: 0, budget: -30 } },
      { id: "D", text: "Como Mudança Emergencial (Emergency). Deve ser aprovada e implementada rapidamente, muitas vezes pulando etapas demoradas, embora registrada.", isCorrect: true, impact: { efficiency: 15, csat: 10, budget: -5 } }
    ],
    explanation: "✅ Mudanças Emergenciais devem ser postas em prática com extrema urgência (como correções críticas ou de vulnerabilidades). O processo normal de autorização é acelerado ou submetido a uma ECAB (Emergency CAB). O teste pode ter redução de escopo formal devido à urgência."
  }
];

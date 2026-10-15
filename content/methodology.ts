import type { MethodologyModel, MethodologyStep, Value } from "./types";

export const methodologyIntro =
  "As crianças aprendem melhor quando vivem experiências diretas e lhes dão sentido através da reflexão. Por isso, a nossa prática reúne o melhor de vários modelos pedagógicos atuais.";

export const methodologyModelsIntro =
  "Não seguimos um método único: combinamos três abordagens de referência, ajustando-as a cada fase do crescimento.";

export const methodologyModels: MethodologyModel[] = [
  {
    name: "High/Scope",
    blurb:
      "Aprendizagem pela ação, com o ciclo planear–fazer–rever: a criança decide o que vai fazer, explora com as próprias mãos e depois recorda e partilha o que viveu.",
    ageTag: "Sobretudo na creche",
  },
  {
    name: "Movimento da Escola Moderna",
    blurb:
      "Uma sala participada e democrática. Com mapas, planos e rotinas partilhadas, as crianças organizam o tempo, assumem responsabilidades e aprendem a viver em grupo.",
    ageTag: "Sobretudo no pré-escolar",
  },
  {
    name: "Trabalho por Projeto",
    blurb:
      "Partimos das perguntas e curiosidades das crianças para investigar temas em conjunto, cruzando linguagem, arte, movimento e descoberta.",
    ageTag: "Sobretudo no pré-escolar",
  },
];

export const methodologySteps: MethodologyStep[] = [
  {
    title: "Planear",
    description:
      "A criança escolhe o que quer fazer e como — ganhando intenção e iniciativa.",
  },
  {
    title: "Fazer",
    description:
      "Explora, experimenta e resolve problemas, com o educador como facilitador.",
  },
  {
    title: "Rever",
    description:
      "Recorda e partilha o que viveu, construindo conhecimento a partir da experiência.",
  },
];

export const values: Value[] = [
  {
    title: "Dar liberdade",
    description: "Espaço para escolher, criar e descobrir.",
  },
  {
    title: "Criar entusiasmo",
    description: "Encanto e reverência pela aprendizagem.",
  },
  {
    title: "Respeitar a criança",
    description: "Como ser pensante, artístico e único.",
  },
  {
    title: "Sem competição, sem pressas",
    description: "Tempo suficiente para aprender ao seu ritmo.",
  },
  {
    title: "Proteger a infância",
    description: "Para que seja plenamente vivida.",
  },
  {
    title: "Conforto e segurança",
    description: "Para a criança — e tranquilidade para os pais.",
  },
];

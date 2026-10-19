import type { FaqItem } from "./types";

// Fallback em código. A fonte editável vive no Sanity (faqItem); esta lista
// é usada quando o Sanity está vazio ou indisponível, e mantém o SEO (FAQPage).
export const faq: FaqItem[] = [
  {
    question: "A partir de que idade posso inscrever o meu filho?",
    answer:
      "Recebemos crianças desde os primeiros meses de vida, no berçário, passando pela creche e pelo pré-escolar, até à entrada na escola.",
  },
  {
    question: "Qual é o horário?",
    answer:
      "Estamos abertos das 8h00 às 19h30, de segunda a sexta-feira. A componente letiva decorre das 9h30 às 17h30; o restante tempo é dedicado ao acolhimento, às refeições, à higiene e à sesta.",
  },
  {
    question: "Que atividades extracurriculares oferecem?",
    answer:
      "Música (com a Academia de Música de Coimbra), Inglês (International House) e Natação (Académica), integradas no dia a dia da escola.",
  },
  {
    question: "As refeições são fornecidas?",
    answer:
      "Sim. As refeições são confecionadas na escola e adaptadas a cada faixa etária, com ementas pensadas para uma alimentação saudável.",
  },
  {
    question: "Que metodologia utilizam?",
    answer:
      "Inspiramo-nos no modelo High/Scope: aprendizagem pela ação, através do ciclo planear – fazer – rever, com o educador a apoiar a iniciativa de cada criança.",
  },
  {
    question: "Posso visitar a escola antes de decidir?",
    answer:
      "Com todo o gosto. Agende uma visita e mostramos-lhe os espaços, apresentamos a equipa e respondemos a todas as suas questões.",
  },
  {
    question: "Onde ficam localizados?",
    answer:
      "No centro de Coimbra — Travessa Sanches da Gama, 50, na Arregaça. Fácil de chegar e no coração da cidade.",
  },
];

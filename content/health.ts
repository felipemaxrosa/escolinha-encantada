export interface HealthPartner {
  name: string;
  description: string;
}

// "Educação e saúde de mãos dadas" — parcerias de profissionais de saúde.
export const healthPartners: HealthPartner[] = [
  { name: "Pediatria", description: "Acompanhamento do crescimento e da saúde." },
  {
    name: "Psicologia",
    description: "Apoio ao desenvolvimento emocional e social.",
  },
  { name: "Oftalmologia", description: "Rastreio precoce da visão." },
  {
    name: "Medicina dentária",
    description: "Cuidados e prevenção da saúde oral.",
  },
  {
    name: "Terapia da fala",
    description: "Estímulo à comunicação e à linguagem.",
  },
];

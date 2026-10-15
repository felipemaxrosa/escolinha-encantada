import type { SiteConfig } from "./types";

/** Configuração global do site — dados reais da Escolinha Encantada. */
export const site: SiteConfig = {
  name: "Escolinha Encantada",
  tagline:
    "Um infantário para crianças felizes por aprender e por viver em conjunto.",
  description:
    "Creche, berçário e pré-escolar no centro de Coimbra desde 1994. Metodologia High/Scope, equipa dedicada e um ambiente de afetos.",
  foundedYear: 1994,
  nav: [
    { label: "Início", href: "/" },
    { label: "Programas", href: "/programas" },
    { label: "Metodologia", href: "/metodologia" },
    { label: "Equipa", href: "/equipa" },
    { label: "Galeria", href: "/galeria" },
  ],
  cta: { label: "Inscrição", href: "/inscricao" },
  contact: {
    street: "Travessa Sanches da Gama, 50",
    area: "Arregaça",
    postalCode: "3030-022",
    city: "Coimbra",
    landlines: ["239 702 002", "239 406 493"],
    mobile: "916 135 882",
    email: "escolinhaencantada@hotmail.com",
    nif: "503499056",
    facebookUrl: "https://www.facebook.com/escolinhaencantada.claudia",
    complaintsUrl: "https://www.livroreclamacoes.pt/inicio/",
  },
};

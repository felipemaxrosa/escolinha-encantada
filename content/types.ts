// Tipos do conteúdo estrutural (vive em código; a media-chave vive no Sanity).

export interface NavItem {
  label: string;
  href: string;
}

export interface Contact {
  street: string;
  area: string;
  postalCode: string;
  city: string;
  /** Telefones fixos. */
  landlines: string[];
  /** Telemóvel. */
  mobile: string;
  email: string;
  /** NIPC. */
  nif: string;
  facebookUrl: string;
  /** Livro de reclamações eletrónico. */
  complaintsUrl: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  foundedYear: number;
  /** Itens visíveis na navegação (o CTA é separado). */
  nav: NavItem[];
  /** Chamada principal para ação (inscrição). */
  cta: NavItem;
  contact: Contact;
}

export type ProgramSlug = "bercario" | "creche" | "pre-escolar";
export type ProgramTone = "primary" | "mint" | "secondary";

export interface Program {
  slug: ProgramSlug;
  name: string;
  ageBand: string;
  tagline: string;
  summary: string;
  highlights: string[];
  /** Matiz-assinatura do programa. */
  tone: ProgramTone;
}

export interface MethodologyStep {
  title: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface MethodologyModel {
  name: string;
  blurb: string;
  /** Faixa etária onde o modelo mais se faz sentir. */
  ageTag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  relation: string;
  /** Marca citações de exemplo (trocar pelas reais). */
  isPlaceholder?: boolean;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  sections: {
    programs: { title: string; intro: string };
    methodology: { title: string; intro: string };
    gallery: { title: string; intro: string };
    testimonials: { title: string; intro: string };
    faq: { title: string; intro: string };
  };
}

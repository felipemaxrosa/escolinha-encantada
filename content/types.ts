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

import { site } from "@/content/site";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://escolinha-encantada.vercel.app";

/** JSON-LD de negócio local (creche) — reforça o SEO local em Coimbra. */
export function childCareJsonLd() {
  const c = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: site.name,
    description: site.description,
    url: siteUrl,
    telephone: `+351${c.landlines[0].replace(/\s/g, "")}`,
    email: c.email,
    foundingDate: String(site.foundedYear),
    areaServed: c.city,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      addressLocality: c.city,
      postalCode: c.postalCode,
      addressCountry: "PT",
    },
    sameAs: [c.facebookUrl],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: siteUrl,
    inLanguage: "pt-PT",
  };
}

/** JSON-LD de FAQ — elegível a rich result nas pesquisas. */
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

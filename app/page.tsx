import { Hero } from "@/components/sections/hero";
import { ProgramsGrid } from "@/components/sections/programs-grid";
import { PhilosophyQuote } from "@/components/sections/philosophy-quote";
import { MethodologyTeaser } from "@/components/sections/methodology-teaser";
import { GalleryTeaser } from "@/components/sections/gallery-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { getGallery, getHero } from "@/sanity/queries";
import { home } from "@/content/home";

export default async function HomePage() {
  const [gallery, hero] = await Promise.all([getGallery(), getHero()]);
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Hero
        eyebrow={home.hero.eyebrow}
        title={hero?.heading || home.hero.title}
        subtitle={hero?.subheading || home.hero.subtitle}
        image={hero?.slides?.[0] ?? gallery[1] ?? gallery[0]}
      />
      <ProgramsGrid />
      <PhilosophyQuote />
      <MethodologyTeaser />
      <GalleryTeaser images={gallery} />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}

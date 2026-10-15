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
import { getGallery } from "@/sanity/queries";

export default async function HomePage() {
  const gallery = await getGallery();
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <Hero image={gallery[0]} />
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

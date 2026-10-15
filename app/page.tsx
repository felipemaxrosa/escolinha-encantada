import { Hero } from "@/components/sections/hero";
import { ProgramsGrid } from "@/components/sections/programs-grid";
import { PhilosophyQuote } from "@/components/sections/philosophy-quote";
import { MethodologyTeaser } from "@/components/sections/methodology-teaser";
import { GalleryTeaser } from "@/components/sections/gallery-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgramsGrid />
      <PhilosophyQuote />
      <MethodologyTeaser />
      <GalleryTeaser />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}

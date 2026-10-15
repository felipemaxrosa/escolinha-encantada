import Link from "next/link";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImagePlaceholder } from "@/components/media/image-placeholder";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 size-80 rounded-full bg-primary-100 opacity-60 blur-3xl" />
        <div className="absolute top-20 -right-20 size-72 rounded-full bg-mint-100 opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-secondary-100 opacity-50 blur-3xl" />
      </div>

      <Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-start gap-6">
          <Badge tone="accent">{home.hero.eyebrow}</Badge>
          <h1 className="text-5xl text-balance md:text-6xl">
            {home.hero.title}
          </h1>
          <p className="max-w-xl text-lg text-ink-soft">
            {home.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={site.cta.href}>{site.cta.label}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/programas">Conhecer os programas</Link>
            </Button>
          </div>
        </div>

        <ImagePlaceholder
          className="aspect-[4/5] w-full rotate-1 md:aspect-square"
          label="Crianças a brincar na Escolinha Encantada"
        />
      </Container>
    </section>
  );
}

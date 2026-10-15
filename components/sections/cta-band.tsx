import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary-600 px-8 py-14 text-center text-white md:px-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -top-10 -right-10 size-48 rounded-full bg-white blur-2xl" />
            <div className="absolute -bottom-12 left-10 size-48 rounded-full bg-accent-400 blur-2xl" />
          </div>
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-4xl text-white md:text-5xl">
              Venha conhecer a Escolinha Encantada
            </h2>
            <p className="text-lg text-white/90">
              Agende uma visita ou faça a inscrição. Teremos todo o gosto em
              receber a sua família.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary-700 hover:bg-white/90"
              >
                <Link href={site.cta.href}>{site.cta.label}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/metodologia">Saber mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

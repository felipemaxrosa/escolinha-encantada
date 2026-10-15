import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/skip-link";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Escolinha Encantada — Creche e Pré-escolar em Coimbra",
    template: "%s | Escolinha Encantada",
  },
  description:
    "Creche, berçário e pré-escolar no centro de Coimbra desde 1994.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-PT"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <Nav />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}

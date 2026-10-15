"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Logo } from "@/components/media/logo";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-20">
        <Link
          href="/"
          aria-label={`${site.name} — início`}
          className="shrink-0"
        >
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {site.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary-100/60",
                  active ? "text-primary-700" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={site.cta.href}>{site.cta.label}</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

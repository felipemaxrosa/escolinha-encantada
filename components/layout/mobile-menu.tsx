"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/media/logo";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Abrir menu"
        className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-primary-100/60 md:hidden"
      >
        <Menu className="size-6" aria-hidden />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-overlay-in" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col gap-6 bg-cream p-6 shadow-soft data-[state=open]:animate-panel-in">
          <div className="flex items-center justify-between">
            <Logo />
            <Dialog.Close
              aria-label="Fechar menu"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-primary-100/60"
            >
              <X className="size-6" aria-hidden />
            </Dialog.Close>
          </div>

          <Dialog.Title className="sr-only">Menu de navegação</Dialog.Title>

          <nav className="flex flex-col gap-1" aria-label="Principal">
            {site.nav.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-lg font-semibold text-ink hover:bg-primary-100/60"
                >
                  {item.label}
                </Link>
              </Dialog.Close>
            ))}
          </nav>

          <Dialog.Close asChild>
            <Button asChild size="lg" className="w-full">
              <Link href={site.cta.href}>{site.cta.label}</Link>
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

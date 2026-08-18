import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { services } from "@/lib/site-config";

interface HeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export function Hero({ eyebrow, title, description, primaryCta, secondaryCta }: HeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_top,_var(--color-primary)_0%,_transparent_55%)] opacity-30"
      />
      <Container className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 py-20 sm:py-28">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button size="lg" render={<Link href={primaryCta.href} />}>
            {primaryCta.label}
          </Button>
          <Button size="lg" variant="outline" render={<Link href={secondaryCta.href} />}>
            {secondaryCta.label}
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6">
          {services.map((service) => (
            <li key={service.slug} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
              {service.name}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

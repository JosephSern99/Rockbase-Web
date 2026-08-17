import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

interface CtaSectionProps {
  title: string;
  description: string;
  cta: { label: string; href: string };
}

export function CtaSection({ title, description, cta }: CtaSectionProps) {
  return (
    <div className="border-t border-border bg-card">
      <Container className="flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
        </div>
        <Button size="lg" render={<Link href={cta.href} />} className="shrink-0">
          {cta.label}
        </Button>
      </Container>
    </div>
  );
}

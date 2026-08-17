import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <Section>
      <Container className="flex max-w-xl flex-col items-start gap-6 py-16 text-left">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">404</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Page not found.
        </h1>
        <p className="text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button render={<Link href="/" />}>Back to home</Button>
          <Button variant="outline" render={<Link href={siteConfig.cta.href} />}>
            {siteConfig.cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

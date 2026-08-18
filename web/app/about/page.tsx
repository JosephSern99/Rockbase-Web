import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `The team and mission behind ${siteConfig.name}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">About us</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            We bring your dream into reality.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {siteConfig.name} is a senior team covering web development, mobile development,
            and robotic process automation. We started the company to
            work directly with clients. We are seasoned, experienced engineers.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border" aria-labelledby="mission-heading">
        <Container className="max-w-3xl">
          <h2 id="mission-heading" className="text-2xl font-semibold text-foreground">
            Our mission
          </h2>
          <p className="mt-4 text-muted-foreground">
            Give growing businesses the same quality of web engineering, robotic process
            automation, and marketing execution that larger companies take for granted — delivered by a
            dedicated team that moves fast and stays accountable for the result.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border" aria-labelledby="team-heading">
        <Container className="max-w-3xl">
          <h2 id="team-heading" className="text-2xl font-semibold text-foreground">
            The team
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A group of IT professionals who bring your dreams and ideas to life.
          </p>
          <Link
            href="/team"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Meet the team
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </Container>
      </Section>

      <CtaSection
        title="Want to work with us directly?"
        description="Have a dream, tell us what needs to be achieved — feel free to contact us."
        cta={siteConfig.cta}
      />
    </>
  );
}

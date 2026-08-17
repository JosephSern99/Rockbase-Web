import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig, teamRoles } from "@/lib/site-config";

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
            We build the systems businesses run on.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {siteConfig.name} is a small, senior team covering web development, process
            automation, and social media marketing. We started the company to work directly
            with clients — no layers of account management between you and the people building
            your project.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border" aria-labelledby="mission-heading">
        <Container className="max-w-3xl">
          <h2 id="mission-heading" className="text-2xl font-semibold text-foreground">
            Our mission
          </h2>
          <p className="mt-4 text-muted-foreground">
            Give growing businesses the same quality of web engineering, automation, and
            marketing execution that larger companies take for granted — delivered by a team
            small enough to move fast and stay accountable for the result.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border" aria-labelledby="team-heading">
        <Container className="max-w-3xl">
          <h2 id="team-heading" className="text-2xl font-semibold text-foreground">
            The team
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {teamRoles.length} founders, one team — no account managers between you and the
            people building your project.
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
        title="Want to work with us?"
        description="Tell us about your project and we'll get back to you."
        cta={siteConfig.cta}
      />
    </>
  );
}

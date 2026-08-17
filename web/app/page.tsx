import type { Metadata } from "next";
import { Zap, MessageCircle, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/marketing/hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { StatBlock } from "@/components/marketing/stat-block";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal } from "@/components/marketing/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { services, siteConfig } from "@/lib/site-config";
import { serviceIcons } from "@/lib/service-icons";

export const metadata: Metadata = buildMetadata({
  title: "Web Development, RPA & Social Media Marketing",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Rockbase"
        title="Web development, automation, and marketing that actually ships."
        description={siteConfig.tagline}
        primaryCta={{ label: siteConfig.cta.label, href: siteConfig.cta.href }}
        secondaryCta={{ label: "See our services", href: "/services" }}
      />

      <Section aria-labelledby="services-heading">
        <Container>
          <Reveal>
            <h2 id="services-heading" className="text-3xl font-semibold text-foreground">
              What we do
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Three services, one team. We pick the right combination for what you actually need.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} index={index} className="h-full">
                <ServiceCard service={service} icon={serviceIcons[service.slug]} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border" aria-labelledby="approach-heading">
        <Container>
          <h2 id="approach-heading" className="sr-only">
            How we work
          </h2>
          <Reveal>
            <StatBlock
              items={[
                { icon: Zap, label: "Fast execution", description: "Small team, few handoffs, short feedback loops." },
                { icon: MessageCircle, label: "Direct communication", description: "You talk to the people doing the work, not an account manager." },
                { icon: ShieldCheck, label: "Built to last", description: "Production-grade engineering from the first commit, not a prototype." },
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      <Reveal>
        <CtaSection
          title="Have a project in mind?"
          description="Tell us what you're trying to build or automate — we'll tell you honestly if we're a fit."
          cta={{ label: siteConfig.cta.label, href: siteConfig.cta.href }}
        />
      </Reveal>
    </>
  );
}

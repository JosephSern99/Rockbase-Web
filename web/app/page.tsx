import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, MessageCircle, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/marketing/hero";
import { ServiceCard } from "@/components/marketing/service-card";
import { ShowcaseCard } from "@/components/marketing/showcase-card";
import { StatBlock } from "@/components/marketing/stat-block";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal } from "@/components/marketing/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { services, siteConfig } from "@/lib/site-config";
import { serviceIcons } from "@/lib/service-icons";
import { showcaseProjects } from "@/lib/showcase-config";

export const metadata: Metadata = buildMetadata({
  title: "Web Development, Mobile Apps, Robotic Process Automation & Marketing",
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={siteConfig.name}
        title="Web development, robotic process automation, and marketing that actually ships."
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
              {services.length} services, one team. We pick the right combination for what you actually need.
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

      <Section className="border-t border-border" aria-labelledby="work-heading">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="work-heading" className="text-3xl font-semibold text-foreground">
                  Recent work
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Live sites, not mockups. Click through to any of them.
                </p>
              </div>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                See all work
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {showcaseProjects.slice(0, 2).map((project, index) => (
              <Reveal key={project.slug} index={index} className="h-full">
                <ShowcaseCard project={project} />
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
                { icon: Zap, label: "Fast execution", description: "Experienced IT professionals with a track record of delivering ahead of project deadlines." },
                { icon: MessageCircle, label: "Direct communication", description: "You have direct access to the software engineer responsible for building your dream into reality." },
                { icon: ShieldCheck, label: "Build to scale", description: "Delivering production-grade systems that scale according to your business needs." },
              ]}
            />
          </Reveal>
        </Container>
      </Section>

      <Reveal>
        <CtaSection
          title="Have a project in mind?"
          description="Tell us your dream application and we will bring it to life."
          cta={{ label: siteConfig.cta.label, href: siteConfig.cta.href }}
        />
      </Reveal>
    </>
  );
}

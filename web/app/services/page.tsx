import type { Metadata } from "next";
import { ServiceCard } from "@/components/marketing/service-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal } from "@/components/marketing/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { services, siteConfig } from "@/lib/site-config";
import { serviceIcons } from "@/lib/service-icons";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description: "Web development, mobile apps, and robotic process automation.",
  path: "/services",
});

function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.name,
      description: service.summary,
      provider: { "@type": "Organization", name: siteConfig.name },
    })),
  };
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd()) }}
      />

      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Services</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            What we do, in plain terms.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            {services.length} services. Pick one, or combine them — most projects end up touching
            more than one.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} index={index} className="h-full">
                <ServiceCard service={service} icon={serviceIcons[service.slug]} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Not sure which service you need?"
        description="Tell us the problem you're trying to solve — we'll point you at the right service."
        cta={siteConfig.cta}
      />
    </>
  );
}

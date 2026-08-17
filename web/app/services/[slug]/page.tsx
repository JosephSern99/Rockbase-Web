import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { CtaSection } from "@/components/marketing/cta-section";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/metadata";
import { services, siteConfig, type ServiceSlug } from "@/lib/site-config";
import { serviceIcons } from "@/lib/service-icons";

function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

function serviceJsonLd(slug: ServiceSlug) {
  const service = getService(slug)!;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@type": "Organization", name: siteConfig.name },
  };
}

export default async function ServiceDetailPage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.slug];
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service.slug)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Services", path: "/services" },
              { name: service.name, path: `/services/${service.slug}` },
            ]),
          ),
        }}
      />

      <Section>
        <Container className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/services" className="hover:text-foreground">
              Services
            </Link>
            <ChevronRight aria-hidden="true" className="size-4" />
            <span aria-current="page" className="text-foreground">
              {service.name}
            </span>
          </nav>

          <div
            className="mt-6 flex size-12 items-center justify-center rounded-lg bg-[var(--service-accent)]/10 text-[var(--service-accent)]"
            style={{ "--service-accent": service.accentColor } as CSSProperties}
          >
            <Icon aria-hidden="true" className="size-6" />
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{service.summary}</p>
        </Container>
      </Section>

      <Section
        className="border-t border-border"
        style={{ "--service-accent": service.accentColor } as CSSProperties}
      >
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-foreground">What&apos;s included</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {service.whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[var(--service-accent)]" />
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-border" aria-labelledby="other-services-heading">
        <Container>
          <h2 id="other-services-heading" className="text-xl font-semibold text-foreground">
            Other services
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {otherServices.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaSection
        title={`Ready to talk about ${service.name.toLowerCase()}?`}
        description="Tell us what you're trying to build or automate — we'll tell you honestly if we're a fit."
        cta={siteConfig.cta}
      />
    </>
  );
}

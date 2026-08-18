import type { Metadata } from "next";
import { ShowcaseCard } from "@/components/marketing/showcase-card";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal } from "@/components/marketing/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { showcaseProjects } from "@/lib/showcase-config";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Our Work",
  description: "Live websites we've built, across e-commerce, B2B, and membership businesses.",
  path: "/work",
});

function workJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: showcaseProjects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.clientName,
      description: project.description,
      url: project.url,
    })),
  };
}

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd()) }}
      />

      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Our work</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Real sites, live right now.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            No mockups — every preview below is a live working application. Click through to any
            of them.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {showcaseProjects.map((project, index) => (
              <Reveal key={project.slug} index={index} className="h-full">
                <ShowcaseCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Want a site like this?"
        description="Have a dream, want a working website — feel free to contact us."
        cta={siteConfig.cta}
      />
    </>
  );
}

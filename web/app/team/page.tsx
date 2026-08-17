import type { Metadata } from "next";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal } from "@/components/marketing/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig, teamRoles } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Our Team",
  description: `The four founders behind ${siteConfig.name}.`,
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Our team</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Four founders. No account managers in between.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Every project is built by the same senior people you talk to at the start. Full
            bios and photos are coming as we finish setting up — for now, here&apos;s who
            you&apos;re working with.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamRoles.map((role, index) => (
              <Reveal key={role} index={index}>
                <li className="flex h-full flex-col items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-md shadow-black/20">
                  <div
                    aria-hidden="true"
                    className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary"
                  >
                    RB
                  </div>
                  <p className="text-base font-medium text-foreground">{role}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaSection
        title="Want to work with us directly?"
        description="No account managers, no handoffs — tell us about your project."
        cta={siteConfig.cta}
      />
    </>
  );
}

import type { Metadata } from "next";
import { CtaSection } from "@/components/marketing/cta-section";
import { Reveal } from "@/components/marketing/reveal";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig, teamMembers } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Our Team",
  description: `The team behind ${siteConfig.name}.`,
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <Section>
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Our team</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A group of IT professionals.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Proven experience in real work — every project is built by senior, experienced IT
            professionals. Their experience and capability can be seen below.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} index={index}>
                <li className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-md shadow-black/20">
                  <div className="flex items-center gap-4">
                    <div
                      aria-hidden="true"
                      className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary"
                    >
                      {member.alias.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-base font-medium text-foreground">{member.alias}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>

                  {member.experience.length > 0 ? (
                    <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                      {member.experience.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="text-primary">
                            &bull;
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Details coming soon.</p>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
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

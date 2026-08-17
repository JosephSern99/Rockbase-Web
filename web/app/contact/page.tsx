import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/features/contact/contact-form";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} about a web development, RPA, or social media marketing project.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-6 text-muted-foreground">
            Fill in the form and we&apos;ll get back to you. Tell us as much as you can about
            what you&apos;re trying to build or automate — it helps us respond with something
            useful instead of a form email.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <Mail aria-hidden="true" className="size-4 text-primary" />
            <span>We reply within one business day.</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}

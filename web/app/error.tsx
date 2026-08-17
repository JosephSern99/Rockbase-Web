"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // No error-tracking service wired up yet (Sentry, per the architecture
    // doc §3.5) — log server-side detail to the console until it is.
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container className="flex max-w-xl flex-col items-start gap-6 py-16 text-left">
        <p className="text-sm font-semibold tracking-wide text-destructive uppercase">Error</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Something went wrong.
        </h1>
        <p className="text-lg text-muted-foreground">
          That page hit an unexpected error. Try again, or head back to the homepage.
        </p>
        <Button onClick={() => reset()}>Try again</Button>
      </Container>
    </Section>
  );
}

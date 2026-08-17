import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { ServiceSummary } from "@/lib/site-config";

interface ServiceCardProps {
  service: ServiceSummary;
  icon: LucideIcon;
}

export function ServiceCard({ service, icon: Icon }: ServiceCardProps) {
  const accentStyle = { "--service-accent": service.accentColor } as CSSProperties;

  return (
    <Link
      href={`/services/${service.slug}`}
      style={accentStyle}
      className="group relative block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {/* Compact card: icon + title only. This is the only element in
          normal document flow — its height is what the grid row sizes to,
          so hovering never shifts the other cards or anything below the
          section. The reveal below is `position: absolute`, entirely
          outside layout flow by definition. */}
      <Card className="relative z-10 h-full shadow-md shadow-black/20 transition-all duration-200 group-hover:shadow-xl group-hover:ring-2 group-hover:[--tw-shadow-color:var(--service-accent)] group-hover:[--tw-ring-color:var(--service-accent)]">
        <CardHeader>
          <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[var(--service-accent)]/10 text-[var(--service-accent)] transition-colors duration-200 group-hover:bg-[var(--service-accent)] group-hover:text-primary-foreground">
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <CardTitle className="text-xl">{service.name}</CardTitle>
        </CardHeader>
      </Card>

      {/* Reveal: absolutely positioned, drops down from the card on hover
          or keyboard focus. Always present in the DOM (readable by screen
          readers regardless of hover state) — only its visual opacity and
          position change. */}
      <div className="pointer-events-none absolute inset-x-0 top-full z-20 -translate-y-1 opacity-0 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:pointer-events-auto">
        <div
          className="-mt-px rounded-b-xl border border-t-0 bg-card px-(--card-spacing) pt-3 pb-(--card-spacing) shadow-xl [--card-spacing:--spacing(4)]"
          style={{ borderColor: "var(--service-accent)", boxShadow: "0 20px 25px -5px color-mix(in oklab, var(--service-accent) 20%, transparent)" }}
        >
          <CardDescription>{service.summary}</CardDescription>
          <ul className="mt-3 flex flex-col gap-2">
            {service.whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--service-accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--service-accent)]">
            Learn more
            <ArrowRight aria-hidden="true" className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

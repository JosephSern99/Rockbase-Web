import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ShowcaseProject } from "@/lib/showcase-config";

interface ShowcaseCardProps {
  project: ShowcaseProject;
}

export function ShowcaseCard({ project }: ShowcaseCardProps) {
  const accentStyle = { "--accent": project.accentColor } as CSSProperties;
  const hostname = new URL(project.url).hostname;

  return (
    <div
      style={accentStyle}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:[--tw-ring-color:var(--accent)] hover:[--tw-shadow-color:var(--accent)]"
    >
      {/* Browser-chrome mockup around a live, scaled-down iframe of the
          real deployment — not a static screenshot, so it's always current. */}
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-2.5">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-foreground/15" />
        <span className="ml-2 truncate text-xs text-muted-foreground">{hostname}</span>
      </div>

      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <div
          aria-hidden="true"
          className="absolute inset-0 origin-top-left"
          style={{ width: "400%", height: "400%", transform: "scale(0.25)" }}
        >
          <iframe
            src={project.url}
            title=""
            tabIndex={-1}
            loading="lazy"
            className="pointer-events-none size-full border-0"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-(--card-spacing) [--card-spacing:--spacing(5)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-medium text-foreground">{project.clientName}</h3>
            <p className="text-sm text-muted-foreground">{project.industry}</p>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Visit live site
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}

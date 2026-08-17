import type { LucideIcon } from "lucide-react";

export interface StatBlockItem {
  icon: LucideIcon;
  label: string;
  description: string;
}

export function StatBlock({ items }: { items: StatBlockItem[] }) {
  return (
    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {items.map(({ icon: Icon, label, description }) => (
        <div key={label} className="flex flex-col gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon aria-hidden="true" className="size-5" />
          </div>
          <dt className="text-base font-semibold text-foreground">{label}</dt>
          <dd className="text-sm text-muted-foreground">{description}</dd>
        </div>
      ))}
    </dl>
  );
}

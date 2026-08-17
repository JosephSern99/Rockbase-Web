import { cn } from "@/lib/utils";

interface SectionProps extends Omit<React.ComponentProps<"section">, "ref"> {
  as?: "section" | "article" | "div";
}

export function Section({ className, as = "section", children, ...props }: SectionProps) {
  const Tag = as;
  return (
    <Tag className={cn("py-16 sm:py-24", className)} {...props}>
      {children}
    </Tag>
  );
}

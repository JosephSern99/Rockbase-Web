import { Card, CardContent, CardFooter } from "@/components/ui/card";

export interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
}

/**
 * Renders an approved testimonial. Not wired into any page yet — no
 * testimonials exist. Populate from the `testimonial` table (architecture
 * §4) once real, approved reviews are available; never seed with invented
 * quotes or names.
 */
export function TestimonialCard({ quote, authorName, authorRole, authorCompany }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent>
        <blockquote className="text-base text-foreground">&ldquo;{quote}&rdquo;</blockquote>
      </CardContent>
      <CardFooter className="flex-col items-start gap-0.5 border-t-0 bg-transparent">
        <p className="text-sm font-semibold text-foreground">{authorName}</p>
        <p className="text-sm text-muted-foreground">
          {authorRole}, {authorCompany}
        </p>
      </CardFooter>
    </Card>
  );
}

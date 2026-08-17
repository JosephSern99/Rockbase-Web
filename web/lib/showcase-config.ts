export interface ShowcaseProject {
  slug: string;
  clientName: string;
  industry: string;
  description: string;
  url: string;
  tags: string[];
  /** Hex color — used for this project's browser-chrome accent. */
  accentColor: string;
}

/**
 * Real, live projects only — each `url` is a working deployment a visitor
 * can click through to. No invented case studies, per the no-mock-data
 * policy applied everywhere else on this site.
 */
export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "fabula-coffee",
    clientName: "Fabula Coffee",
    industry: "Specialty coffee retail",
    description:
      "An e-commerce storefront for a specialty coffee roaster — product catalog, best-seller merchandising, review counts, and a discount-driven newsletter signup built to convert first-time visitors.",
    url: "https://fabula-coffee-shop.vercel.app/",
    tags: ["Web Development", "E-Commerce"],
    accentColor: "#D97706",
  },
  {
    slug: "sinar-majan",
    clientName: "Sinar Majan",
    industry: "Industrial commodities trading",
    description:
      "A B2B web presence for a bulk metals and industrial commodities trader — built to read as credible and established to manufacturing and procurement buyers, not a template storefront.",
    url: "https://sinar-majan-web.vercel.app/",
    tags: ["Web Development", "B2B"],
    accentColor: "#64748B",
  },
  {
    slug: "luxe-home",
    clientName: "Luxe Home",
    industry: "Premium furniture & interior design",
    description:
      "A luxury furniture retailer combining a product collection with interior design consultation services — testimonials, scale stats, and a design-conscious visual language throughout.",
    url: "https://luxe-home-furniture-website.vercel.app/",
    tags: ["Web Development", "E-Commerce"],
    accentColor: "#A855F7",
  },
  {
    slug: "flex-flow",
    clientName: "Flex Flow",
    industry: "Fitness & wellness",
    description:
      "A membership site for a gym and wellness center — tiered pricing, coach profiles, a live class schedule, and a free-trial funnel built to turn browsers into signed-up members.",
    url: "https://flexflow-fitness.vercel.app/",
    tags: ["Web Development", "Membership"],
    accentColor: "#F97316",
  },
];

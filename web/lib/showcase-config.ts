export interface ShowcaseProject {
  slug: string;
  clientName: string;
  industry: string;
  description: string;
  type: "web" | "mobile";
  /** "comingSoon" projects have no public URL yet — the card shows a placeholder, not an iframe. */
  status: "live" | "comingSoon";
  url?: string;
  /** Mobile projects only — shown as badges instead of a "Visit live site" link. */
  platforms?: string[];
  tags: string[];
  /** Hex color — used for this project's browser-chrome / card accent. */
  accentColor: string;
}

/**
 * Real, live projects link to a working deployment a visitor can click
 * through to — no invented case studies for those, per the no-mock-data
 * policy applied everywhere else on this site.
 *
 * The one exception is "liquor-mobile-app": the agency has no public,
 * nameable client to show for its mobile work yet, so — by explicit
 * direction — this entry is an illustrative placeholder used only to
 * demonstrate mobile app development capability, not a real client.
 */
export const showcaseProjects: ShowcaseProject[] = [
  {
    slug: "meidian-metals",
    clientName: "Meidian Metals Trading",
    industry: "Industrial commodities trading",
    description:
      "A B2B web presence for a bulk metals and industrial commodities trader — built to read as credible and established to manufacturing and procurement buyers, not a template storefront.",
    type: "web",
    status: "live",
    url: "https://sinar-majan-web.vercel.app/",
    tags: ["Web Development", "B2B"],
    accentColor: "#64748B",
  },
  {
    slug: "fernwood-coffee",
    clientName: "Fernwood Coffee Co.",
    industry: "Specialty coffee retail",
    description:
      "Our own specialty coffee e-commerce build — product catalog, best-seller merchandising, and a newsletter signup funnel. Being redeployed under our own domain; live preview coming soon.",
    type: "web",
    status: "comingSoon",
    tags: ["Web Development", "E-Commerce"],
    accentColor: "#D97706",
  },
  {
    slug: "liquor-mobile-app",
    clientName: "Amber & Oak Spirits (illustrative)",
    industry: "Liquor & spirits retail",
    description:
      "A mobile ordering app for a liquor and spirits retailer — product catalog, age verification at checkout, loyalty rewards, and order tracking, built for iOS and Android from a single codebase.",
    type: "mobile",
    status: "comingSoon",
    platforms: ["iOS", "Android"],
    tags: ["Mobile Development"],
    accentColor: "#B45309",
  },
];

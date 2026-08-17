export type ServiceSlug = "web-development" | "robotic-process-automation" | "social-media-marketing";

export interface ServiceSummary {
  slug: ServiceSlug;
  name: string;
  summary: string;
  whatsIncluded: string[];
  /** Hex color — each service's own accent, used for its icon and hover state. */
  accentColor: string;
  displayOrder: number;
}

/**
 * Mirrors the `service` table shape from website-architecture-v1.md §4.
 * Swap this for a real fetch against the Spring Boot API once it exists —
 * every consumer already reads through this single source of truth.
 *
 * `whatsIncluded` is kept to 3 items per service on purpose — the service
 * card's hover reveal sizes itself to the tallest service, so an uneven
 * item count would make cards visibly different heights.
 */
export const services: ServiceSummary[] = [
  {
    slug: "web-development",
    name: "Web Development",
    summary:
      "Ready-built templates for a fast, affordable start, fully custom builds when you need more, and ongoing maintenance either way.",
    whatsIncluded: [
      "Ready-built templates or fully custom builds, whichever fits",
      "Performance and SEO baked in from day one",
      "Ongoing maintenance and support plans after launch",
    ],
    accentColor: "#0EA5E9",
    displayOrder: 1,
  },
  {
    slug: "robotic-process-automation",
    name: "Robotic Process Automation",
    summary:
      "Automate repetitive back-office work so your team spends time on what actually needs a human.",
    whatsIncluded: [
      "Process discovery and automation design",
      "Bot build, test, and deployment",
      "Ongoing monitoring and support",
    ],
    accentColor: "#8B5CF6",
    displayOrder: 2,
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    summary:
      "Content and campaigns that build an audience and turn attention into leads.",
    whatsIncluded: [
      "Content strategy and calendar",
      "Platform management",
      "Paid campaign setup and reporting",
    ],
    accentColor: "#F43F5E",
    displayOrder: 3,
  },
];

// Placeholder by role only — no invented names or photos. Replace with the
// founders' real details before launch.
export const teamRoles = [
  "Founder — Web Development",
  "Founder — Robotic Process Automation",
  "Founder — Social Media Marketing",
  "Founder — Client Delivery",
];

export const siteConfig = {
  name: "Rockbase",
  tagline: "Web development, RPA, and social media marketing for growing businesses.",
  description:
    "Rockbase builds websites, automates back-office work, and runs social media marketing for businesses that need a partner who ships.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get in touch", href: "/contact" },
} as const;

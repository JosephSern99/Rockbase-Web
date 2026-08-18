export type ServiceSlug =
  | "web-development"
  | "mobile-development"
  | "robotic-process-automation";

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
    slug: "mobile-development",
    name: "Mobile Development",
    summary:
      "Native-feel iOS and Android apps from one codebase, taken from first prototype through to app-store launch.",
    whatsIncluded: [
      "Cross-platform builds for iOS and Android from a single codebase",
      "App Store and Google Play submission and release management",
      "Ongoing maintenance and OS-version support after launch",
    ],
    accentColor: "#10B981",
    displayOrder: 2,
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
    displayOrder: 3,
  },
];

export interface TeamMember {
  name: string;
  alias: string;
  role: string;
  /** Experience summarized by skill/impact, never by project name. */
  experience: string[];
}

// Real founders. Experience is summarized without project names by design.
// Three members' experience is intentionally left blank pending their input.
export const teamMembers: TeamMember[] = [
  {
    name: "Joseph",
    alias: "Joe",
    role: "Fullstack Developer",
    experience: [
      "5+ years building scalable enterprise and fintech systems across Java (Spring Boot, Quarkus), .NET, React, and React Native",
      "Led end-to-end delivery of production systems — planning, development, UAT, and AWS deployment",
      "Integrated payment gateways for secure financial transactions",
      "AWS Certified Solutions Architect – Associate, with hands-on experience architecting cloud-native microservices",
      "Modernized legacy systems while keeping production stable and downtime low",
    ],
  },
  {
    name: "Kranthi",
    alias: "Kumar",
    role: "Fullstack Developer",
    experience: [],
  },
  {
    name: "Kelvin",
    alias: "Kelv",
    role: "Fullstack Developer",
    experience: [],
  },
  {
    name: "Clayton",
    alias: "Clay",
    role: "Robotic Process Automation Developer",
    experience: [],
  },
];

export const siteConfig = {
  name: "Ordinary Fella's",
  tagline:
    "Web development, mobile apps, robotic process automation, and marketing — everything that helps ship your business.",
  description:
    "Ordinary Fella's builds websites and mobile apps, and automates back-office work for businesses that need a partner who ships.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get in touch", href: "/contact" },
} as const;

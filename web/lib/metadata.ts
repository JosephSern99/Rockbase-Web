import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { SITE_URL } from "@/lib/env";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
}

export function buildMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();

  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    // Explicit absolute title, not a plain string relying on app/layout.tsx's
    // `%s | Rockbase` template — that template applies inconsistently to the
    // root "/" route in Next.js 16.3.1 (present on /about, /contact, etc.,
    // absent on /). Setting it explicitly here sidesteps the quirk entirely.
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: SITE_URL,
    description: siteConfig.description,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

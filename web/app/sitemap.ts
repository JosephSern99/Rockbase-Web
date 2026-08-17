import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";
import { services } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/work",
    "/team",
    "/contact",
    ...services.map((service) => `/services/${service.slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

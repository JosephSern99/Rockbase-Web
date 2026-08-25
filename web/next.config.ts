import type { NextConfig } from "next";

// script-src keeps 'unsafe-inline' for the JSON-LD <script> tags in
// app/layout.tsx and app/services/page.tsx (developer-authored, no user
// input interpolated — not an XSS vector today). A nonce-based CSP would
// remove it, but per Next.js docs that forces every page to dynamic
// rendering, which conflicts with the architecture's SSG requirement for
// these marketing pages (website-architecture-v1.md §3.1). Revisit if a
// page starts rendering user-controlled data into an inline script.
const isDev = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-eval' only in dev — React uses eval() there for debugging
  // (stack reconstruction). Neither React nor Next.js use it in production.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  // formsubmit.co is the contact form's temporary email-delivery plugin —
  // the browser posts directly to it via fetch(), so it needs to be
  // allow-listed here or every submission is silently blocked by CSP.
  "connect-src 'self' https://formsubmit.co",
  // Scoped to the exact case-study deployments embedded live on /work —
  // not a wildcard, so no arbitrary third-party site can be framed here.
  "frame-src https://meidian-metals-trading-web.vercel.app https://fenwood-coffee-co.vercel.app https://sat2tani.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

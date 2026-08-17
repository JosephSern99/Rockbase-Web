import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site-config";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <Image src="/rockbase-logo.png" alt="" width={36} height={36} priority />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden sm:block">
          {/* Pill-shaped nav links, same rounded-full language as the CTA
              button and a matching 44px tap height, so the row reads as one
              unified bar instead of two different shapes sharing a line. */}
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-11 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden sm:block">
          <Button render={<Link href={siteConfig.cta.href} />}>{siteConfig.cta.label}</Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}

/* eslint-disable @next/next/no-img-element -- Static export serves preoptimized images with explicit dimensions. */
import type { ReactNode } from "react";
import type { OptionalLink, ScreenshotAsset } from "@/content/portfolio";

const icons: Record<string, ReactNode> = {
  arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
  northeast: <><path d="M6 18 18 6M6 6h12v12" /></>,
  down: <><path d="M12 4v16m-6-6 6 6 6-6" /></>,
  route: <><circle cx="6" cy="5" r="2" /><circle cx="18" cy="19" r="2" /><path d="M8 5h6a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h6" /></>,
  direction: <><path d="m12 3 8 18-8-5-8 5 8-18Z" /></>,
  stations: <><path d="M5 5v14m7-14v14m7-14v14" /><circle cx="5" cy="8" r="2" /><circle cx="12" cy="16" r="2" /><circle cx="19" cy="8" r="2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  ticket: <><path d="M3 7h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V7Z" /><path d="M15 7v3m0 3v1m0 3v2" /></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" /></>,
  offline: <><path d="m3 3 18 18M8.5 8.5A13 13 0 0 0 3 11m9-4a13 13 0 0 1 9 4M6 15a8 8 0 0 1 6-3m-2 7 2-2 2 2" /></>,
  moon: <><path d="M20 14A8.5 8.5 0 0 1 10 4a8.5 8.5 0 1 0 10 10Z" /></>,
  language: <><path d="M3 5h12M9 3v2m-4 0c0 7 8 10 8 10m0-10c0 7-8 10-8 10m9 6 4-10 4 10m-6-3h4" /></>,
  user: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4m-3 14h2" /></>,
  code: <><path d="m7 7-5 5 5 5m10-10 5 5-5 5m-3-14-4 18" /></>,
  server: <><rect x="3" y="3" width="18" height="7" rx="2" /><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M6 6.5h.1M6 17.5h.1M11 6.5h6M11 17.5h6" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
  image: <><rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8" cy="8" r="1.5" /><path d="m21 15-6-6L3 21" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
  spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
};

export function Icon({ name = "arrow", className = "" }: { name?: string; className?: string }) {
  return <svg className={`icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name] ?? icons.arrow}</svg>;
}

export function SectionHeading({ number, label, title, description }: { number?: string; label: string; title: ReactNode; description?: string }) {
  return <div className="section-heading" data-reveal>
    <div><p className="eyebrow">{number && <span className="section-number">{number}</span>}{label}</p><h2>{title}</h2></div>
    {description && <p className="section-description">{description}</p>}
  </div>;
}

export function ActionLink({ href, children, variant = "primary", icon = "arrow", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "text" | "light"; icon?: string; className?: string }) {
  return <a className={`action action-${variant} ${className}`} href={href}>{children}<Icon name={icon} /></a>;
}

export function ConfiguredLinks({ links, className = "" }: { links: OptionalLink[]; className?: string }) {
  return <div className={`configured-links ${className}`}>{links.filter(link => link.href).map(link => <a key={link.label} href={link.href!} download={link.download || undefined} className="social-link">{link.label}<Icon name={link.download ? "down" : "northeast"} /></a>)}</div>;
}

export function Screenshot({ asset, featured = false }: { asset: ScreenshotAsset; featured?: boolean }) {
  return <figure className={`screenshot ${featured ? "screenshot-featured" : ""}`}>
    {asset.src ? <img src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} loading="lazy" decoding="async" /> : <div className="screenshot-empty" role="img" aria-label={`Screenshot placeholder: ${asset.label}. Actual app capture to be added.`}>
      <span className="placeholder-corner corner-top" /><span className="placeholder-corner corner-bottom" />
      <span className="placeholder-icon"><Icon name="image" /></span>
      <span className="placeholder-heading">A little space<br />for the real thing.</span>
      <span className="placeholder-copy">Actual app screenshot<br />to be added</span>
      <span className="placeholder-label">{asset.label}</span>
    </div>}
    <figcaption>{asset.src ? asset.label : "Screenshot placeholder"}</figcaption>
  </figure>;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

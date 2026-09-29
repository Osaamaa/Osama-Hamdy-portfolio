import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/contact";
import { Motion } from "@/components/motion";
import { site } from "@/content/portfolio";

const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  weight: "200 800",
  display: "swap",
  variable: "--font-manrope",
  preload: true,
});

export const metadata: Metadata = {
  title: { default: site.title, template: "%s — Osama Hamdy" },
  description: site.description,
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  openGraph: { type: "website", locale: "en_US", siteName: "Osama Hamdy", title: site.title, description: site.description, ...(site.url ? { url: site.url, images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }] } : {}) },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, ...(site.url ? { images: [new URL("/og.png", site.url).href] } : {}) },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#f7f7f2", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={manrope.variable}><body><Header />{children}<Footer /><Motion /></body></html>;
}

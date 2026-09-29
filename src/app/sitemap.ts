import type { MetadataRoute } from "next";
import { metro, site } from "@/content/portfolio";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return site.url ? [{ url: `${site.url}/` }, { url: `${site.url}${metro.route}` }] : [];
}

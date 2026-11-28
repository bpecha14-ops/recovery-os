// sitemap.xml for the primary production domain (civicclaim.tech).
// Static routes + one URL per program card (/programs/[country]/[name]),
// exactly matching generateStaticParams in the program page.
import type { MetadataRoute } from "next";
import { PROGRAMS } from "@/lib/programs-data";
import { slugify } from "@/lib/rights-packages";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES = [
  "",
  "/about",
  "/business",
  "/contribute",
  "/coverage",
  "/data",
  "/impact",
  "/method",
  "/privacy",
  "/terms",
  "/tools",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
  for (const p of PROGRAMS) {
    routes.push({
      url: `${SITE_URL}/programs/${slugify(p.country)}/${p.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }
  return routes;
}

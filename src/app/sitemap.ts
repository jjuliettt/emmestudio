import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/contacts";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolioCategories";

// /sitemap.xml: l'elenco delle pagine per Google. Le categorie si
// aggiornano da sole da portfolioCategories.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/portfolio",
    ...PORTFOLIO_CATEGORIES.map((category) => category.href),
    "/prices",
    "/contacts",
    "/privacy-policy",
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}

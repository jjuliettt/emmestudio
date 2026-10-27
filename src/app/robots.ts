import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/contacts";

// /robots.txt: tutto il sito si può indicizzare, tranne le route dei moduli
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

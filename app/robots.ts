import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { BASE_PATH } from "@/lib/paths";

/** Required so robots.txt is emitted as a static file during `next build`. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = `${site.url}${BASE_PATH}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}

import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { BASE_PATH } from "@/lib/paths";

/** Required so the sitemap is emitted as a static file during `next build`. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `${site.url}${BASE_PATH}`;

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

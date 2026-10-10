/**
 * Base-path aware asset helper.
 *
 * GitHub Pages can serve the site either from the domain root
 * (https://<user>.github.io/) or from a repository sub-path
 * (https://<user>.github.io/<repo>/).
 *
 * Next.js automatically prefixes `basePath` onto `next/link`, `next/image` and
 * the bundled `/_next/*` assets — but NOT onto files referenced manually from
 * `/public` (e.g. `/resume.pdf`). Use `assetPath()` for those.
 *
 * Set `NEXT_PUBLIC_BASE_PATH` at build time to switch between the two modes.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/$/, "") ?? "";

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/** Absolute URL helper — required for canonical tags, sitemap and OG images. */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

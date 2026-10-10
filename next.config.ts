import type { NextConfig } from "next";

/**
 * GitHub Pages deployment.
 *
 * The site is exported as fully static HTML (`output: "export"`), so it can be
 * served from GitHub Pages without any Node.js runtime.
 *
 * Base path:
 *   - Deploying to a *user/org* page  -> https://<username>.github.io/            => leave empty
 *   - Deploying to a *project* page   -> https://<username>.github.io/<repo>/     => set NEXT_PUBLIC_BASE_PATH=/<repo>
 *
 * Set the value in `.env.production` (see README) or inline:
 *   NEXT_PUBLIC_BASE_PATH=/Portfolio-Platform npm run build
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/$/, "") ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // `next/image` optimization requires a server, which GitHub Pages does not have.
  images: { unoptimized: true },
};

export default nextConfig;

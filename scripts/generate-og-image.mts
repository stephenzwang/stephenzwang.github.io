/**
 * Generates `public/og.png` — the 1200x630 Open Graph / Twitter card image.
 *
 * Why a committed static file rather than a Next.js `opengraph-image` route?
 * With `output: "export"` that route emits an *extensionless* file
 * (`out/opengraph-image`). GitHub Pages serves extensionless files as
 * `application/octet-stream`, and social crawlers reject an image served with
 * the wrong content type. A real `og.png` is served correctly everywhere.
 *
 * Re-run after changing your name or headline:
 *
 *   node --experimental-strip-types scripts/generate-og-image.mts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
// `next` has no "./og" entry in its exports map, so the file path is used
// directly — this only needs to resolve under plain Node, not under a bundler.
import { ImageResponse } from "next/og.js";
import { site } from "../data/site.ts";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, "..", "public", "og.png");

const h = React.createElement;

const accent = "#3d82ff";
const ink = "#05080e";
const line = "#1e2739";
const fg = "#e8edf6";
const muted = "#9aa8bf";
const subtle = "#6d7c94";

const stack = ["JavaScript", "TypeScript", "React", "Next.js", "PHP", "SQL", "Azure"];

const tree = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: ink,
      padding: "72px 80px",
      position: "relative",
    },
  },

  // Accent wash
  h("div", {
    style: {
      position: "absolute",
      top: -180,
      right: -140,
      width: 720,
      height: 520,
      borderRadius: 9999,
      backgroundImage: "linear-gradient(135deg, rgba(61,130,255,0.38), rgba(34,211,238,0.10))",
      filter: "blur(24px)",
    },
  }),

  // Header
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 20 } },
    h(
      "div",
      {
        style: {
          width: 64,
          height: 64,
          borderRadius: 16,
          border: `1px solid ${accent}73`,
          backgroundColor: "#0c111b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9dc2ff",
          fontSize: 26,
          fontWeight: 600,
        },
      },
      "SW",
    ),
    h("div", { style: { color: subtle, fontSize: 20, letterSpacing: 6 } }, "PORTFOLIO"),
  ),

  // Name + headline
  h(
    "div",
    { style: { display: "flex", flexDirection: "column" } },
    h(
      "div",
      {
        style: {
          color: fg,
          fontSize: 84,
          fontWeight: 700,
          letterSpacing: -2,
          lineHeight: 1.05,
        },
      },
      site.name,
    ),
    h("div", { style: { color: "#6ba4ff", fontSize: 34, marginTop: 24 } }, site.headline),
  ),

  // Technology strip
  h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 18,
        borderTop: `1px solid ${line}`,
        paddingTop: 28,
        color: muted,
        fontSize: 25,
      },
    },
    ...stack.flatMap((item, index) =>
      index === 0
        ? [h("span", { key: item }, item)]
        : [
            h("span", { key: `${item}-sep`, style: { color: "#33405c" } }, "·"),
            h("span", { key: item }, item),
          ],
    ),
  ),
);

const response = new ImageResponse(tree, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, buffer);

console.log(`Wrote ${outPath} (${buffer.length} bytes)`);

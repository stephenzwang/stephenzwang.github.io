#!/usr/bin/env node
/**
 * Copy the one canonical resume PDF into `public/resume.pdf`.
 *
 * ## Why a copy and not a link
 *
 * The site is a **static export** (`output: "export"` in `next.config.ts`) built for GitHub Pages, so there is no
 * server to read a file from disk at request time. Whatever is in `public/` when `next build` runs is what ships,
 * and `/resume.pdf` — the URL the "Download resume" button uses — is a file in that folder. So the document has to
 * physically exist there.
 *
 * A symlink would be the obvious shortcut and is the wrong one: `next export` copies `public/` into `out/`, and a
 * link is copied as a link, which then dangles on Pages. The copy is the only shape that survives the build.
 *
 * ## What "one place" means here
 *
 * The owner exports `E:\WebCodeLive-Main\Stephen-Wang-Resume.pdf` and nothing else. This runs before `dev` and
 * before `build` (see the `predev` / `prebuild` hooks), finds that file by walking up from this project, and
 * refreshes `public/resume.pdf` only when the bytes actually differ.
 *
 * ## Why a missing source is a warning and not a failure
 *
 * `public/resume.pdf` is **tracked in git**, because GitHub Actions builds this site from a clone and cannot see
 * anything outside the repository. On CI the canonical file does not exist, and the committed copy is the correct
 * thing to ship — so a missing source must not break the build. Locally it is a warning you will actually read,
 * because a silent stale resume is the bug this replaces: the copy here was from 7 October while the real file
 * had moved on.
 *
 * Plain Node, no dependency.
 */
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RESUME_FILE_NAME = "Stephen-Wang-Resume.pdf";
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(projectRoot, "public", "resume.pdf");

/** Same rule as the job-search app: `RESUME_PDF`, then walk up. Keep the two in step. */
function findSource() {
  const override = process.env.RESUME_PDF?.trim();
  if (override !== undefined && override !== "") return override;

  let dir = projectRoot;
  for (let depth = 0; depth < 8; depth += 1) {
    const candidate = join(dir, RESUME_FILE_NAME);
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

const sha = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const kb = (path) => Math.round(statSync(path).size / 1024);

const source = findSource();

if (source === null) {
  console.warn(
    `[resume] No ${RESUME_FILE_NAME} found above ${projectRoot} — keeping the copy already in public/.\n` +
      `[resume] That is expected on CI, where the committed copy is the one that ships.`,
  );
  process.exit(0);
}

if (!existsSync(target)) {
  copyFileSync(source, target);
  console.log(`[resume] public/resume.pdf created from ${source} (${kb(target)} KB)`);
  process.exit(0);
}

if (sha(source) === sha(target)) {
  console.log(`[resume] public/resume.pdf is already ${RESUME_FILE_NAME} (${kb(target)} KB) — nothing to do`);
  process.exit(0);
}

copyFileSync(source, target);
console.log(`[resume] public/resume.pdf updated from ${source} (${kb(target)} KB)`);

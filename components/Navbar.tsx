"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";

const monogram = site.name
  .split(" ")
  .map((word) => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

/**
 * Sticky primary navigation.
 *
 * - Desktop: horizontal links with an animated active-section indicator
 * - Mobile:  hamburger toggle driving an animated, keyboard-accessible panel
 *
 * This is one of only two Client Components on the page — it needs scroll and
 * intersection state, which cannot be expressed in a Server Component.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navItems[0]?.id ?? "home");

  /* Elevate the bar once the page has scrolled. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*
   * Track which section owns the reading position.
   *
   * Deliberately not an IntersectionObserver: that only reports the entries that
   * *changed* in a given batch, so acting on `entries[0]` leaves the indicator
   * stale whenever a batch contains a single unrelated section (e.g. after a
   * viewport resize). Measuring every section on each frame is cheap and always
   * deterministic.
   */
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      // The section whose top has most recently passed this line wins.
      const line = window.innerHeight * 0.35;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }

      // At the very bottom the last section may never reach the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;

      setActive(current);
    };

    const onScrollOrResize = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* Escape closes the mobile panel. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-ink-950/80 border-b backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-18">
        {/* Brand */}
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="text-fg group flex items-center gap-2.5 rounded-lg py-1.5"
        >
          <span
            aria-hidden="true"
            className="border-line bg-ink-850 text-fg group-hover:border-accent-500/50 grid size-9 place-items-center rounded-lg border font-mono text-[13px] font-semibold transition-colors"
          >
            {monogram}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">{site.name}</span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              /* Resume is the one link a recruiter should not have to hunt for. */
              const prominent = item.id === "resume";
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                      prominent
                        ? isActive
                          ? "border-accent-500/50 bg-accent-500/10 text-accent-200"
                          : "border-line text-fg-muted hover:border-line-strong hover:text-fg"
                        : isActive
                          ? "border-transparent text-fg"
                          : "border-transparent text-fg-muted hover:text-fg"
                    }`}
                  >
                    {item.label}
                    {prominent ? null : (
                      <span
                        aria-hidden="true"
                        className={`bg-accent-400 absolute inset-x-3 bottom-0.5 h-px origin-left transition-transform duration-300 ease-out ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          {/* Social links — desktop only, to keep the mobile bar uncluttered */}
          {site.socials.github || site.socials.linkedin ? (
            <div className="mr-1 hidden items-center gap-1.5 xl:flex">
              {site.socials.github ? (
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile (opens in a new tab)"
                  className="text-fg-muted hover:text-fg hover:bg-ink-800 grid size-9 place-items-center rounded-lg transition-colors"
                >
                  <GitHubIcon className="size-[18px]" />
                </a>
              ) : null}
              {site.socials.linkedin ? (
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                  className="text-fg-muted hover:text-fg hover:bg-ink-800 grid size-9 place-items-center rounded-lg transition-colors"
                >
                  <LinkedInIcon className="size-[18px]" />
                </a>
              ) : null}
            </div>
          ) : null}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="border-line bg-ink-850 text-fg hover:bg-ink-800 grid size-10 place-items-center rounded-lg border transition-colors lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-navigation"
        inert={!open}
        className={`border-line bg-ink-950/95 overflow-hidden border-b backdrop-blur-xl transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open ? "grid grid-rows-[1fr] opacity-100" : "grid grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id;
                const prominent = item.id === "resume";
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        prominent
                          ? isActive
                            ? "border-accent-500/50 bg-accent-500/10 text-accent-200 border"
                            : "border-line text-fg-muted hover:text-fg border"
                          : isActive
                            ? "bg-ink-850 text-fg"
                            : "text-fg-muted hover:bg-ink-850 hover:text-fg"
                      }`}
                    >
                      {item.label}
                      {isActive ? (
                        <span aria-hidden="true" className="bg-accent-400 size-1.5 rounded-full" />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>

            {site.socials.github || site.socials.linkedin ? (
              <>
                <div className="hairline my-4" />

                <div className="flex items-center gap-2 pb-1">
                  {site.socials.github ? (
                    <a
                      href={site.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-line bg-ink-850 text-fg-muted hover:text-fg flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors"
                    >
                      <GitHubIcon className="size-4" />
                      GitHub
                    </a>
                  ) : null}
                  {site.socials.linkedin ? (
                    <a
                      href={site.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-line bg-ink-850 text-fg-muted hover:text-fg flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors"
                    >
                      <LinkedInIcon className="size-4" />
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              </>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
}

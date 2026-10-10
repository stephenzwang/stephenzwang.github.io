"use client";

import { useEffect } from "react";

/**
 * Drives the scroll-reveal animations defined in `app/globals.css`.
 *
 * Every element carrying `.reveal` (or `.word-reveal`) starts hidden — but only
 * once JavaScript has confirmed it can reveal them, which is why the hidden
 * state is scoped to `.js`. This component observes those elements and adds
 * `.is-visible` the first time each one enters the viewport, then stops
 * observing it. The animation itself is a CSS transition, so it runs on the
 * compositor and never blocks the main thread.
 *
 * Renders nothing. Mounted once from `app/layout.tsx`.
 */
export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .word-reveal"),
    );
    if (elements.length === 0) return;

    /*
     * Without IntersectionObserver, show everything at once rather than leave
     * it hidden. The reduced-motion preference is deliberately NOT honoured
     * here — see the note at the end of `app/globals.css`.
     */
    if (!("IntersectionObserver" in window)) {
      for (const el of elements) el.classList.add("is-visible");
      return;
    }

    /*
     * Stagger siblings so grids and lists cascade instead of appearing as one
     * block. The counter is per parent element, and the delay is capped so a
     * long list never takes more than about half a second to finish.
     */
    const siblingIndex = new Map<Element, number>();
    for (const el of elements) {
      const parent = el.parentElement;
      if (!parent) continue;

      const index = siblingIndex.get(parent) ?? 0;
      siblingIndex.set(parent, index + 1);

      if (index > 0 && !el.style.getPropertyValue("--reveal-delay")) {
        el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 90}ms`);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      {
        /*
         * Fire slightly before the element is fully in view so the motion has
         * finished by the time it is centred, and ignore the very bottom edge
         * of the viewport where elements are only just peeking in.
         */
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.05,
      },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return null;
}

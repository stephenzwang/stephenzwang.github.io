import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  /** id of the heading element that labels this section (a11y) */
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** Adds the subtle grid backdrop */
  grid?: boolean;
};

/**
 * Standard section shell: consistent vertical rhythm, page gutter and
 * accessible landmark semantics (`<section aria-labelledby>`).
 */
export function Section({ id, labelledBy, children, className = "", grid = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative scroll-mt-24 py-20 sm:py-24 lg:py-28 ${className}`}
    >
      {grid ? (
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_10%,transparent_100%)]"
        />
      ) : null}
      <div className="container-page relative">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <header className={`reveal max-w-3xl ${className}`}>
      <p className="text-accent-400 mb-3 flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.18em] uppercase">
        <span aria-hidden="true" className="bg-accent-500/70 h-px w-6" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-fg-muted mt-4 text-base leading-relaxed sm:text-lg">{description}</p>
      ) : null}
    </header>
  );
}

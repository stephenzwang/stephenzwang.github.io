import Image from "next/image";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { Chip, PlaceholderBadge } from "@/components/Chip";
import type { ProjectItem } from "@/lib/types";

/**
 * Pure presentational project card. Safe to render from either a Server or a
 * Client Component (the explorer filters a list of these).
 */
export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <article className="surface hover:border-line-strong flex h-full flex-col overflow-hidden transition-colors">
      {/* Cover */}
      <div className="border-line bg-ink-900 relative aspect-16/9 overflow-hidden border-b">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            fill
            sizes="(min-width: 1024px) 34rem, 100vw"
            className="object-cover"
          />
        ) : (
          <>
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
            <div
              aria-hidden="true"
              className="from-accent-500/18 to-cyan-accent/8 absolute inset-0 bg-gradient-to-br via-transparent"
            />
            <span className="text-fg-subtle/70 absolute inset-0 grid place-items-center px-6 text-center font-mono text-xs tracking-[0.2em] uppercase">
              {project.category}
            </span>
          </>
        )}

        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="border-line bg-ink-950/80 text-fg-muted rounded-full border px-2.5 py-1 text-[11px] leading-none font-medium backdrop-blur-sm">
            {project.category}
          </span>
          {project.featured ? (
            <span className="border-accent-500/30 bg-accent-500/15 text-accent-300 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] leading-none font-medium backdrop-blur-sm">
              <Star className="size-3" aria-hidden="true" />
              Featured
            </span>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-fg text-base font-semibold tracking-tight">{project.name}</h3>
          {project.placeholder ? <PlaceholderBadge /> : null}
        </div>

        {project.tagline ? (
          <p className="text-accent-300/90 mt-2 font-mono text-xs">{project.tagline}</p>
        ) : null}

        <p className="text-fg-muted mt-3 text-sm leading-relaxed">{project.description}</p>

        {project.keyWork?.length ? (
          <div className="mt-5">
            <h4 className="text-fg-subtle font-mono text-[11px] tracking-[0.16em] uppercase">
              Key work
            </h4>
            <ul className="mt-3 space-y-1.5">
              {project.keyWork.map((item, index) => (
                <li
                  key={`${project.id}-keywork-${index}`}
                  className="text-fg-muted flex gap-2.5 text-sm leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="bg-accent-500/70 mt-[7px] size-1 shrink-0 rounded-full"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {project.features.length > 0 ? (
          <ul className="mt-4 space-y-1.5">
            {project.features.map((feature, index) => (
              <li
                key={`${project.id}-feature-${index}`}
                className="text-fg-muted flex gap-2.5 text-sm leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="bg-accent-500/70 mt-[7px] size-1 shrink-0 rounded-full"
                />
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <li key={`${project.id}-tech-${index}`}>
              <Chip>{tech}</Chip>
            </li>
          ))}
        </ul>

        <div className="border-line mt-auto flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <p className="text-fg-subtle text-xs">
            <span className="font-mono tracking-[0.14em] uppercase">Role</span>
            <br />
            <span className="text-fg-muted mt-1 block text-sm">{project.role}</span>
          </p>

          <div className="flex items-center gap-2">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} website (opens in a new tab)`}
                className="border-accent-500/30 bg-accent-500/10 text-accent-300 hover:bg-accent-500/20 inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors"
              >
                <ExternalLink className="size-3.5" aria-hidden="true" />
                View site
              </a>
            ) : (
              <span className="text-fg-subtle inline-flex items-center gap-1.5 text-xs">
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                No public link
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

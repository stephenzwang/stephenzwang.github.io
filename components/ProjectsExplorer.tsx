"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { ProjectItem } from "@/lib/types";

const ALL = "All";

/**
 * The only interactive part of the projects section. Keeping the filter here —
 * rather than making the whole section a Client Component — means the project
 * copy is still rendered on the server.
 */
export function ProjectsExplorer({ projects }: { projects: ProjectItem[] }) {
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const project of projects) {
      if (!seen.includes(project.category)) seen.push(project.category);
    }
    return [ALL, ...seen];
  }, [projects]);

  const [active, setActive] = useState(ALL);

  const visible = useMemo(
    () => (active === ALL ? projects : projects.filter((project) => project.category === active)),
    [active, projects],
  );

  return (
    <div className="mt-10">
      {categories.length > 2 ? (
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = category === active;
            const count =
              category === ALL
                ? projects.length
                : projects.filter((project) => project.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-accent-500/40 bg-accent-500/15 text-accent-200"
                    : "border-line bg-ink-850/60 text-fg-muted hover:text-fg hover:bg-ink-800"
                }`}
              >
                {category}
                <span className="text-fg-subtle font-mono text-[11px]">{count}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className="border-line text-fg-muted mt-8 rounded-xl border border-dashed px-6 py-12 text-center text-sm">
          Selected work is coming soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
        {active === ALL ? "" : ` in ${active}`}.
      </p>
    </div>
  );
}

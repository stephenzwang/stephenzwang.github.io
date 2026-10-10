import type { ReactNode } from "react";

/**
 * Small pill used for technologies, skills and metadata.
 */
export function Chip({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
}) {
  const tones = {
    default: "border-line bg-ink-800/60 text-fg-muted",
    accent: "border-accent-500/30 bg-accent-500/10 text-accent-300",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs leading-none font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Visible marker for content that is still a placeholder. Deliberately
 * noticeable so placeholder copy can never be mistaken for real history.
 */
export function PlaceholderBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-[11px] leading-none font-medium text-amber-300 ${className}`}
      title="This entry still contains placeholder content that must be replaced."
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-400" />
      Placeholder
    </span>
  );
}

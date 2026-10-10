/**
 * Shared content types.
 *
 * Every piece of copy on the site lives in `data/*` and is typed here, so the
 * UI never hardcodes content.
 */

export type SkillCategory = {
  /** Category heading, e.g. "Programming" */
  title: string;
  /** Key into the icon map in `components/Skills.tsx` */
  icon: SkillIconName;
  /** One-line explanation of what this category covers */
  description: string;
  /** Individual skills / technologies */
  skills: string[];
};

export type SkillIconName =
  | "code"
  | "layout"
  | "server"
  | "database"
  | "cloud"
  | "shield"
  | "test"
  | "cms"
  | "workflow";

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  location: string;
  /** e.g. "Mar 2023" */
  start: string;
  /** e.g. "Present" */
  end: string;
  current?: boolean;
  /**
   * Optional 1-2 sentence overview of the role. Omit it when the
   * `responsibilities` already carry the story — the UI hides the block.
   */
  summary?: string;
  responsibilities: string[];
  technologies: string[];
  /**
   * `true` when the entry still contains placeholder copy that must be replaced
   * before publishing. Rendered as a visible "Placeholder" badge on purpose.
   */
  placeholder?: boolean;
};

export type ProjectItem = {
  id: string;
  name: string;
  /** Short label used for filtering / the card badge */
  category: string;
  /**
   * Optional one-line pitch shown above the description in accent type. Omit it
   * when `category` already reads as a label — the UI hides the line.
   */
  tagline?: string;
  description: string;
  /**
   * Optional "Key work" list. Each line names a specific contribution — an
   * integration, an e-commerce capability, a CMS build, a performance pass.
   * Only include what the resume already supports; omit the whole array rather
   * than padding it with generic filler.
   */
  keyWork?: string[];
  role: string;
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  /** Path relative to /public, e.g. "/images/projects/foo.png" */
  image?: string;
  featured?: boolean;
  placeholder?: boolean;
};

export type ResumeEntry = {
  title: string;
  subtitle: string;
  /** e.g. "2015" or "2021 - 2025" */
  meta: string;
  details?: string[];
  placeholder?: boolean;
};

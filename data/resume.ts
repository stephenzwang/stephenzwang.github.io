import type { ResumeEntry } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * RESUME CONTENT — EDUCATION & CERTIFICATIONS
 * ---------------------------------------------------------------------------
 * Taken from Stephen Wang's resume. Education lists the one qualification the
 * resume holds; there are no certifications on file, so that list is empty and
 * the Certifications block is hidden until an entry is added.
 *
 * The section's own summary copy lives in `components/Resume.tsx`. The
 * "Download Resume" button points at `/public/resume.pdf`.
 */

export const education: ResumeEntry[] = [
  {
    title: "Diploma, Contemporary Media Design",
    subtitle: "Durham College",
    meta: "2015",
    details: ["Oshawa, ON"],
    placeholder: false,
  },
];

/**
 * No certifications on the resume. Leave this empty and the Certifications
 * block is not rendered; add entries here to bring it back.
 */
export const certifications: ResumeEntry[] = [];

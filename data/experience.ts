import type { ExperienceItem } from "@/lib/types";

/**
 * ---------------------------------------------------------------------------
 * PROFESSIONAL EXPERIENCE
 * ---------------------------------------------------------------------------
 * Every entry is taken from Stephen Wang's resume — employers, titles, locations
 * and dates are real, and each role is written as a short set of outcome-focused
 * responsibilities rather than a long technology list.
 *
 * Measurable results the resume states (e.g. 40% traffic, 30% product sales)
 * are folded into the responsibility line that produced them, rather than split
 * into a separate "achievements" list.
 *
 * NOTE ON CONFIDENTIALITY: professional work is described at a level that does
 * not disclose proprietary systems, client names that are not already public, or
 * internal metrics beyond those on the resume.
 */

export const experience: ExperienceItem[] = [
  {
    id: "exp-webcodelive",
    title: "Lead Full Stack Developer",
    company: "WebCodeLive",
    location: "Toronto, ON",
    start: "Jan 2025",
    end: "Present",
    current: true,
    responsibilities: [
      "Lead development and maintenance of production websites and web applications built with Next.js, React, TypeScript, JavaScript, HTML, and CSS.",
      "Develop scalable, reusable frontend components and take projects from initial development through deployment and ongoing maintenance.",
      "Debug and resolve complex issues across existing codebases — frontend, backend, API, performance, and deployment problems.",
      "Integrate third-party APIs and services with reliable error handling and performance safeguards.",
      "Modernize legacy implementations through refactoring, architectural improvements, and code optimization.",
      "Optimize applications for SEO, Core Web Vitals, accessibility, page speed, and responsive behavior.",
      "Work directly with clients and stakeholders to scope, deliver, and iterate on technical solutions and features.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "JavaScript", "REST APIs", "Core Web Vitals"],
    placeholder: false,
  },
  {
    id: "exp-palmer-marketing",
    title: "Full Stack Developer",
    company: "Palmer Marketing",
    location: "Mississauga, ON",
    start: "Sept 2021",
    end: "Jan 2025",
    responsibilities: [
      "Designed, developed, and maintained full-stack web applications and custom business solutions across frontend, backend, database, and deployment layers.",
      "Built responsive applications in JavaScript, TypeScript, React, HTML, and CSS, with an emphasis on reusable, maintainable architecture.",
      "Developed backend services, REST APIs, authentication and authorization systems, database integrations, and custom CMS platforms.",
      "Designed and optimized database schemas and queries, and integrated payment platforms, analytics, authentication providers, and third-party APIs.",
      "Managed production infrastructure — hosting, DNS, SSL, CDN, staging environments, and deployments — for multiple client platforms.",
      "Troubleshot complex frontend, backend, database, and production issues while collaborating with clients, designers, and project managers.",
      "Optimized websites for performance, Core Web Vitals, SEO, accessibility, and mobile devices.",
    ],
    technologies: ["React", "TypeScript", "JavaScript", "Node.js", "REST APIs", "SQL", "AWS"],
    placeholder: false,
  },
  {
    id: "exp-landpower-real-estate",
    title: "Digital Marketing Designer",
    company: "Landpower Real Estate",
    location: "Richmond Hill, ON",
    start: "Jan 2020",
    end: "Sept 2021",
    responsibilities: [
      "Designed and developed the company website with a focus on performance, SEO, responsive design, and user experience.",
      "Developed custom internal software, including a property management system covering properties, equipment, maintenance, legal requirements, and personnel.",
      "Built an internal graphic design platform with reusable templates for marketing materials and business documents.",
      "Created digital marketing campaigns and assets that contributed to a 40% increase in website traffic.",
      "Combined web development, software development, graphic design, and digital marketing to support business objectives.",
    ],
    technologies: ["Web Development", "Custom Software", "SEO", "Responsive Design"],
    placeholder: false,
  },
  {
    id: "exp-canada-computers",
    title: "Web Designer",
    company: "Canada Computers",
    location: "Richmond Hill, ON",
    start: "Mar 2018",
    end: "Sept 2019",
    responsibilities: [
      "Developed new functionality and pages for a large-scale e-commerce website, improving the online purchasing experience.",
      "Built new e-commerce features that contributed to a 30% increase in product sales.",
      "Maintained and optimized existing functionality, resolving bugs and improving website reliability.",
      "Collaborated with internal teams on website updates, new features, and e-commerce improvements.",
    ],
    technologies: ["E-commerce", "Web Development", "JavaScript", "HTML5", "CSS3"],
    placeholder: false,
  },
  {
    id: "exp-impact-north",
    title: "Web and Video Designer",
    company: "Impact North",
    location: "Vaughan, ON",
    start: "May 2015",
    end: "Mar 2018",
    responsibilities: [
      "Designed and developed responsive client websites using HTML, CSS, PHP, jQuery, and WordPress for residential construction and homebuilding companies.",
      "Developed custom website functionality and maintained client sites throughout their production lifecycle.",
      "Delivered digital projects for companies including Greenpark, Starlane, Treasure Hill, and Unico.",
      "Produced video, motion graphics, commercials, and social media assets, and converted architectural sketches and floor plans into digital illustrations.",
    ],
    technologies: ["HTML5", "CSS3", "PHP", "jQuery", "WordPress"],
    placeholder: false,
  },
];

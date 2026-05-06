// PENDING_REVIEW — awaiting Gabi validation
/**
 * English translation of the portfolio content contract.
 * Tone: professional, direct, editorial — not poetic.
 * Proper nouns kept in PT (names, locations, companies, institutions).
 * Links, emails, handles, and short tags remain identical to PT source.
 */

import type { PortfolioData } from "./portfolio-data";

export const portfolioDataEn: PortfolioData = {
  name: "Gabriella Gonçalves",
  fullName: "Gabriella Gonçalves dos Santos",
  title: "UX/UI Designer",
  tagline: "UX/UI Designer focused on intuitive digital experiences",
  taglineAlternates: [
    "Interface design for clearer and more consistent digital products.",
    "UX/UI, prototyping and design systems for intuitive digital experiences.",
    "Turning complex flows into simple, usable interfaces.",
    "From prototype to design system: digital experiences built to evolve.",
  ],
  subtitle:
    "Design of interfaces, prototypes and visual systems for digital products that are clearer, more consistent and easier to use.",
  bioShort:
    "UX/UI Designer focused on digital products, prototyping, usability and design systems.",
  bioLong:
    "Gabriella Gonçalves dos Santos works as a UX/UI Designer, with over 2 years of experience building digital products. Her professional focus covers design systems, prototyping, usability and Figma, always with attention to building intuitive experiences. Her public track record is associated with Sistran Informática, a technology company serving the insurance market — a context where clarity, consistency and the ability to understand complex flows are essential.",
  location: "Dois Vizinhos, PR — Brazil",
  locationTimezone: "America/Sao_Paulo",
  linkedin: "https://br.linkedin.com/in/gabriella-gon%C3%A7alves-0283841b2",
  email: "contato@gabriellagoncalves.com",
  whatsapp: "__PLACEHOLDER__",
  skills: [
    "UX/UI Design",
    "Design Systems",
    "Prototyping",
    "Usability",
    "Figma",
    "Digital Products",
  ],
  capabilities: [
    {
      id: "ux-ui",
      token: "01 / CORE",
      title: "UX/UI Design",
      description:
        "Design of digital product interfaces, balancing visual clarity, consistency and ease of use.",
    },
    {
      id: "prototyping",
      token: "02 / PROCESS",
      title: "Prototyping",
      description:
        "Building prototypes to visualize flows, test paths and support decisions before development.",
    },
    {
      id: "design-systems",
      token: "03 / SYSTEM",
      title: "Design Systems",
      description:
        "Organizing visual patterns, components and guidelines to make products more consistent and scalable.",
    },
    {
      id: "usability",
      token: "04 / JOURNEY",
      title: "Usability",
      description:
        "Analysis of journeys, flows and friction points to make the experience simpler and more intuitive.",
    },
    {
      id: "figma",
      token: "05 / TOOL",
      title: "Figma",
      description:
        "Creating screens, components, prototypes and visual alignment materials in a collaborative environment.",
    },
    {
      id: "digital-products",
      token: "06 / CONTEXT",
      title: "Digital Products",
      description:
        "Working with digital products in contexts of technology applied to complex business domains.",
    },
  ],
  manifesto: [
    "Design of digital products",
    "with focus on clarity,",
    "consistency",
    "and intuitive experiences.",
  ],
  process: [
    {
      index: "01",
      title: "Understanding the problem",
      description:
        "Understanding the context, product goals, user needs and business constraints.",
    },
    {
      index: "02",
      title: "Structuring the journey",
      description:
        "Mapping flows, screens, decision points and potential friction.",
    },
    {
      index: "03",
      title: "Prototyping",
      description:
        "Building wireframes and prototypes to align solution paths with stakeholders.",
    },
    {
      index: "04",
      title: "Interface and consistency",
      description:
        "Designing screens with attention to visual hierarchy, components, patterns and consistency.",
    },
    {
      index: "05",
      title: "Handoff and evolution",
      description:
        "Preparing materials for development and evolving interfaces based on feedback.",
    },
  ],
  experience: [
    {
      company: "Sistran Informática",
      role: "UX/UI Designer",
      description:
        "Professional work associated with Sistran Informática, a technology company focused on solutions for the insurance market.",
      source: "https://br.linkedin.com/in/gabriella-gon%C3%A7alves-0283841b2",
      validation: "Validate dates and scope before publishing details.",
    },
  ],
  domainContext: {
    title: "Domain context",
    body: "Experience associated with a technology environment for the insurance market, where clarity of flows and interface consistency are essential.",
    sources: [
      "https://www.sistran.com.br/",
      "https://www.sistran.com.br/sobre/",
      "https://www.sistran.com.br/solucoes/",
    ],
  },
  education: [
    {
      institution: "UNINTER Centro Universitário Internacional",
      description: "Education associated with the public LinkedIn profile.",
      validation: "Course and period pending validation.",
    },
  ],
  projects: [],
  publishedWork: [
    {
      id: "ds-figma-isadora",
      kind: "design-system",
      title: "Design System — collaborative publication",
      summary:
        "Public construction and release of a Design System in Figma, co-authored with Isadora. Organization of tokens, components and visual guidelines for shared use.",
      collaborators: [{ name: "Isadora", role: "Co-author" }],
      primaryUrl:
        "https://www.figma.com/design/YIQdXAgxeZxjJSS0cyvLqp/Design-System?node-id=142-475&p=f",
      primaryLabel: "Open in Figma",
      referenceUrl:
        "https://www.linkedin.com/feed/update/urn:li:activity:7361369948050337793/",
      referenceLabel: "View post on LinkedIn",
      tags: ["Design System", "Figma", "Tokens", "Components", "Collaboration"],
    },
  ],
  testimonials: [
    {
      id: "samuel-alves-tech-lead",
      author: "Samuel Alves",
      role: "Tech Lead · Solutions Architect",
      relation: "Direct tech lead for two years",
      // PENDING_REVIEW — translation of Samuel's Portuguese testimonial
      quote: [
        "I had the opportunity to act as Gabriella's tech lead over the last two years and follow her evolution as a UX/UI Designer closely. In that period, she demonstrated a very valuable combination of visual sensitivity, structured thinking, and attention to real user experience.",
        "Gabriella has an above-average ability to turn complex problems into clear, organized, and pleasant interfaces. Beyond her command of prototyping and interface design, she has always stood out for her collaboration with the technical team, her openness to dialogue, and her care in building viable, consistent solutions well aligned with the product.",
        "She is a dedicated, careful, and constantly evolving professional who contributes not only with good screens but with vision, judgment, and maturity in the process of building digital experiences.",
      ],
      authorized: true,
    },
  ],
  projectsNote:
    "One public case already live. Other cases being curated for authorized publication.",
  rotatingWords: ["intuitive", "clear", "consistent", "scalable", "human"],
  showEntrepreneurshipBlock: false,
  entrepreneurship: {
    company: "Dal Molin Dev LTDA",
    description:
      "Possible professional/business link in technology. Use only if confirmed and authorized.",
    source: "https://advdinamico.com.br/socios/gabriella-goncalves-dos-santos-5e4c9e6d",
    validation: "Pending validation with Gabriella.",
  },
  lastUpdated: "2026-05-06",
};

export const navSectionsEn = [
  { id: "hero", label: "Index" },
  { id: "manifesto", label: "Manifesto" },
  { id: "capabilities", label: "Capabilities" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;

// Your certificates, oldest → newest (it reads as a learning journey).
// Fields: title, issuer, date, note, file (opens when "View certificate" is clicked),
//         thumb + large (preview images in /public/certs, optional)
// Add a row to add a certificate — the road groups them 3 at a time.
// Chapter names are in `chapterTitles` below (one per group of 3).

const f = (slug, ext) => ({
  file: `certs/${slug}.${ext}`,
  thumb: `certs/thumbs/${slug}.jpg`,
  large: `certs/large/${slug}.jpg`,
});

const PERCIPIO = "Accenture · Percipio";

export const chapterTitles = [
  "Hands-on training",
  "Generative AI basics",
  "Agentic AI",
  "Practice & people skills",
];

export const certificates = [
  {
    id: 1,
    title: "Certificate of Internship — Embedded Systems & IoT",
    issuer: "DevMinds",
    date: "Oct – Nov 2023",
    note: "1-month onsite internship as an IoT Intern. Main project: Blinking LED using an LDR sensor.",
    ...f("devminds-iot-internship", "jpg"),
  },
  {
    id: 2,
    title: "On-the-Job Training — Application Developer (Web & Mobile)",
    issuer: "Rooman Technologies · VTU Internship",
    date: "Feb 2025",
    note: "On-the-job training at Rooman Technologies, Bengaluru (12 – 28 Feb 2025).",
    // file left empty on purpose: the original contains personal details.
  },
  {
    id: 3,
    title: "Certificate of Achievement — Application Developer (Web & Mobile)",
    issuer: "Rooman Technologies",
    date: "Sep 2024 – Feb 2025",
    note: "Completed training in association with NSDC, Skill India, NASSCOM and IBM.",
    ...f("rooman-application-developer", "jpg"),
  },
  {
    id: 4,
    title: "Artificial Intelligence and Machine Learning",
    issuer: PERCIPIO,
    date: "2 Jun 2026",
    note: "Course in Artificial Intelligence · 1 hr 36 m.",
    ...f("percipio-ai-ml", "pdf"),
  },
  {
    id: 5,
    title: "ChatGPT Prompt Engineering Examples & Use Cases",
    issuer: PERCIPIO,
    date: "2 Jun 2026",
    note: "ChatGPT 3+ · 1 hr 5 m.",
    ...f("percipio-chatgpt-prompt-engineering", "pdf"),
  },
  {
    id: 6,
    title: "Generative AI APIs for Practical Applications: An Introduction",
    issuer: PERCIPIO,
    date: "2 Jun 2026",
    note: "Generative AI · 1 hr 14 m.",
    ...f("percipio-genai-apis", "pdf"),
  },
  {
    id: 7,
    title: "Inside Agentic AI: Foundations and Frontiers",
    issuer: PERCIPIO,
    date: "2 Jun 2026",
    note: "Artificial Intelligence · 39 m.",
    ...f("percipio-agentic-foundations", "pdf"),
  },
  {
    id: 8,
    title: "Inside Agentic AI: Core Architecture of Agentic Systems",
    issuer: PERCIPIO,
    date: "2 Jun 2026",
    note: "AI / ML / GenAI · 35 m.",
    ...f("percipio-agentic-architecture", "pdf"),
  },
  {
    id: 9,
    title: "Inside Agentic AI: Popular Frameworks",
    issuer: PERCIPIO,
    date: "2 Jun 2026",
    note: "AI / ML / GenAI · 32 m.",
    ...f("percipio-agentic-frameworks", "pdf"),
  },
  {
    id: 10,
    title: "Gen AI for Delivery Practitioners — Level 2",
    issuer: "GenWizard University · TDLC Training Labs",
    date: "5 Jun 2026",
    note: "Learning path completion: GenAI in TDLC – Training Labs (online).",
    // file left empty on purpose: the original shows an email address.
  },
  {
    id: 11,
    title: "Conveying Your Message without Words",
    issuer: PERCIPIO,
    date: "8 Jul 2026",
    note: "Communication course · 24 m.",
    ...f("percipio-conveying-message", "pdf"),
  },
];

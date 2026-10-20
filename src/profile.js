import { certificates } from "./certificates";

// ============================================================
//  EDIT THIS FILE — everything personal on the site lives here.
//  Anything wrapped in [BRACKETS] is a placeholder for you.
// ============================================================

export const profile = {
  name: "Likitha Muthineni",
  initials: "LM",
  role: "Java Full Stack Developer · Gen AI",
  location: "[Bengaluru, India]",
  availability: "Open to opportunities",

  // Big hero headline. Words wrapped in *stars* turn coral.
  headline: "Turning ideas\ninto *experiences.*",
  subheadline:
    "I build web applications and explore how technology can solve real-world problems.",

  // Put your photo at src/assets/profile.jpg (replace the file).
  photoCaption: "JAVA FULL STACK · AI EXPLORER",

  // ---------- VOICE INTRODUCTION ----------
  // The site speaks this text with the browser's built-in voice and
  // highlights each word as it is spoken. Write it the way you talk.
  voice: {
    text:
          "Hi, I'm Likitha. Welcome to my portfolio. " +
    "I'm a Java full stack developer, and I love turning ideas into working software. " +
    "I studied Electronics and Communication Engineering, and I'm looking forward to starting my career in software development. " +
    "Right now, I'm exploring generative AI and building projects with Python, React, and Spring Boot. " +
    "Scroll down to see my work, my certificates, and how to reach me. " +
    "I'd love to hear from you.",
    lang: "en-US",
    rate: 0.98,
    pitch: 1.05,
    // Optional: put your OWN recorded voice in /public/intro.mp3 and set
    // audioFile: "/intro.mp3" — it will be used instead of the robot voice.
    audioFile: "",
  },

  // ---------- ABOUT ----------
  about:
    "I'm a Java full stack developer who enjoys turning ideas into interactive, useful software. " +
  "I care about clean code, thoughtful design, and creating engaging digital experiences while exploring new technologies like generative AI.",
  stats: [
    { value: 3, suffix: "+", label: "Projects built" },
    { value: certificates.length, suffix: "", label: "Certificates earned" },
    { value: 1, suffix: "+", label: "Years learning" },
    { value: 100, suffix: "%", label: "Curiosity" },
  ],
facts: [
  { q: "Currently learning", a: "Generative AI and AI application development" },
  { q: "Favourite thing to build", a: "Interactive web applications and AI-powered tools" },
  { q: "Outside of code", a: "Exploring new ideas and creating content" },
],

  // ---------- CONTACT ----------
  contact: {
    email: "likitha30muttineni@gmail.com",
    //phone: "[+00 00000 00000]",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/likitha-muthineni-38095a281/?isSelfProfile=true" },
      { label: "GitHub", url: "https://github.com/Likitha-Muthineni" },
      { label: "Resume", url: "" },
    ],
  },
};

export const skills = [
  {
    title: "Backend",
    icon: "⚙",
    items: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "Hibernate",
      "Spring Data JPA",
      "JPA Repositories",
      "REST APIs",
      "JWT Authentication",
    ],
  },
  {
    title: "Frontend",
    icon: "⟨⟩",
    items: ["React", "JavaScript", "HTML", "CSS", "Bootstrap"],
  },
  {
    title: "Data & APIs",
    icon: "▤",
    items: ["MySQL", "SQL", "JSON", "Postman", "API Integration"],
  },
  {
    title: "AI exploration",
    icon: "✦",
    items: [
      "Generative AI",
      "LLM Applications",
      "Prompt Engineering",
      "Ollama",
      "AI API Integration",
      "Streamlit",
    ],
  },
];

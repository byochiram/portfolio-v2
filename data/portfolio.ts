export type Skill = {
  name: string;
  short: string;
};

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  visual: "auction" | "academic" | "training" | "game" | "data";
  previewUrl: string;
  screenshots?: string[];
  kind: "Web App" | "Game" | "Data";
  badge?: string;
  gameUrl?: string;
  gameIcon?: string;
};

export const portfolio = {
  name: "Rosidah Rahmati",
  initials: "RR",
  role: "Software Developer",
  tagline:
    "I enjoy building practical software projects — from web-based systems to data-driven solutions. Fresh graduate from Informatics, Diponegoro University with a passion for clean code and real-world problem solving.",
  location: "Batam, Indonesia",
  email: "rosidah.career@gmail.com",
  availability: "Open to entry-level IT opportunities",
  gpa: "3.85 / 4.00",
  university: "Diponegoro University",
  major: "Informatics",
  studyPeriod: "Aug 2022 — 4 Mar 2026",
  studyDuration: "3 years 6 months",
  graduationDate: "4 March 2026",
  social: {
    github: "https://github.com/byochiram",
    linkedin: "https://www.linkedin.com/in/rosidah-rahmati/",
    email: "mailto:rosidah.career@gmail.com",
  },
  about: [
    "I graduated with a Bachelor's degree in Informatics from Diponegoro University on 4 March 2026, completing my study in 3 years and 6 months with a GPA of 3.85/4.00.",
    "Most of my hands-on experience comes from building web-based systems through academic projects, internship work, and thesis development. Those experiences shaped my understanding of application flow, database structure, and practical software development.",
    "I'm interested in entry-level technology roles where I can contribute to software development, cloud implementation, and data-related projects.",
  ],
  skills: [
    { name: "Laravel", short: "LV" },
    { name: "PHP", short: "PH" },
    { name: "TypeScript", short: "TS" },
    { name: "JavaScript", short: "JS" },
    { name: "React", short: "R" },
    { name: "MySQL", short: "MY" },
    { name: "Tailwind CSS", short: "TW" },
    { name: "Bootstrap", short: "BS" },
    { name: "Git", short: "G" },
    { name: "GitHub", short: "GH" },
    { name: "REST APIs", short: "API" },
    { name: "Blade", short: "BL" },
    { name: "HTML / CSS", short: "HC" },
    { name: "Python", short: "PY" },
    { name: "Figma", short: "FG" },
    { name: "Oracle Cloud", short: "OC" },
    { name: "Nginx", short: "NX" },
    { name: "Postman", short: "PM" },
    { name: "SQL", short: "SQL" },
    { name: "Database Design", short: "DB" },
  ] satisfies Skill[],
  experience: {
    role: "Intern Developer",
    company: "BPSDMD Jawa Tengah",
    period: "Internship",
    bullets: [
      "Rebuilt a legacy native PHP workflow into a structured admin-side training registration system for Civil Servants (ASN) across Central Java.",
      "Delivered 28 use cases across training management, participant validation, certificates, dashboard analytics, and user management.",
      "Integrated MANTRA API to automate ASN identity validation and reduce manual participant data entry.",
      "Designed 3 core database tables and executed 144 black-box test scenarios before handover.",
    ],
    technologies: ["Laravel", "PHP", "Blade", "MySQL", "Bootstrap"],
  },
  projects: [
    {
      title: "Tempus Auctions",
      subtitle: "PT. Tempus Collective Indonesia — Thesis Project",
      description:
        "A web-based auction platform built as an undergraduate thesis project to extend Tempus Collective's fixed-price sales model into an online bidding system.",
      bullets: [
        "Built an end-to-end auction flow from catalog browsing to winner transaction",
        "Delivered workflows across 4 roles: Guest, Bidder, Admin, and Superadmin",
        "Engineered anti-sniping logic, bid validation, email verification, checkout, shipping cost calculation, and winner transactions",
        "Validated 17 use cases through 161 black-box test scenarios",
      ],
      tags: ["Laravel", "PHP", "Blade", "Tailwind CSS", "JavaScript", "MySQL"],
      liveUrl: "https://auctions.kakros.id/",
      repoUrl: "https://github.com/byochiram/watch-auction-system",
      visual: "auction",
      previewUrl: "https://my.rosispace.workers.dev/projects/tempus/preview-1.webp",
      screenshots: [
        "https://my.rosispace.workers.dev/projects/tempus/preview-1.webp",
        "https://my.rosispace.workers.dev/projects/tempus/preview-2.webp",
        "https://my.rosispace.workers.dev/projects/tempus/preview-3.webp",
      ],
      kind: "Web App",
      badge: "Live Project",
    },
    {
      title: "SiGMA",
      subtitle: "Academic Capstone — 1st Place Winner",
      description:
        "An academic capstone project simulating a university semester study plan registration system, focused on academic advisor approval workflows.",
      bullets: [
        "Built the Academic Advisor module for reviewing student study plan submissions",
        "Delivered 4 core workflows: IRS approval, revision permission, cancellation permission, and student recap",
        "Implemented filtering, status tracking, bulk approval, validation rules, and PDF printing",
        "Won 1st place in the Software Project course Capstone competition",
      ],
      tags: ["Laravel", "PHP", "Blade", "Tailwind CSS", "Bootstrap", "MySQL"],
      liveUrl: "https://sigma.kakros.id/",
      repoUrl: "https://github.com/byochiram/SigmaPPL",
      visual: "academic",
      previewUrl: "https://my.rosispace.workers.dev/projects/sigma/preview-1.webp",
      screenshots: [
        "https://my.rosispace.workers.dev/projects/sigma/preview-1.webp",
        "https://my.rosispace.workers.dev/projects/sigma/preview-2.webp",
        "https://my.rosispace.workers.dev/projects/sigma/preview-3.webp",
      ],
      kind: "Web App",
      badge: "1st Place",
    },
    {
      title: "SIPP",
      subtitle: "BPSDMD Jawa Tengah — Internship Project",
      description:
        "An internal admin-side training registration system for Civil Servants (ASN) across Central Java, developed during internship at BPSDMD Jawa Tengah.",
      bullets: [
        "Rebuilt a legacy native PHP workflow into a structured admin-side system",
        "Delivered 28 use cases across training management, participant validation, certificates, and dashboard analytics",
        "Integrated MANTRA API to automate ASN identity validation",
        "Executed 144 black-box test scenarios before handover",
      ],
      tags: ["Laravel", "PHP", "Blade", "MySQL", "Bootstrap"],
      liveUrl: "#",
      repoUrl: "#",
      visual: "training",
      previewUrl: "https://my.rosispace.workers.dev/projects/sipp/preview-1.webp",
      screenshots: [
        "https://my.rosispace.workers.dev/projects/sipp/preview-1.webp",
        "https://my.rosispace.workers.dev/projects/sipp/preview-2.webp",
        "https://my.rosispace.workers.dev/projects/sipp/preview-3.webp",
      ],
      kind: "Web App",
      badge: "Internship",
    },
    {
      title: "Mall Kakros",
      subtitle: "E-commerce Marketplace Platform",
      description:
        "A web-based marketplace / e-commerce platform with user authentication and a storefront flow, deployed on a live domain.",
      bullets: [
        "User authentication and account access",
        "Product catalog and storefront browsing",
        "Deployed live at mall.kakros.id",
        "Description and stack to be confirmed with the owner",
      ],
      tags: ["Laravel", "PHP", "MySQL"],
      liveUrl: "https://mall.kakros.id/",
      repoUrl: "#",
      visual: "auction",
      previewUrl: "",
      kind: "Web App",
      badge: "Live Project",
    },
    {
      title: "Todo App",
      subtitle: "Task Management Web App",
      description:
        "A lightweight task-management web app for creating, tracking, and completing tasks, deployed on Cloudflare Pages.",
      bullets: [
        "Create, complete, and manage tasks",
        "Fast static deployment on Cloudflare Pages",
        "Responsive, browser-based interface",
        "Description and stack to be confirmed with the owner",
      ],
      tags: ["JavaScript", "Cloudflare Pages"],
      liveUrl: "https://todo-app-bmg.pages.dev/",
      repoUrl: "#",
      visual: "academic",
      previewUrl: "",
      kind: "Web App",
      badge: "Live App",
    },
    {
      title: "Pesawat Ring Runner",
      subtitle: "Browser Arcade Runner Game",
      description:
        "An airplane ring-runner arcade game playable directly in the browser, hosted on GitHub Pages.",
      bullets: [
        "Fly a plane through a sequence of rings",
        "Runs in the browser with no installation",
        "Playable on desktop and mobile",
        "Hosted on GitHub Pages",
      ],
      tags: ["Web Game", "JavaScript"],
      liveUrl: "https://byochiram.github.io/pesawat-ring-runner/web/",
      repoUrl: "#",
      visual: "game",
      previewUrl: "",
      gameUrl: "https://byochiram.github.io/pesawat-ring-runner/web/",
      kind: "Game",
      badge: "Ring Runner",
    },
    {
      title: "Number Games",
      subtitle: "Nine Number-Based Mini Games — Progressive Web App",
      description:
        "A collection of nine responsive number games covering arithmetic speed, patterns, matching, logic, guessing, Sudoku, and memory.",
      bullets: [
        "Built nine independent game modules inside one lightweight browser application",
        "Added touch, keyboard, sound, timer cleanup, and reusable game lifecycle controls",
        "Implemented offline support and subfolder-safe caching with a scoped service worker",
        "Optimized audio so large assets load only when a game needs them",
      ],
      tags: ["JavaScript", "PWA", "Service Worker", "HTML", "CSS"],
      liveUrl: "/games/number-games/index.html",
      repoUrl: "#",
      visual: "game",
      previewUrl: "",
      gameUrl: "/games/number-games/index.html",
      gameIcon: "/games/number-games/icon-192.png",
      kind: "Game",
      badge: "9 Mini Games",
    },
    {
      title: "Guess Country",
      subtitle: "Geography Guessing Game — Progressive Web App",
      description:
        "A clue-based country guessing game with progressively revealed hints from geography, culture, history, food, and landmarks.",
      bullets: [
        "Accepts localized and international aliases such as Brasil and Brazil",
        "Uses a shuffled country deck with attempts, score, streak, and best-score tracking",
        "Renders clues safely and efficiently without external APIs or dependencies",
        "Works offline and can be installed independently as a PWA",
      ],
      tags: ["JavaScript", "PWA", "Game Logic", "Web Audio"],
      liveUrl: "/games/guess-country/index.html",
      repoUrl: "#",
      visual: "game",
      previewUrl: "",
      gameUrl: "/games/guess-country/index.html",
      gameIcon: "/games/guess-country/icon-192.png",
      kind: "Game",
      badge: "Geography Game",
    },
    {
      title: "Flappy Bird",
      subtitle: "Canvas Arcade Game — Progressive Web App",
      description:
        "A lightweight Flappy Bird-style arcade game with responsive canvas controls, procedural audio, particles, scoring, and increasing speed.",
      bullets: [
        "Supports pointer, touch, and keyboard controls across desktop and mobile",
        "Uses a fixed timestep for consistent gameplay on 60–144 Hz displays",
        "Stops rendering when the page is hidden to reduce CPU and battery usage",
        "Works offline and can be installed independently as a PWA",
      ],
      tags: ["Canvas", "JavaScript", "PWA", "Web Audio"],
      liveUrl: "/games/flappy-bird/index.html",
      repoUrl: "#",
      visual: "game",
      previewUrl: "",
      gameUrl: "/games/flappy-bird/index.html",
      gameIcon: "/games/flappy-bird/icon-192.png",
      kind: "Game",
      badge: "Canvas Game",
    },
    {
      title: "PCOS Diagnosis",
      subtitle: "PCOS Risk Prediction — Streamlit ML App",
      description:
        "An interactive machine-learning app that estimates PCOS (Polycystic Ovary Syndrome) risk from clinical and lifestyle inputs, deployed on Streamlit Cloud.",
      bullets: [
        "Interactive form for clinical and lifestyle inputs",
        "Trained classification model behind the prediction",
        "Instant risk result rendered in the browser",
        "Publicly deployed on Streamlit Cloud",
      ],
      tags: ["Python", "Streamlit", "scikit-learn", "Pandas"],
      liveUrl: "https://pcos-diagnosis.streamlit.app/",
      repoUrl: "#",
      visual: "data",
      previewUrl: "",
      kind: "Data",
      badge: "ML App",
    },
    {
      title: "Student Lifestyle Clustering",
      subtitle: "Unsupervised Student Segmentation",
      description:
        "A clustering app that groups students by lifestyle patterns to reveal distinct behavioral segments, deployed on Streamlit Cloud.",
      bullets: [
        "Explores student lifestyle data",
        "Unsupervised clustering to form student segments",
        "Interactive visualization of the resulting clusters",
        "Publicly deployed on Streamlit Cloud",
      ],
      tags: ["Python", "Streamlit", "scikit-learn", "Pandas"],
      liveUrl: "https://student-lifestyle-clustering.streamlit.app/",
      repoUrl: "#",
      visual: "data",
      previewUrl: "",
      kind: "Data",
      badge: "Clustering",
    },
    {
      title: "Predict Customer Segment",
      subtitle: "Customer Segmentation Prediction",
      description:
        "An app that predicts a customer's segment from their attributes to support targeting and marketing decisions, deployed on Streamlit Cloud.",
      bullets: [
        "Input customer attributes through the form",
        "Model predicts the customer segment",
        "Instant result for quick decision support",
        "Publicly deployed on Streamlit Cloud",
      ],
      tags: ["Python", "Streamlit", "scikit-learn", "Pandas"],
      liveUrl: "https://predict-customer-segment.streamlit.app/",
      repoUrl: "#",
      visual: "data",
      previewUrl: "",
      kind: "Data",
      badge: "Segmentation",
    },
  ] satisfies Project[],
  awards: [
    { title: "Alibaba Cloud Certified Associate", issuer: "Alibaba Cloud", year: "Valid until Nov 2026" },
    { title: "Next Generation ECS and OSS Technologies", issuer: "Alibaba Cloud · Apsara Conference 2021", year: "Valid until Nov 2026" },
    { title: "Database Design", issuer: "Oracle Academy", year: "Course Certificate" },
    { title: "Database Programming with SQL", issuer: "Oracle Academy", year: "Course Certificate" },
  ],
};

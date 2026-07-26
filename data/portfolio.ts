export type Skill = {
  name: string;
  short: string;
};

/** One phase of the delivery process, and what was actually produced in it. */
export type ProcessStep = {
  phase: string;
  did: string;
  artifact?: string;
};

export type Metric = {
  value: string;
  label: string;
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

  // Case-study fields. Present on the documented projects; the modal degrades
  // gracefully to a short overview when they are absent.
  problem?: string;
  solution?: string;
  role?: string;
  method?: string;
  hardPart?: { title: string; body: string };
  metrics?: Metric[];
  process?: ProcessStep[];
  diagram?: "tempus" | "sigma" | "sipp";
  /** Shown when a project cannot simply be opened in a browser. */
  access?: string;
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
      tags: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS", "JavaScript"],
      liveUrl: "https://auctions.kakros.id/",
      repoUrl: "https://github.com/byochiram/watch-auction-system",
      visual: "auction",
      previewUrl: "/projects/tempus/preview-1.webp",
      screenshots: [
        "/projects/tempus/preview-1.webp",
        "/projects/tempus/preview-2.webp",
        "/projects/tempus/preview-3.webp",
        "/projects/tempus/preview-4.webp",
        "/projects/tempus/preview-5.webp",
        "/projects/tempus/preview-6.webp",
        "/projects/tempus/preview-7.webp",
        "/projects/tempus/preview-8.webp",
        "/projects/tempus/preview-9.webp",
      ],
      kind: "Web App",
      badge: "Live Project",
      problem:
        "Tempus sold collectible watches at a fixed price on WooCommerce. But a collectible's value moves with rarity, condition and demand, so a price set by one side often misses what the market would actually pay. Part of the selling also happened over Instagram DMs, outside the system entirely.",
      solution:
        "A web auction platform that lets the market set the price, covering the full path from scheduling a lot to bidding, winner payment and shipping.",
      role: "Solo — full-stack, from requirements to testing",
      method: "ICONIX Process",
      hardPart: {
        title: "Keeping the closing minutes honest",
        body:
          "Two rules do the work. Anti-sniping extends the closing time when a bid lands in the final moments, so a last-second bid cannot steal a lot before anyone can respond. And an unpaid win is never handed to the runner-up — the lot is rescheduled instead. That removes the incentive to win a lot cheaply and simply walk away. Payment runs on a 24-hour invoice; miss it and bidding is suspended for a week while the account still works.",
      },
      metrics: [
        { value: "17", label: "use cases" },
        { value: "161", label: "test scenarios" },
        { value: "4", label: "user roles" },
        { value: "100%", label: "tests passed" },
      ],
      process: [
        {
          phase: "Requirement Gathering",
          did: "Walked the live WooCommerce store and the Instagram channel to see how selling actually worked, then interviewed the owner to confirm the flow and pin down the auction rules.",
          artifact: "AS-IS and TO-BE activity diagrams",
        },
        {
          phase: "Requirement Analysis",
          did: "Turned the interview into functional requirements, then modelled the domain and mapped 17 use cases across guest, bidder, admin and superadmin.",
          artifact: "Domain model, use case diagram",
        },
        {
          phase: "Preliminary Design",
          did: "Traced every use case through both its success path and its failure paths, which is where the payment-timeout and suspension rules got settled.",
          artifact: "Robustness diagrams",
        },
        {
          phase: "Detailed Design",
          did: "Specified object interactions and the database structure, and drew the screens before writing them.",
          artifact: "Sequence diagram, class diagram, 25 GUI storyboards",
        },
        {
          phase: "Implementation",
          did: "Built it in Laravel with Blade: catalog and lot detail, email-verified registration, bidding with anti-sniping, payment through a gateway, and shipping cost from a courier API.",
          artifact: "Working system",
        },
        {
          phase: "Testing",
          did: "Ran 161 black-box scenarios over all 17 use cases before handover; every scenario returned the expected result.",
          artifact: "Black-box test report",
        },
      ],
      diagram: "tempus",
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
      tags: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS", "Bootstrap"],
      liveUrl: "https://sigma.kakros.id/",
      repoUrl: "https://github.com/byochiram/SigmaPPL",
      visual: "academic",
      previewUrl: "/projects/sigma/preview-1.webp",
      screenshots: [
        "/projects/sigma/preview-1.webp",
        "/projects/sigma/preview-2.webp",
        "/projects/sigma/preview-3.webp",
        "/projects/sigma/preview-4.webp",
        "/projects/sigma/preview-5.webp",
        "/projects/sigma/preview-6.webp",
        "/projects/sigma/preview-7.webp",
        "/projects/sigma/preview-8.webp",
        "/projects/sigma/preview-9.webp",
        "/projects/sigma/preview-10.webp",
        "/projects/sigma/preview-11.webp",
        "/projects/sigma/preview-12.webp",
        "/projects/sigma/preview-13.webp",
        "/projects/sigma/preview-14.webp",
      ],
      kind: "Web App",
      badge: "1st Place",
      problem:
        "Every active semester, UNDIP students file an IRS study plan under academic rules and hard deadlines — two weeks to revise, four to cancel. Their academic advisor has to approve each one, grant permission for revisions and cancellations, know who has not filed yet, and produce IRS history per advisee. Tracking that by hand across a full cohort is slow and easy to lose.",
      solution:
        "A web system for the whole IRS cycle. I owned the academic advisor side of it.",
      role:
        "Team capstone — I built the Academic Advisor module (SRS-IRS-005 to 008)",
      method: "ICONIX Process",
      hardPart: {
        title: "Approval that scales past one student at a time",
        body:
          "An advisor carries a whole cohort, so approving submissions one by one does not hold up. The module leans on filtering and clear status states, with bulk approval for the routine cases so attention goes to the exceptions. It also had to answer the question advisors ask most — who has not filed yet — and print approved IRS history to PDF per advisee.",
      },
      metrics: [
        { value: "4", label: "advisor workflows" },
        { value: "1st", label: "place, capstone" },
        { value: "PDF", label: "history export" },
      ],
      process: [
        {
          phase: "Requirement Gathering",
          did: "Team mapped the existing IRS rules — filing windows, revision and cancellation periods — into a written spec.",
          artifact: "Business process, SRS",
        },
        {
          phase: "Requirement Analysis",
          did: "Split the system between student and advisor actors; my four requirements covered approval, permissions, recap and advisee history.",
          artifact: "Use case diagram, domain model",
        },
        {
          phase: "Preliminary Design",
          did: "Worked each advisor use case through its success and failure paths before building.",
          artifact: "Robustness diagrams",
        },
        {
          phase: "Detailed Design",
          did: "Specified the interactions and screens for the advisor module.",
          artifact: "Sequence diagram, class diagram, storyboards",
        },
        {
          phase: "Implementation",
          did: "Built the advisor module in Laravel: approval queue with filters and bulk actions, revision and cancellation permissions, cohort recap, and PDF export.",
          artifact: "Advisor module",
        },
      ],
      diagram: "sigma",
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
      tags: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap"],
      liveUrl: "#",
      repoUrl: "#",
      visual: "training",
      previewUrl: "/projects/sipp/preview-1.webp",
      screenshots: [
        "/projects/sipp/preview-1.webp",
        "/projects/sipp/preview-2.webp",
        "/projects/sipp/preview-3.webp",
        "/projects/sipp/preview-4.webp",
      ],
      kind: "Web App",
      badge: "Internship",
      problem:
        "BPSDMD Central Java runs training for civil servants across the province, but registration sat on a legacy native-PHP workflow. Participant identity was typed in by hand, which is slow at provincial scale and lets typos through into records that later become certificates.",
      solution:
        "A rebuilt admin-side registration system on Laravel covering training management, participant validation, certificates and dashboard analytics.",
      role: "Intern developer — admin side of the system",
      hardPart: {
        title: "Letting the source of truth do the typing",
        body:
          "Instead of trusting hand-typed civil-servant data, the system calls the government MANTRA API to validate identity at entry, so records start correct rather than being corrected later. Certificate generation is guarded too — the system compares the training date against today before it will issue anything, which stops certificates being produced for training that has not happened yet.",
      },
      metrics: [
        { value: "28", label: "use cases" },
        { value: "144", label: "test scenarios" },
        { value: "3", label: "core tables" },
      ],
      process: [
        {
          phase: "Requirement Gathering",
          did: "Studied the legacy native-PHP workflow already in use and confirmed what the training administrators actually needed it to do.",
          artifact: "Requirement list",
        },
        {
          phase: "Design",
          did: "Restructured the flow into 28 use cases and designed three core tables to replace the ad-hoc legacy structure.",
          artifact: "Use cases, database design",
        },
        {
          phase: "Implementation",
          did: "Built the admin system in Laravel: training management, participant validation through the MANTRA API, certificate generation, dashboard analytics and user management.",
          artifact: "Working system",
        },
        {
          phase: "Testing",
          did: "Ran 144 black-box scenarios across the use cases before handing the system over to the agency.",
          artifact: "Black-box test report",
        },
      ],
      diagram: "sipp",
      access:
        "Internal government system — it runs inside BPSDMD Central Java and is not publicly accessible, so the screenshots are the only view of it.",
    },
    {
      title: "Mall Tenant Management",
      subtitle: "Tenancy, leasing and billing system",
      description:
        "A management system for the tenant side of a shopping mall: units and floors, lease contracts and renewals, invoicing, payments with uploaded proof, and automated reminders.",
      bullets: [
        "Tenant directory with contacts, documents, notes and unit assignments",
        "Floor plan with per-unit area, rate per m², and occupancy status",
        "Lease contracts with renewal and termination, service charge and revenue share",
        "Invoicing with bulk generation, payment verification, and an aging report",
        "Seven roles with their own permissions, plus a self-service tenant portal",
      ],
      tags: ["React", "Express", "PostgreSQL", "Prisma", "JWT", "Nginx"],
      liveUrl: "https://mall.kakros.id/",
      repoUrl: "https://github.com/byochiram/mall-tenant-app",
      visual: "auction",
      previewUrl: "/projects/mall/preview-1.webp",
      screenshots: [
        "/projects/mall/preview-1.webp",
        "/projects/mall/preview-2.webp",
        "/projects/mall/preview-3.webp",
        "/projects/mall/preview-4.webp",
        "/projects/mall/preview-5.webp",
        "/projects/mall/preview-6.webp",
        "/projects/mall/preview-7.webp",
        "/projects/mall/preview-8.webp",
        "/projects/mall/preview-9.webp",
        "/projects/mall/preview-10.webp",
        "/projects/mall/preview-11.webp",
      ],
      kind: "Web App",
      badge: "Live Project",
      problem:
        "A mall's tenancy usually lives in spreadsheets and chat threads. Lease renewals get noticed late, invoices go out by hand, and proof of payment arrives as a photo in a conversation with nothing tying it back to the invoice it settles.",
      solution:
        "One system for the whole tenancy lifecycle — from assigning a unit and signing a lease, through invoicing and payment, to the reminders that keep it moving.",
      role: "Solo — full-stack, React front end and Express API",
      hardPart: {
        title: "Making money movement traceable",
        body:
          "Billing is where a system like this earns trust, so nothing is a loose number. An invoice carries its own line items, a payment points at the invoice it settles and carries the uploaded proof file, and every change lands in an activity log. Reminders run as a scheduled job rather than something a person has to remember, and sent mail is recorded in an email log so a missing notice can actually be traced.",
      },
      metrics: [
        { value: "17", label: "data models" },
        { value: "11", label: "API modules" },
        { value: "7", label: "roles" },
        { value: "6", label: "test suites" },
      ],
      process: [
        {
          phase: "Data modelling",
          did: "Modelled the tenancy domain before writing endpoints — floors and units, tenants and their contacts, leases and renewals, invoices and line items, payments, notifications and logs.",
          artifact: "Prisma schema, 17 models",
        },
        {
          phase: "API design",
          did: "Split the server into modules per concern instead of one route file: auth, tenant, unit, contract, billing, payment, notification, dashboard, upload, activity log and a tenant portal.",
          artifact: "11 Express modules",
        },
        {
          phase: "Implementation",
          did: "Built JWT auth with hashed passwords and seven roles guarded per endpoint — leasing staff cannot touch finance, and a tenant only ever sees their own unit. Added schema validation on every request, upload for payment proof, and a nightly job for reminder emails.",
          artifact: "React client, Express API, role guards",
        },
        {
          phase: "Testing",
          did: "Wrote integration tests for the parts where mistakes cost money — auth, billing, contracts, tenants, units and notifications.",
          artifact: "Jest test suites",
        },
        {
          phase: "Deployment",
          did: "First planned a split free-tier stack — Vercel, Render and Neon — but the free API tier slept when idle and wiped uploaded payment proof on every redeploy, which a billing system cannot live with. Moved the whole stack onto a single Tencent Cloud VPS instead, where the files persist and there is no cold start.",
          artifact: "Tencent Cloud VPS, mall.kakros.id",
        },
      ],
    },
    {
      title: "Todo App",
      subtitle: "Offline-first task app — installable PWA",
      description:
        "A task app with priorities, categories, deadlines, drag-and-drop ordering, search and undo. It runs entirely on the device, works offline, and installs like a native app.",
      bullets: [
        "Priorities, categories, and deadlines down to the time of day",
        "Drag and drop to reorder, with undo after a delete",
        "Search, filter by state or category, and export to JSON",
        "Works offline and installs as a PWA on phone or desktop",
      ],
      tags: ["React", "Vite", "PWA", "JavaScript"],
      liveUrl: "https://todo-app-bmg.pages.dev/",
      repoUrl: "https://github.com/byochiram/todo-app",
      visual: "academic",
      previewUrl: "/projects/todo/preview-1.webp",
      screenshots: ["/projects/todo/preview-1.webp"],
      kind: "Web App",
      badge: "Live App",
      problem:
        "Task apps tend to sit at one of two extremes: too bare to be useful, or an account-and-sync product for what is really a personal list. I wanted the useful features without handing my list to a server.",
      solution:
        "A task app that keeps everything on the device, still works with no connection, and installs to the home screen.",
      role: "Solo — front end, no backend by design",
      hardPart: {
        title: "Reordering and undo, written by hand",
        body:
          "Drag-and-drop and undo are the two features people reach for a library to get. I wrote them as custom hooks instead — one holding the drag state and drop position, one keeping the last deleted item long enough to restore it. Doing it by hand meant understanding the pointer events and state transitions rather than configuring someone else's abstraction, and it kept the dependency list to React and the router.",
      },
      metrics: [
        { value: "8", label: "components" },
        { value: "3", label: "custom hooks" },
        { value: "5", label: "categories" },
        { value: "PWA", label: "works offline" },
      ],
      process: [
        {
          phase: "Scope",
          did: "Decided up front that the list stays on the device — that removed accounts, a server and a database from the problem, and made offline the default rather than a feature.",
          artifact: "localStorage as the store",
        },
        {
          phase: "Structure",
          did: "Split state into custom hooks — todos, drag and drop, undo — so the page components stay about layout and the logic stays testable on its own.",
          artifact: "useTodos, useDragDrop, useUndo",
        },
        {
          phase: "Implementation",
          did: "Built the task features on top of that: priority and category, deadline with time, search and filters, JSON export, and a light and dark theme.",
          artifact: "React + Vite app",
        },
        {
          phase: "Offline",
          did: "Added a service worker and manifest so it installs to the home screen and keeps working with no connection, then shipped it to Cloudflare Pages.",
          artifact: "Installable PWA",
        },
      ],
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
      repoUrl: "https://github.com/byochiram/pesawat-ring-runner",
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
      repoUrl: "https://github.com/byochiram/number-games",
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
      subtitle: "Clinical risk prediction — model + dashboard",
      description:
        "A model that estimates PCOS risk from eleven clinical indicators, paired with a Power BI dashboard that shows which symptoms actually separate the two groups.",
      bullets: [
        "Random Forest and XGBoost compared on the same held-out test set",
        "SMOTE applied to correct a two-to-one class imbalance",
        "Feature importance surfaced so a prediction can be explained",
        "Power BI dashboard profiling follicle count, weight gain and hair growth",
      ],
      tags: ["Python", "scikit-learn", "XGBoost", "Streamlit", "Power BI"],
      liveUrl: "https://pcos-diagnosis.streamlit.app/",
      repoUrl: "https://github.com/byochiram/pcos-diagnosis",
      visual: "data",
      previewUrl: "/projects/pcos/preview-1.webp",
      screenshots: ["/projects/pcos/preview-1.webp"],
      kind: "Data",
      badge: "ML App",
      problem:
        "PCOS is diagnosed from a scatter of clinical indicators, and the dataset reflects how uneven that is — of 541 patients, only about a third actually have it. Train a model on that as-is and it learns the cheapest possible trick: answer \"no\" every time and still look accurate.",
      solution:
        "A model that is corrected for the imbalance and can explain itself, plus a dashboard that shows which indicators do the separating.",
      role: "Solo — data preparation, modelling and dashboard",
      hardPart: {
        title: "An accurate model that is still useless",
        body:
          "With a 67/33 split, always guessing \"not PCOS\" scores 67% accuracy while catching zero actual cases — which is the one outcome that matters here. SMOTE rebalances the training data so the minority class carries real weight, and Random Forest and XGBoost are then compared on the same untouched test set rather than on the resampled data. The app also shows feature importance, because a risk score a person cannot interrogate is not something to hand to anyone. It is labelled an educational tool throughout, not a diagnosis.",
      },
      metrics: [
        { value: "541", label: "patients" },
        { value: "11", label: "clinical features" },
        { value: "2", label: "models compared" },
        { value: "33%", label: "positive class" },
      ],
      process: [
        {
          phase: "Data understanding",
          did: "Profiled the Kaggle PCOS dataset and found the class imbalance early — roughly two negatives for every positive — which shaped every decision after it.",
          artifact: "Exploratory analysis",
        },
        {
          phase: "Feature selection",
          did: "Narrowed 40+ recorded columns down to the 11 clinical indicators that actually carried signal, rather than feeding the model everything and hoping.",
          artifact: "11 selected features",
        },
        {
          phase: "Modelling",
          did: "Applied SMOTE to the training split only, then trained Random Forest and XGBoost and compared them on the same held-out test set.",
          artifact: "Two candidate models",
        },
        {
          phase: "Explainability",
          did: "Exposed feature importance in the app so a prediction can be traced back to the indicators behind it, and put a medical disclaimer on every screen.",
          artifact: "Feature importance view",
        },
        {
          phase: "Dashboard",
          did: "Built a Power BI view of the same data — diagnosis composition, follicle count, weight gain and hair growth per group — to show the patterns without running the model.",
          artifact: "Power BI dashboard",
        },
      ],
    },
    {
      title: "Student Lifestyle Clustering",
      subtitle: "Finding student types with K-Means",
      description:
        "K-Means over the daily habits of 2,000 students — study, sleep, social and physical hours against GPA and stress — with a live app that places any new student on the cluster map.",
      bullets: [
        "K-Means over seven lifestyle features, mapped to 2D with PCA",
        "Move the sliders and see which cluster you land in, live",
        "Cluster averages with a written interpretation of each group",
        "Batch mode: upload a CSV, cluster everyone, download the result",
      ],
      tags: ["Python", "scikit-learn", "K-Means", "Streamlit", "Power BI"],
      liveUrl: "https://student-lifestyle-clustering.streamlit.app/",
      repoUrl: "https://github.com/byochiram/student-lifestyle-clustering",
      visual: "data",
      previewUrl: "/projects/student/preview-1.webp",
      screenshots: ["/projects/student/preview-1.webp"],
      kind: "Data",
      badge: "Clustering",
      problem:
        "Advice for students is usually one-size-fits-all, but 2,000 students do not share one lifestyle. There are no labels in this data saying which type someone is, so the groups have to be found rather than looked up.",
      solution:
        "Cluster students by how they actually spend a day, then let anyone drop their own habits in and see which group they fall into.",
      role: "Solo — clustering, app and dashboard",
      hardPart: {
        title: "The result that argued with the assumption",
        body:
          "The expectation going in was that stress drags grades down. The data says the opposite: average GPA climbs with stress level — 2.82 at low, 3.02 at moderate, 3.26 at high — and so do study hours, from 5.5 to 8.4 a day. Stress here tracks effort, not failure. That is worth stating carefully rather than dressing up as a finding about wellbeing, and it is also why the dashboard reports stress alongside hours instead of on its own. More than half of the cohort sits in the high-stress group.",
      },
      metrics: [
        { value: "2,000", label: "students" },
        { value: "7", label: "lifestyle features" },
        { value: "51%", label: "in high stress" },
        { value: "3.12", label: "average GPA" },
      ],
      process: [
        {
          phase: "Data understanding",
          did: "Profiled seven daily-habit features — study, extracurricular, sleep, social and physical hours, against GPA and stress level — and checked their spread before clustering anything.",
          artifact: "Exploratory analysis",
        },
        {
          phase: "Preparation",
          did: "Scaled the features so hours and GPA sit on comparable ranges, since K-Means measures plain distance and would otherwise let the largest numbers decide the clusters.",
          artifact: "Scaled feature set",
        },
        {
          phase: "Clustering",
          did: "Fitted K-Means, then reduced to two dimensions with PCA so the clusters could actually be looked at rather than only tabulated.",
          artifact: "K-Means model, PCA map",
        },
        {
          phase: "Interpretation",
          did: "Wrote out what each cluster means in plain terms from its averages, so the output is a description of a student rather than a number.",
          artifact: "Cluster profiles",
        },
        {
          phase: "Delivery",
          did: "Shipped a Streamlit app with sliders for one student and CSV upload for many, plus a Power BI dashboard tying stress to GPA and study hours.",
          artifact: "Streamlit app, Power BI dashboard",
        },
      ],
    },
    {
      title: "Predict Customer Segment",
      subtitle: "Four-way segment classification for market entry",
      description:
        "A Random Forest that sorts customers into segments A to D from nine demographic and behavioural fields, built around an automotive company entering a new market with 2,627 unlabelled prospects.",
      bullets: [
        "Predicts one customer with the probability of each of the four segments",
        "Bulk mode: upload a CSV of prospects and download them classified",
        "Segment profiles by age, work experience and family size",
        "Test-set accuracy shown in the app rather than claimed in a README",
      ],
      tags: ["Python", "scikit-learn", "Random Forest", "Streamlit", "Power BI"],
      liveUrl: "https://predict-customer-segment.streamlit.app/",
      repoUrl: "https://github.com/byochiram/customer-segmentation",
      visual: "data",
      previewUrl: "/projects/segment/preview-1.webp",
      screenshots: ["/projects/segment/preview-1.webp"],
      kind: "Data",
      badge: "Segmentation",
      problem:
        "An automotive company moving into a new market already knows how to talk to its existing customers, sorted into four segments. The 2,627 people in the new market carry no segment at all — and treating them as one undifferentiated audience wastes most of the outreach.",
      solution:
        "Learn the segment boundaries from the 8,068 customers who are already labelled, then apply them to the new market in bulk.",
      role: "Solo — modelling, app and dashboard",
      hardPart: {
        title: "Four classes, and a wrong answer that still costs",
        body:
          "Sorting into four segments is not a right-or-wrong call the way a yes-or-no model is; being wrong between two adjacent segments matters far less than being wrong across the board. So the app returns the probability of every segment, not just the winner — a prospect that comes back 45 percent B and 40 percent C is a genuinely different signal from one that is 95 percent B, and it lets a marketer decide how much to spend rather than trusting a single label.",
      },
      metrics: [
        { value: "8,068", label: "labelled customers" },
        { value: "2,627", label: "new prospects" },
        { value: "4", label: "segments" },
        { value: "9", label: "features" },
      ],
      process: [
        {
          phase: "Framing",
          did: "Took the business question as it was asked — which of four segments does an unseen prospect belong to — and treated it as multi-class classification rather than clustering, since the segments already existed.",
          artifact: "Problem definition",
        },
        {
          phase: "Data understanding",
          did: "Profiled the nine features across 8,068 labelled customers and checked segment balance, age spread and profession mix before modelling.",
          artifact: "Exploratory analysis",
        },
        {
          phase: "Modelling",
          did: "Trained a Random Forest over the labelled set and evaluated it on a holdout split, so the accuracy shown in the app is measured on data the model never saw.",
          artifact: "Random Forest classifier",
        },
        {
          phase: "Delivery",
          did: "Built both paths marketing would actually use: one prospect at a time with per-segment probabilities, and CSV in, classified CSV out for the whole new market.",
          artifact: "Streamlit app, bulk prediction",
        },
        {
          phase: "Dashboard",
          did: "Added a Power BI view of the customer base — segment composition, age groups, profession and spending score — so the segments can be understood without touching the model.",
          artifact: "Power BI dashboard",
        },
      ],
    },
  ] satisfies Project[],
  awards: [
    { title: "Alibaba Cloud Certified Associate", issuer: "Alibaba Cloud", year: "Valid until Nov 2026" },
    { title: "Next Generation ECS and OSS Technologies", issuer: "Alibaba Cloud · Apsara Conference 2021", year: "Valid until Nov 2026" },
    { title: "Database Design", issuer: "Oracle Academy", year: "Course Certificate" },
    { title: "Database Programming with SQL", issuer: "Oracle Academy", year: "Course Certificate" },
  ],
};

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
  /** Two letters, used on the lanyard pass as RR—26. */
  initials: "RR",
  /** Header wordmark, matching the kakros.id domain the site is deployed on. */
  brand: "KakRos",
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
      previewUrl: "/projects/tempus/preview-1.7459e355.webp",
      screenshots: [
        "/projects/tempus/preview-1.7459e355.webp",
        "/projects/tempus/preview-2.3fc352dc.webp",
        "/projects/tempus/preview-3.77479d3b.webp",
        "/projects/tempus/preview-4.207dd4a1.webp",
        "/projects/tempus/preview-5.22dbfc1f.webp",
        "/projects/tempus/preview-6.4ce33564.webp",
        "/projects/tempus/preview-7.b74e587a.webp",
        "/projects/tempus/preview-8.e1c550d6.webp",
        "/projects/tempus/preview-9.f8f893b8.webp",
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
      previewUrl: "/projects/mall/preview-1.83d54668.webp",
      screenshots: [
        "/projects/mall/preview-1.83d54668.webp",
        "/projects/mall/preview-2.433a6f47.webp",
        "/projects/mall/preview-3.2706030e.webp",
        "/projects/mall/preview-4.339c3d6a.webp",
        "/projects/mall/preview-5.bbaa47db.webp",
        "/projects/mall/preview-6.c02653e5.webp",
        "/projects/mall/preview-7.602b4753.webp",
        "/projects/mall/preview-8.9cfd6141.webp",
        "/projects/mall/preview-9.cd7b5e63.webp",
        "/projects/mall/preview-10.c04deaea.webp",
        "/projects/mall/preview-11.af8a9a84.webp",
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
      title: "KasirApp",
      subtitle: "Point of sale with audited stock and live payments",
      description:
        "A point of sale system for a shop: transactions and printed receipts, stock with a full audit trail, customers with points, purchase orders to suppliers, expenses, and profit reports. QRIS and virtual account payments run through a real gateway rather than being recorded by hand.",
      bullets: [
        "Cashier screen with barcode scan, keyboard shortcuts, and an 80mm printable receipt",
        "Every stock movement recorded with before and after values and who made it",
        "Purchase orders from draft to received, updating stock and cost price on arrival",
        "QRIS and virtual account paid through Midtrans, confirmed by signed webhook",
        "Two roles enforced on every API route, not just hidden in the sidebar",
      ],
      tags: ["Next.js", "TypeScript", "SQLite", "Tailwind CSS", "Midtrans", "Docker"],
      liveUrl: "https://kasir.kakros.id/",
      repoUrl: "https://github.com/byochiram/kasir-pos",
      visual: "auction",
      previewUrl: "",
      kind: "Web App",
      badge: "Live Project",
      problem:
        "A shop that records sales by hand cannot answer the questions that matter at closing time: which stock actually moved, whether the cash drawer matches what was sold, and whether the day made a profit once cost price is taken into account. Non-cash payments make it worse, because money can be marked as received without any trace that it ever arrived.",
      solution:
        "A point of sale where the server is the only source of truth for money and stock. Every transaction, stock movement and payment leaves a record that can be traced back, and the two payment methods that can be confirmed automatically are confirmed by the gateway rather than by the cashier.",
      hardPart: {
        title: "Making sure the money on screen actually arrived",
        body:
          "Two rules carry most of the weight. Money is never trusted from the client: the browser sends the raw discount and its type, never a computed amount, and the tax rate is always read from store settings rather than the request. And every non-cash method that is recorded by hand requires a proof number, enforced on the server, so an approval number from the card terminal or a transfer reference can be matched against the bank statement at the end of the day. QRIS and virtual account go further and are confirmed by Midtrans through a webhook verified with an SHA-512 signature, with a notification whose amount differs from the bill rejected outright. The cashier screen still polls the gateway every three seconds as a backup, because a webhook can arrive late or never; both paths are idempotent, so a redelivered notification cannot award customer points twice.",
      },
      access:
        "Live demo with seeded accounts — the credentials are in the repository README, and payments run on the Midtrans sandbox so nothing charges real money.",
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
      previewUrl: "/projects/sigma/preview-1.ab48cb1e.webp",
      screenshots: [
        "/projects/sigma/preview-1.ab48cb1e.webp",
        "/projects/sigma/preview-2.ce73bd1e.webp",
        "/projects/sigma/preview-3.e8dda98f.webp",
        "/projects/sigma/preview-4.83378a1d.webp",
        "/projects/sigma/preview-5.04033e55.webp",
        "/projects/sigma/preview-6.a389b060.webp",
        "/projects/sigma/preview-7.28e92a52.webp",
        "/projects/sigma/preview-8.7fc7ad09.webp",
        "/projects/sigma/preview-9.173e1c29.webp",
        "/projects/sigma/preview-10.030fb602.webp",
        "/projects/sigma/preview-11.ec3811ea.webp",
        "/projects/sigma/preview-12.6749ce79.webp",
        "/projects/sigma/preview-13.bc69bb93.webp",
        "/projects/sigma/preview-14.4a9eaa03.webp",
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
      previewUrl: "/projects/sipp/preview-1.f2031cd7.webp",
      screenshots: [
        "/projects/sipp/preview-1.f2031cd7.webp",
        "/projects/sipp/preview-2.66cfd044.webp",
        "/projects/sipp/preview-3.7e384583.webp",
        "/projects/sipp/preview-4.9bc45ed3.webp",
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
      previewUrl: "/projects/todo/preview-1.7647dccf.webp",
      screenshots: ["/projects/todo/preview-1.7647dccf.webp"],
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
      subtitle: "C++/OpenGL coursework, rebuilt as a 3D web game",
      description:
        "A flight game over a procedural city: steer a plane through every gate, each one scoring a point and speeding the game up. Originally a C++/OpenGL model for a computer graphics course, rebuilt in Three.js so it runs from a link.",
      bullets: [
        "Fly through gates — each one scores and makes the next one faster",
        "Target gate glows cyan, turns green the moment you are lined up",
        "Keyboard, mouse drag and touch, with scroll or pinch to zoom",
        "Three.js bundled locally, so the whole game runs offline",
      ],
      tags: ["Three.js", "WebGL", "JavaScript", "C++"],
      liveUrl: "/games/ring-runner/index.html",
      repoUrl: "https://github.com/byochiram/pesawat-ring-runner",
      visual: "game",
      previewUrl: "/projects/ring-runner/preview-1.a0e9af57.webp",
      screenshots: ["/projects/ring-runner/preview-1.a0e9af57.webp"],
      gameUrl: "/games/ring-runner/index.html",
      gameIcon: "/games/ring-runner/icon-192.png",
      kind: "Game",
      badge: "3D · Three.js",
      problem:
        "The computer graphics coursework produced a plane and a city in C++ with OpenGL — which means the only way to see it is to compile it on Windows with the right toolchain. Nobody reviewing a portfolio is going to do that.",
      solution:
        "Rebuild the same scene in Three.js as an actual game, so it opens from a link on any device instead of needing a build.",
      role: "University coursework — Computer Graphics",
      hardPart: {
        title: "A city made of thousands of buildings, at 60fps",
        body:
          "Drawing every building as its own mesh means thousands of draw calls a frame, and the frame rate falls apart — especially on a phone. The buildings are merged into combined geometry instead, so the whole skyline costs a handful of draw calls rather than thousands. The other half of the work was feel: the plane moves on velocity with easing rather than snapping to input, the camera trails behind it, and the target gate turns from cyan to green the instant your line is correct, so you know you will make it before you get there.",
      },
      metrics: [
        { value: "3D", label: "WebGL scene" },
        { value: "0", label: "network calls" },
        { value: "3", label: "input methods" },
      ],
      process: [
        {
          phase: "Original build",
          did: "Modelled the plane and the city in C++ with OpenGL and GLUT for the computer graphics course, working directly with vertices, transforms and the fixed-function pipeline.",
          artifact: "C++/OpenGL scene",
        },
        {
          phase: "Port",
          did: "Rebuilt the same scene in Three.js — the point was not to translate the code line by line, but to get the same result in a runtime anyone can open.",
          artifact: "Three.js scene",
        },
        {
          phase: "Make it a game",
          did: "Added the loop that turns a scene into a game: gates to fly through, a score that speeds things up, a fail state, and a best score kept between runs.",
          artifact: "Game loop, scoring",
        },
        {
          phase: "Performance",
          did: "Merged the building geometry so the city renders in a few draw calls instead of thousands, which is what keeps it smooth on a phone.",
          artifact: "Merged geometry",
        },
        {
          phase: "Ship",
          did: "Bundled Three.js locally and added a service worker so the game needs no network at all once loaded.",
          artifact: "Self-contained build",
        },
      ],
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
      previewUrl: "/projects/number-games/preview-1.e83bcb33.webp",
      screenshots: ["/projects/number-games/preview-1.e83bcb33.webp"],
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
      repoUrl: "https://github.com/byochiram/guess-country",
      visual: "game",
      previewUrl: "/projects/guess-country/preview-1.7764d401.webp",
      screenshots: ["/projects/guess-country/preview-1.7764d401.webp"],
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
      repoUrl: "https://github.com/byochiram/flappy-bird",
      visual: "game",
      previewUrl: "/projects/flappy-bird/preview-1.a0939274.webp",
      screenshots: ["/projects/flappy-bird/preview-1.a0939274.webp"],
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
      previewUrl: "/projects/pcos/preview-1.84315ed1.webp",
      screenshots: [
        "/projects/pcos/preview-1.84315ed1.webp",
        "/projects/pcos/preview-2.9539355d.webp",
        "/projects/pcos/preview-3.614c887f.webp",
        "/projects/pcos/preview-4.f22ae742.webp",
      ],
      kind: "Data",
      badge: "ML App",
      problem:
        "PCOS is diagnosed from a scatter of clinical indicators, and the dataset reflects how uneven that is — of 541 patients, only about a third actually have it. Train a model on that as-is and it learns the cheapest possible trick: answer \"no\" every time and still look accurate.",
      solution:
        "A model that is corrected for the imbalance and can explain itself, plus a dashboard that shows which indicators do the separating.",
      role: "University group project — coursework",
      hardPart: {
        title: "An accurate model that is still useless",
        body:
          "With a 67/33 split, always guessing \"not PCOS\" scores 67% accuracy while catching zero actual cases — which is the one outcome that matters here. SMOTE rebalances the training data so the minority class carries real weight, and Random Forest and XGBoost are then compared on the same untouched test set. XGBoost won on F1 (0.882 against 0.865) and took the higher precision, 0.938 to 0.842; Random Forest actually caught more true cases, 0.889 recall to 0.833. That trade-off is the whole decision, and it is worth naming rather than reporting one accuracy figure. The app shows feature importance too, because a risk score nobody can interrogate should not be handed to anyone — and it is labelled an educational tool on every screen, not a diagnosis.",
      },
      metrics: [
        { value: "541", label: "patients" },
        { value: "11", label: "clinical features" },
        { value: "93%", label: "accuracy" },
        { value: "0.88", label: "F1 score" },
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
        "K-Means over the daily habits of 2,000 students — study, sleep, social and physical hours against GPA and stress. It settles on two types: the academic focuser and the balanced all-rounder.",
      bullets: [
        "Two clusters found: \"Si Fokus Akademik\" and \"Si Aktif & Seimbang\"",
        "K-Means over seven lifestyle features, mapped to 2D with PCA",
        "Move the sliders and see which type you land in, live",
        "Batch mode: upload a CSV, cluster everyone, download the result",
      ],
      tags: ["Python", "scikit-learn", "K-Means", "Streamlit", "Power BI"],
      liveUrl: "https://student-lifestyle-clustering.streamlit.app/",
      repoUrl: "https://github.com/byochiram/student-lifestyle-clustering",
      visual: "data",
      previewUrl: "/projects/student/preview-1.77932b1d.webp",
      screenshots: [
        "/projects/student/preview-1.77932b1d.webp",
        "/projects/student/preview-2.b55c8705.webp",
        "/projects/student/preview-3.9dadeaa4.webp",
        "/projects/student/preview-4.77c4b1a0.webp",
        "/projects/student/preview-5.be47ff6d.webp",
      ],
      kind: "Data",
      badge: "Clustering",
      problem:
        "Advice for students is usually one-size-fits-all, but 2,000 students do not share one lifestyle. There are no labels in this data saying which type someone is, so the groups have to be found rather than looked up.",
      solution:
        "Cluster students by how they actually spend a day, then let anyone drop their own habits in and see which group they fall into.",
      role: "University group project — coursework",
      hardPart: {
        title: "The result that argued with the assumption",
        body:
          "The expectation going in was that stress drags grades down. The data says the opposite: average GPA climbs with stress level — 2.82 at low, 3.02 at moderate, 3.26 at high — and study hours climb with it, from 5.5 to 8.4 a day. The clusters land on the same split. \"Si Fokus Akademik\" studies 8.75 hours for a 3.34 GPA and carries the higher stress; \"Si Aktif & Seimbang\" studies 6.37, exercises nearly twice as much, and sits at 2.92 with barely any stress. So stress here tracks effort, not failure — worth stating plainly rather than dressing up as a finding about wellbeing. Over half the cohort is in the high-stress group.",
      },
      metrics: [
        { value: "2,000", label: "students" },
        { value: "2", label: "clusters found" },
        { value: "7", label: "lifestyle features" },
        { value: "51%", label: "in high stress" },
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
      previewUrl: "/projects/segment/preview-1.97797c39.webp",
      screenshots: [
        "/projects/segment/preview-1.97797c39.webp",
        "/projects/segment/preview-2.60426bc2.webp",
        "/projects/segment/preview-3.020522f1.webp",
        "/projects/segment/preview-4.bb8b5dd4.webp",
        "/projects/segment/preview-5.7dcb50bb.webp",
        "/projects/segment/preview-6.dc990c9c.webp",
      ],
      kind: "Data",
      badge: "Segmentation",
      problem:
        "An automotive company moving into a new market already knows how to talk to its existing customers, sorted into four segments. The 2,627 people in the new market carry no segment at all — and treating them as one undifferentiated audience wastes most of the outreach.",
      solution:
        "Learn the segment boundaries from the 8,068 customers who are already labelled, then apply them to the new market in bulk.",
      role: "University group project — coursework",
      hardPart: {
        title: "A 54% model, and why it still ships with its numbers showing",
        body:
          "The Random Forest lands at 54% on the holdout set. Against a four-way guess that would score 25%, it is more than double chance — but it is nowhere near certain, and pretending otherwise would be the real mistake. That number is why the app returns the probability of every segment instead of just the winner: a prospect that comes back 45% B and 40% C is a genuinely different signal from one at 95% B, and a marketer can spend accordingly. The accuracy is printed on the screen next to the prediction rather than buried, so nobody mistakes a suggestion for a fact.",
      },
      metrics: [
        { value: "8,068", label: "labelled customers" },
        { value: "2,627", label: "new prospects" },
        { value: "4", label: "segments" },
        { value: "54%", label: "holdout accuracy" },
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
    { title: "Alibaba Cloud Certified Associate", issuer: "Alibaba Cloud", year: "Valid until Nov 2026",  image: "/certificates/alibaba-aca.cad9bf0c.webp" },
    { title: "Next Generation ECS and OSS Technologies", issuer: "Alibaba Cloud · Apsara Conference", year: "Valid until Nov 2026",  image: "/certificates/apsara-2021.24dbd04f.webp" },
    { title: "Database Design", issuer: "Oracle Academy", year: "Course Certificate",  image: "/certificates/oracle-db-design.48ce2693.webp" },
    { title: "Database Programming with SQL", issuer: "Oracle Academy", year: "Course Certificate",  image: "/certificates/oracle-db-sql.adae0bf4.webp" },
  ],
};

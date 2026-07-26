"use client";

import { memo } from "react";

type Copy = { skillsTitle: string; skillsLabel: string };

type StackItem = {
  name: string;
  mark: string;
  logo?: string;
  invert?: boolean;
};

type StackGroup = {
  index: string;
  title: string;
  items: StackItem[];
};

// Logos are served from /public/logos so the stack rail costs no third-party
// requests and stays cacheable.
const stackGroups: StackGroup[] = [
  {
    index: "01",
    title: "Languages",
    items: [
      { name: "JavaScript", mark: "JS", logo: "/logos/javascript.svg" },
      { name: "TypeScript", mark: "TS", logo: "/logos/typescript.svg" },
      { name: "Python", mark: "PY", logo: "/logos/python.svg" },
      { name: "PHP", mark: "PHP", logo: "/logos/php.svg" },
      { name: "SQL", mark: "SQL", logo: "/logos/sql.svg" },
    ],
  },
  {
    index: "02",
    title: "Frontend",
    items: [
      { name: "HTML", mark: "H5", logo: "/logos/html.svg" },
      { name: "CSS", mark: "C3", logo: "/logos/css.svg" },
      { name: "React", mark: "RE", logo: "/logos/react.svg" },
      { name: "Next.js", mark: "NX", logo: "/logos/next-js.svg", invert: true },
      { name: "Tailwind CSS", mark: "TW", logo: "/logos/tailwind-css.svg" },
      { name: "Bootstrap", mark: "BS", logo: "/logos/bootstrap.svg" },
    ],
  },
  {
    index: "03",
    title: "Backend & Data",
    items: [
      { name: "Laravel", mark: "LV", logo: "/logos/laravel.svg" },
      { name: "Express.js", mark: "EX", logo: "/logos/express-js.svg", invert: true },
      { name: "REST API", mark: "API", logo: "/logos/rest-api.svg" },
      { name: "MySQL", mark: "MY", logo: "/logos/mysql.svg" },
      { name: "PostgreSQL", mark: "PG", logo: "/logos/postgresql.svg" },
      { name: "SQLite", mark: "SQ", logo: "/logos/sqlite.svg" },
      { name: "Supabase", mark: "SB", logo: "/logos/supabase.svg" },
    ],
  },
  {
    index: "04",
    title: "Tools & Workflow",
    items: [
      { name: "Git", mark: "GT", logo: "/logos/git.svg" },
      { name: "GitHub", mark: "GH", logo: "/logos/github.svg", invert: true },
      { name: "XAMPP", mark: "XA", logo: "/xampp-logo.webp" },
      { name: "VS Code", mark: "VS", logo: "/logos/vs-code.svg" },
      { name: "Figma", mark: "FG", logo: "/logos/figma.svg" },
      { name: "Postman", mark: "PM", logo: "/logos/postman.svg" },
      { name: "Docker", mark: "DK", logo: "/logos/docker.svg" },
      { name: "Claude", mark: "CL", logo: "/logos/claude.svg" },
      { name: "ChatGPT", mark: "GPT", logo: "/logos/chatgpt.svg", invert: true },
      {
        name: "Antigravity",
        mark: "AG",
        logo: "/logos/antigravity.webp",
      },
      { name: "Cursor", mark: "CU", logo: "/logos/cursor.svg" },
      { name: "OpenCode", mark: "OC", logo: "/logos/opencode.svg" },
    ],
  },
  {
    index: "05",
    title: "Deploy & Cloud",
    items: [
      { name: "Vercel", mark: "VE", logo: "/logos/vercel.svg" },
      { name: "Railway", mark: "RW", logo: "/logos/railway.svg" },
      { name: "Cloudflare", mark: "CF", logo: "/logos/cloudflare.svg" },
      { name: "Tencent VPS", mark: "TC", logo: "/logos/tencent-vps.webp" },
      { name: "GitHub Pages", mark: "GP", logo: "/logos/github-pages.svg", invert: true },
      { name: "Neon", mark: "NE", logo: "/logos/neon.svg" },
    ],
  },
];

function StackLogo({ item }: { item: StackItem }) {
  return (
    <span className="stack-runway__item" title={item.name} aria-label={item.name}>
      <span className="stack-runway__logo" aria-hidden="true">
        <span>{item.mark}</span>
        {item.logo && (
          <img
            className={[
              "stack-runway__image",
              item.invert ? "stack-runway__image--invert" : "",
              item.name === "XAMPP" ? "stack-runway__image--xampp" : "",
            ].filter(Boolean).join(" ")}
            src={item.logo}
            alt=""
            width={38}
            height={38}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        )}
      </span>
    </span>
  );
}

const MemoizedStackLogo = memo(StackLogo);

function LogoSet({ items, duplicate = false }: { items: StackItem[]; duplicate?: boolean }) {
  const repeatedItems = [...items, ...items];
  return (
    <div className="stack-runway__set" aria-hidden={duplicate || undefined}>
      {repeatedItems.map((item, index) => (
        <MemoizedStackLogo item={item} key={`${duplicate ? "copy" : "main"}-${item.name}-${index}`} />
      ))}
    </div>
  );
}

function SkillsSection({ copy: _copy }: { copy: Copy }) {
  return (
    <section id="skills" className="skills skills--flow" data-reveal>
      <div className="section-shell stack-flow">
        <header className="stack-runway__header">
          <h2>
            Tools I <span>build with.</span>
          </h2>
        </header>

        <div className="stack-flow__rows" aria-label="Technical stack by category">
          {stackGroups.map((group) => (
            <div className="stack-flow__row" key={group.title}>
              <div className="stack-flow__category">
                <span>{group.index}</span>
                <strong>{group.title}</strong>
              </div>
              <div className="stack-runway__viewport">
                <div className="stack-runway__track">
                  <LogoSet items={group.items} />
                  <LogoSet items={group.items} duplicate />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="stack-runway__hint">Hover to pause</p>
      </div>
    </section>
  );
}

export default memo(SkillsSection);

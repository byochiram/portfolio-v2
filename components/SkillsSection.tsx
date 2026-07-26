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

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SIMPLE = "https://cdn.simpleicons.org";

const stackGroups: StackGroup[] = [
  {
    index: "01",
    title: "Languages",
    items: [
      { name: "JavaScript", mark: "JS", logo: `${DEVICON}/javascript/javascript-original.svg` },
      { name: "TypeScript", mark: "TS", logo: `${DEVICON}/typescript/typescript-original.svg` },
      { name: "Python", mark: "PY", logo: `${DEVICON}/python/python-original.svg` },
      { name: "PHP", mark: "PHP", logo: `${DEVICON}/php/php-original.svg` },
      { name: "SQL", mark: "SQL" },
    ],
  },
  {
    index: "02",
    title: "Frontend",
    items: [
      { name: "HTML", mark: "H5", logo: `${DEVICON}/html5/html5-original.svg` },
      { name: "CSS", mark: "C3", logo: `${DEVICON}/css3/css3-original.svg` },
      { name: "React", mark: "RE", logo: `${DEVICON}/react/react-original.svg` },
      { name: "Next.js", mark: "NX", logo: `${DEVICON}/nextjs/nextjs-original.svg`, invert: true },
      { name: "Tailwind CSS", mark: "TW", logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
      { name: "Bootstrap", mark: "BS", logo: `${DEVICON}/bootstrap/bootstrap-original.svg` },
    ],
  },
  {
    index: "03",
    title: "Backend & Data",
    items: [
      { name: "Laravel", mark: "LV", logo: `${DEVICON}/laravel/laravel-original.svg` },
      { name: "Express.js", mark: "EX", logo: `${DEVICON}/express/express-original.svg`, invert: true },
      { name: "REST API", mark: "API", logo: `${SIMPLE}/openapiinitiative/6BA539` },
      { name: "MySQL", mark: "MY", logo: `${DEVICON}/mysql/mysql-original.svg` },
      { name: "PostgreSQL", mark: "PG", logo: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: "SQLite", mark: "SQ", logo: `${DEVICON}/sqlite/sqlite-original.svg` },
      { name: "Supabase", mark: "SB", logo: `${DEVICON}/supabase/supabase-original.svg` },
    ],
  },
  {
    index: "04",
    title: "Tools & Workflow",
    items: [
      { name: "Git", mark: "GT", logo: `${DEVICON}/git/git-original.svg` },
      { name: "GitHub", mark: "GH", logo: `${DEVICON}/github/github-original.svg`, invert: true },
      { name: "XAMPP", mark: "XA", logo: "/xampp-logo.png" },
      { name: "VS Code", mark: "VS", logo: `${DEVICON}/vscode/vscode-original.svg` },
      { name: "Figma", mark: "FG", logo: `${DEVICON}/figma/figma-original.svg` },
      { name: "Postman", mark: "PM", logo: `${DEVICON}/postman/postman-original.svg` },
      { name: "Docker", mark: "DK", logo: `${DEVICON}/docker/docker-original.svg` },
      { name: "Claude", mark: "CL", logo: `${SIMPLE}/claude/D97757` },
      { name: "ChatGPT", mark: "GPT" },
      {
        name: "Antigravity",
        mark: "AG",
        logo: "https://antigravity.google/assets/image/brand/antigravity-icon__full-color.png",
      },
      { name: "Cursor", mark: "CU", logo: `${SIMPLE}/cursor/FFFFFF` },
      { name: "OpenCode", mark: "OC", logo: `${SIMPLE}/opencode/FFFFFF` },
    ],
  },
  {
    index: "05",
    title: "Deploy & Cloud",
    items: [
      { name: "Vercel", mark: "VE", logo: `${SIMPLE}/vercel/FFFFFF` },
      { name: "Railway", mark: "RW", logo: `${SIMPLE}/railway/FFFFFF` },
      { name: "Cloudflare", mark: "CF", logo: `${SIMPLE}/cloudflare/F38020` },
      { name: "Tencent VPS", mark: "TC", logo: `${DEVICON}/tencentcloud/tencentcloud-original.svg` },
      { name: "GitHub Pages", mark: "GP", logo: `${DEVICON}/github/github-original.svg`, invert: true },
      { name: "Neon", mark: "NE", logo: `${SIMPLE}/neon/00E699` },
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

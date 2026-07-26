"use client";

import { memo } from "react";
import { portfolio } from "@/data/portfolio";

type Copy = { experienceTitle: string; experienceLabel: string };

function ExperienceSection({ copy }: { copy: Copy }) {
  const exp = portfolio.experience;
  return (
    <section id="experience" className="experience" data-reveal>
      <div className="section-shell section-shell--medium section-block">
        <div className="section-heading section-heading--center">
          <div className="section-label">{copy.experienceLabel}</div>
          <h2 className="section-title">{copy.experienceTitle}</h2>
        </div>

        <article className="experience-card">
          <div className="exp-icon">⌘</div>
          <div className="exp-title">
            <h3>{exp.role}</h3>
            <p>{exp.company}</p>
          </div>
          <div className="exp-period">{exp.period}</div>
          <div className="exp-bullets">
            <ul>{exp.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </div>
          <div className="exp-tech">
            <span className="exp-tech-label">Technologies</span>
            {exp.technologies.map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </article>
      </div>
    </section>
  );
}

export default memo(ExperienceSection);

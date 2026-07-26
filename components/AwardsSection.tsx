"use client";

import { memo } from "react";
import { portfolio } from "@/data/portfolio";

type Copy = { awardsTitle: string; awardsLabel: string };

function AwardsSection({ copy }: { copy: Copy }) {
  return (
    <section className="awards" data-reveal>
      <div className="section-shell section-shell--medium section-block">
        <div className="section-heading section-heading--center">
          <div className="section-label">{copy.awardsLabel}</div>
          <h2 className="section-title">{copy.awardsTitle}</h2>
        </div>
        <div className="award-grid">
          {portfolio.awards.map((award, index) => (
            <article className="award-item" key={award.title} style={{ transitionDelay: `${index * 70}ms` }}>
              <div className="award-icon">★</div>
              <div>
                <h3>{award.title}</h3>
                <p>{award.issuer}</p>
              </div>
              <span className="award-year">{award.year}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(AwardsSection);

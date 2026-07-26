"use client";

import { memo } from "react";
import { portfolio } from "@/data/portfolio";

type Copy = { awardsTitle: string; awardsLabel: string };

function AwardsSection({ copy }: { copy: Copy }) {
  return (
    <section id="awards" className="awards" data-reveal>
      <div className="section-shell section-shell--medium section-block">
        <div className="section-heading section-heading--center">
          <h2 className="section-title">
            Learning <em>highlights</em>
          </h2>
        </div>

        <div className="award-grid">
          {portfolio.awards.map((award, index) => (
            <article
              className="award-item"
              key={award.title}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="award-icon">★</div>
              <div>
                <h3>{award.title}</h3>
                <p>
                  {award.issuer}
                  {award.image && (
                    <>
                      {" · "}
                      {/* Opens the scan in its own tab rather than in the page. */}
                      <a
                        className="award-link"
                        href={award.image}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View certificate ↗
                      </a>
                    </>
                  )}
                </p>
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

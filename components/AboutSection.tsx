"use client";

import { memo, useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import DraggableLanyardCard from "@/components/DraggableLanyardCard";

type Copy = { aboutTitle: string; aboutLabel: string };

const profileFacts = [
  {
    index: "01",
    label: "EDUCATION",
    title: "Informatics, Diponegoro University",
    detail: "Aug 2022 — Mar 2026",
    featured: true,
  },
  {
    index: "02",
    label: "GPA",
    title: "3.85 / 4.00",
    detail: "Academic record",
  },
  {
    index: "03",
    label: "STUDY PERIOD",
    title: "3 years 6 months",
    detail: "Completed",
  },
  {
    index: "04",
    label: "BASED IN",
    title: "Batam, Indonesia",
    detail: "Home base",
  },
];

function AboutSection({ copy }: { copy: Copy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lanyardActive, setLanyardActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLanyardActive(true);
        observer.disconnect();
      },
      { threshold: 0.22, rootMargin: "0px 0px -8%" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about" data-reveal>
      <div className="about__orbit-map" aria-hidden="true">
        <span /><span /><span />
      </div>

      <div className="section-shell section-block about__shell">
        <div className="about-grid">
          <header className="about-heading">
            <h2 className="section-title">
              Behind the
              <br />
              <em>build.</em>
            </h2>
          </header>

          <div className={`about-lanyard ${lanyardActive ? "about-lanyard--active" : ""}`}>
            <span className="about-lanyard__note">PULL · SWING · RELEASE</span>
            <DraggableLanyardCard
              active={lanyardActive}
              name={portfolio.name}
              initials={portfolio.initials}
            />
          </div>

          <div className="about-story">
            <p className="about-manifesto">
              Software built for <span>practical problems</span>
              <br />
              and refined to be clear and easy to use.
            </p>

            <p className="about-description">
              My foundation is Informatics; my favorite part is the build itself:
              understanding a workflow, shaping the system behind it, and refining
              the experience until it feels intuitive to anyone using it.
            </p>

            <div className="about-journey" aria-label="Education and profile details">
              {profileFacts.map((item) => (
                <article
                  className={`about-stop ${item.featured ? "about-stop--featured" : ""}`}
                  key={item.index}
                >
                  <span className="about-stop__index">{item.index}</span>
                  <small>{item.label}</small>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="about-actions">
              <a
                className="about-cv"
                href="/Rosidah-Rahmati-CV.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Open my CV <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-ribbon" aria-hidden="true">
        <span>INFORMATICS → SOFTWARE · CLASSROOM → REAL PROJECTS ·</span>
        <span>INFORMATICS → SOFTWARE · CLASSROOM → REAL PROJECTS ·</span>
      </div>
    </section>
  );
}

export default memo(AboutSection);

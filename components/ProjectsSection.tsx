"use client";

import { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { portfolio, Project } from "@/data/portfolio";
import Icon from "@/components/Icon";

type Copy = { projectsTitle: string; projectsLabel: string };
type ProjectCategory = "Web" | "Game" | "Data";

const projectGroups: { label: ProjectCategory; caption: string }[] = [
  { label: "Web", caption: "Systems & platforms" },
  { label: "Game", caption: "Playable experiments" },
  { label: "Data", caption: "Analysis & dashboards" },
];

function getProjectCategory(project: Project): ProjectCategory {
  return project.kind === "Web App" ? "Web" : project.kind;
}

function ProjectVisual({
  project,
  eager = false,
}: {
  project: Project;
  eager?: boolean;
}) {
  if (project.previewUrl) {
    return (
      <Image
        src={project.previewUrl}
        alt={`${project.title} interface preview`}
        width={480}
        height={360}
        sizes="(max-width: 700px) 90vw, 30vw"
        priority={eager}
        loading={eager ? undefined : "lazy"}
      />
    );
  }

  if (project.visual === "game") {
    return (
      <div className="project-game-preview" aria-label={`${project.title} game preview`}>
        <div className="project-game-preview__topline">
          <span>PLAYABLE PWA</span>
          <span>INSTALLABLE</span>
        </div>
        <div className="project-game-preview__main">
          {project.gameIcon ? <img src={project.gameIcon} alt="" loading="lazy" /> : null}
          <div>
            <small>BROWSER GAME</small>
            <strong>{project.title}</strong>
          </div>
        </div>
        <div className="project-game-preview__footer">
          <span>Touch</span>
          <span>Keyboard</span>
          <span>Offline</span>
        </div>
      </div>
    );
  }

  if (project.kind === "Web App") {
    let host = "";
    try {
      host = project.liveUrl && project.liveUrl !== "#" ? new URL(project.liveUrl).host : "";
    } catch {
      host = "";
    }
    return (
      <div className="project-web-preview" aria-label={`${project.title} preview`}>
        <div className="project-web-preview__bar">
          <span />
          <span />
          <span />
          <em>{host || "internal project"}</em>
        </div>
        <div className="project-web-preview__screen">
          <strong>{project.title}</strong>
          <small>{project.badge || "Web App"}</small>
        </div>
      </div>
    );
  }

  return (
    <div className="project-dummy project-dummy--data" aria-label="Data project preview">
      <div className="dummy-data__topline">
        <span>DATA / 2026</span>
        <span>LIVE SAMPLE</span>
      </div>
      <div className="dummy-data__metric">
        <small>TOTAL RECORDS</small>
        <strong>12,480</strong>
      </div>
      <div className="dummy-data__chart" aria-hidden="true">
        {[38, 56, 44, 78, 63, 91, 72, 84].map((height, index) => (
          <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="dummy-data__legend">
        <span>01 CLEAN</span>
        <span>02 ANALYZE</span>
        <span>03 EXPLAIN</span>
      </div>
      <span className="project-dummy__status">DUMMY / READY TO REPLACE</span>
    </div>
  );
}

function ProjectsSection({ copy }: { copy: Copy }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<ProjectCategory>("Web");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProject]);

  const activeProjects = portfolio.projects.filter(
    (project) => getProjectCategory(project) === activeTab
  );

  return (
    <section id="projects" className="projects" data-reveal>
      <div className="section-shell section-block">
        <div className="section-heading section-heading--split">
          <div>
            <div className="section-label">{copy.projectsLabel}</div>
            <h2 className="section-title">{copy.projectsTitle}</h2>
          </div>
          <p className="section-kicker">
            Web systems, playable experiments, and data work—switch between tracks to explore each.
          </p>
        </div>

        <div className="project-tabs" role="tablist" aria-label="Project categories">
          {projectGroups.map((group) => {
            const count = portfolio.projects.filter(
              (project) => getProjectCategory(project) === group.label
            ).length;
            const isActive = activeTab === group.label;

            return (
              <button
                key={group.label}
                type="button"
                role="tab"
                id={`ptab-${group.label}`}
                aria-selected={isActive}
                aria-controls="project-tabpanel"
                className={`project-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTab(group.label)}
              >
                <span className="project-tab__name">{group.label}</span>
                <small className="project-tab__caption">{group.caption}</small>
                <b className="project-tab__count">{String(count).padStart(2, "0")}</b>
              </button>
            );
          })}
        </div>

        <div
          className="project-index__row project-index__row--tabbed"
          id="project-tabpanel"
          role="tabpanel"
          aria-labelledby={`ptab-${activeTab}`}
          key={activeTab}
        >
          {activeProjects.map((project, index) => (
            <article
              className="project-card project-card--preview"
              key={project.title}
              data-kind={getProjectCategory(project)}
              style={{ ["--i" as string]: index }}
            >
              <button
                type="button"
                className="project-open"
                onClick={() => setSelectedProject(project)}
                aria-haspopup="dialog"
                aria-label={`View details for ${project.title}`}
              >
                <div className="project-preview">
                  <ProjectVisual
                    project={project}
                    eager={activeTab === "Web" && index === 0}
                  />
                  <div className="project-preview__topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.kind}</span>
                  </div>
                  <span className="project-preview__action">VIEW CASE ↗</span>
                </div>

                <div className="project-preview-copy">
                  <div>
                    <span className="project-kind">{project.badge}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <div className="project-preview-tags">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {selectedProject ? (
        <div
          className="project-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <div
            className="project-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="project-modal__close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              CLOSE ×
            </button>

            <div
              className={`project-modal__visual ${
                selectedProject.gameUrl ? "project-modal__visual--game" : ""
              }`}
            >
              <div className="project-modal__gallery">
                {selectedProject.screenshots?.length ? (
                  selectedProject.screenshots.map((screenshot, index) => (
                    <figure key={screenshot}>
                      <Image
                        src={screenshot}
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        width={900}
                        height={620}
                        sizes="(max-width: 900px) 92vw, 60vw"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
                    </figure>
                  ))
                ) : (
                  <figure className="project-modal__gallery-single">
                    <ProjectVisual project={selectedProject} eager />
                  </figure>
                )}
              </div>
              <span>{selectedProject.kind}</span>
            </div>

            <div className="project-modal__content">
              <div className="project-modal__intro">
                <div>
                  <div className="project-modal__eyebrow">{selectedProject.badge}</div>
                  <h3 id="project-modal-title">{selectedProject.title}</h3>
                  <p className="project-modal__subtitle">{selectedProject.subtitle}</p>
                </div>
                <p className="project-modal__description">{selectedProject.description}</p>
              </div>

              <div className="project-modal__details">
                <ul className="project-modal__highlights">
                  {selectedProject.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <div>
                  <div className="project-tags">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {selectedProject.gameUrl ? (
                      <a className="project-play" href={selectedProject.gameUrl}>
                        Play game <span aria-hidden="true">→</span>
                      </a>
                    ) : null}
                    {selectedProject.liveUrl !== "#" && !selectedProject.gameUrl ? (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer">
                        Visit project <Icon name="external" size={14} />
                      </a>
                    ) : null}
                    {selectedProject.repoUrl !== "#" ? (
                      <a href={selectedProject.repoUrl} target="_blank" rel="noreferrer">
                        <Icon name="code" size={14} /> Source code
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default memo(ProjectsSection);

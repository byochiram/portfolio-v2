"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { portfolio, Project } from "@/data/portfolio";
import Icon from "@/components/Icon";
import ProjectDiagram from "@/components/ProjectDiagram";

type Copy = { projectsTitle: string; projectsLabel: string };
type ProjectCategory = "Web" | "Game" | "Data";
type ModalTab = "Overview" | "Process" | "Gallery";

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
  const [modalTab, setModalTab] = useState<ModalTab>("Overview");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const shots = selectedProject?.screenshots ?? [];
  const stepLightbox = useCallback(
    (delta: number) =>
      setLightbox((current) =>
        current === null || shots.length === 0
          ? current
          : (current + delta + shots.length) % shots.length
      ),
    [shots.length]
  );

  // Only offer a tab when the project actually has that material.
  const modalTabs: ModalTab[] = selectedProject
    ? ([
        "Overview",
        ...(selectedProject.process?.length ? ["Process"] : []),
        ...(selectedProject.screenshots?.length ? ["Gallery"] : []),
      ] as ModalTab[])
    : [];

  useEffect(() => {
    if (!selectedProject) return;
    setModalTab("Overview");
    setLightbox(null);

    const previousOverflow = document.body.style.overflow;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Escape closes the enlarged image first, then the dialog itself.
        setLightbox((current) => {
          if (current === null) setSelectedProject(null);
          return null;
        });
        return;
      }
      if (event.key === "ArrowRight") stepLightbox(1);
      if (event.key === "ArrowLeft") stepLightbox(-1);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [selectedProject, stepLightbox]);

  const activeProjects = portfolio.projects.filter(
    (project) => getProjectCategory(project) === activeTab
  );

  return (
    <section id="projects" className="projects" data-reveal>
      <div className="section-shell section-block">
        <div className="section-heading">
          {/* Same shape as the other section headings: one accented word
              carrying the orange rule underneath it. */}
          <h2 className="section-title">
            Selected <em>projects</em>
          </h2>
        </div>

        <div className="project-tabs" role="tablist" aria-label="Project categories">
          {projectGroups.map((group) => {
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
              className="project-card project-card--preview project-card--sheet"
              key={project.title}
              data-kind={getProjectCategory(project)}
              style={{ ["--i" as string]: index }}
            >
              {/* Kartunya bukan lagi satu <button> raksasa. Tautan Play game
                  harus bisa diklik sendiri, dan sebuah <a> di dalam <button>
                  bukan HTML yang sah — kliknya juga akan ikut membuka modal.
                  Jadi isinya kini div biasa, dan tombol pembuka modal menjadi
                  lapisan tak terlihat yang menutupi kartu di bawah tautan itu. */}
              <div className="project-open">
                <div className="project-preview">
                  <ProjectVisual
                    project={project}
                    eager={activeTab === "Web" && index === 0}
                  />
                  <div className="project-preview__topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.kind}</span>
                  </div>
                  {project.gameUrl ? (
                    <a
                      className="project-card__play"
                      href={project.gameUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Play game <span aria-hidden="true">→</span>
                    </a>
                  ) : null}
                  <span className="project-preview__action">VIEW CASE ↗</span>
                </div>

                <div className="project-preview-copy">
                  {/* Badge and stack share the first line, which buys back a
                      whole row of card height. */}
                  <div className="project-card__head">
                    <span className="project-kind">{project.badge}</span>
                    <div className="project-preview-tags">
                      {/* Three, so the database shows next to the language and framework. */}
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3>{project.title}</h3>
                    {/* One plain line of context, so a card says what the thing
                        is without needing the modal opened first. */}
                    <p className="project-card__line">{project.subtitle}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="project-card__hit"
                onClick={() => setSelectedProject(project)}
                aria-haspopup="dialog"
                aria-label={`View details for ${project.title}`}
              />
            </article>
          ))}
        </div>
      </div>

      {selectedProject && mounted
        ? createPortal(
            <>
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

            <header className="pm__head">
              <div className="project-modal__eyebrow">{selectedProject.badge}</div>
              <h3 id="project-modal-title">{selectedProject.title}</h3>
              <p className="pm__subtitle">{selectedProject.subtitle}</p>

              {(selectedProject.role || selectedProject.method) && (
                <p className="pm__meta">
                  {selectedProject.role}
                  {selectedProject.role && selectedProject.method ? (
                    <span aria-hidden="true"> · </span>
                  ) : null}
                  {selectedProject.method && <em>{selectedProject.method}</em>}
                </p>
              )}

              <div className="project-tags pm__tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </header>

            {modalTabs.length > 1 && (
              <div className="pm__tabs" role="tablist" aria-label="Project detail sections">
                {modalTabs.map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    id={`pm-tab-${t}`}
                    aria-selected={modalTab === t}
                    aria-controls="pm-panel"
                    className={`pm__tab ${modalTab === t ? "is-active" : ""}`}
                    onClick={() => setModalTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <div
              className="pm__panel"
              id="pm-panel"
              role="tabpanel"
              aria-labelledby={`pm-tab-${modalTab}`}
            >
              {modalTab === "Overview" && (
                <div className="pm__overview">
                  {selectedProject.problem ? (
                    <>
                      <section className="pm__block">
                        <h4>The problem</h4>
                        <p>{selectedProject.problem}</p>
                      </section>
                      <section className="pm__block">
                        <h4>The solution</h4>
                        <p>{selectedProject.solution}</p>
                      </section>
                    </>
                  ) : (
                    <section className="pm__block">
                      <h4>About</h4>
                      <p>{selectedProject.description}</p>
                    </section>
                  )}

                  {selectedProject.metrics?.length ? (
                    <ul className="pm__metrics">
                      {selectedProject.metrics.map((m) => (
                        <li key={m.label}>
                          <b>{m.value}</b>
                          <span>{m.label}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {selectedProject.diagram && (
                    <ProjectDiagram kind={selectedProject.diagram} />
                  )}

                  {selectedProject.hardPart && (
                    <section className="pm__block pm__hard">
                      <h4>{selectedProject.hardPart.title}</h4>
                      <p>{selectedProject.hardPart.body}</p>
                    </section>
                  )}

                  <section className="pm__block">
                    <h4>What it does</h4>
                    <ul className="project-modal__highlights">
                      {selectedProject.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </section>

                  {selectedProject.access && (
                    <p className="pm__doc">{selectedProject.access}</p>
                  )}
                </div>
              )}

              {modalTab === "Process" && selectedProject.process && (
                <ol className="pm__process">
                  {selectedProject.process.map((step, index) => (
                    <li key={step.phase}>
                      <span className="pm__step-no">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h4>{step.phase}</h4>
                        <p>{step.did}</p>
                        {step.artifact && (
                          <span className="pm__artifact">{step.artifact}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}

              {modalTab === "Gallery" && (
                <div className="project-modal__gallery">
                  {selectedProject.screenshots?.length ? (
                    selectedProject.screenshots.map((screenshot, index) => (
                      <figure key={screenshot}>
                        <button
                          type="button"
                          className="pm__shot"
                          onClick={() => setLightbox(index)}
                          aria-label={`Enlarge screenshot ${index + 1}`}
                        >
                          <Image
                            src={screenshot}
                            alt={`${selectedProject.title} screenshot ${index + 1}`}
                            width={900}
                            height={620}
                            sizes="(max-width: 900px) 45vw, 280px"
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                          <span className="pm__shot-zoom" aria-hidden="true">
                            ⤢
                          </span>
                        </button>
                        <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
                      </figure>
                    ))
                  ) : (
                    <figure className="project-modal__gallery-single">
                      <ProjectVisual project={selectedProject} eager />
                    </figure>
                  )}
                </div>
              )}
            </div>

            <footer className="pm__foot">
              <div className="project-links">
                {selectedProject.gameUrl ? (
                  <a
                    className="project-play"
                    href={selectedProject.gameUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Play game <span aria-hidden="true">→</span>
                  </a>
                ) : null}
                {selectedProject.liveUrl !== "#" && !selectedProject.gameUrl ? (
                  <a
                    className="project-play"
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit project <Icon name="external" size={14} />
                  </a>
                ) : null}
                {selectedProject.repoUrl !== "#" ? (
                  <a href={selectedProject.repoUrl} target="_blank" rel="noreferrer">
                    <Icon name="code" size={14} /> Source code
                  </a>
                ) : null}
              </div>
            </footer>
                </div>
              </div>

              {lightbox !== null && shots[lightbox] && (
                <div
                  className="pm-lb"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`Screenshot ${lightbox + 1} of ${shots.length}`}
                  onMouseDown={(event) => {
                    if (event.target === event.currentTarget) setLightbox(null);
                  }}
                >
                  <div className="pm-lb__bar">
                    <span>
                      {String(lightbox + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                      <em>{selectedProject.title}</em>
                    </span>
                    <button type="button" onClick={() => setLightbox(null)} aria-label="Close image">
                      CLOSE ×
                    </button>
                  </div>

                  <figure className="pm-lb__stage">
                    <Image
                      key={shots[lightbox]}
                      src={shots[lightbox]}
                      alt={`${selectedProject.title} screenshot ${lightbox + 1}`}
                      width={1280}
                      height={860}
                      sizes="92vw"
                      priority
                    />
                  </figure>

                  {shots.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="pm-lb__nav pm-lb__nav--prev"
                        onClick={() => stepLightbox(-1)}
                        aria-label="Previous screenshot"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="pm-lb__nav pm-lb__nav--next"
                        onClick={() => stepLightbox(1)}
                        aria-label="Next screenshot"
                      >
                        ›
                      </button>

                      <div className="pm-lb__strip">
                        {shots.map((shot, index) => (
                          <button
                            key={shot}
                            type="button"
                            className={index === lightbox ? "is-active" : ""}
                            onClick={() => setLightbox(index)}
                            aria-label={`Screenshot ${index + 1}`}
                          >
                            <Image src={shot} alt="" width={120} height={80} sizes="120px" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>,
            document.body
          )
        : null}
    </section>
  );
}

export default memo(ProjectsSection);

"use client";

import { useCallback, useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Stack"],
  ["projects", "Projects"],
  ["awards", "Highlights"],
  ["contact", "Contact"],
] as const;

const copy = {
  eyebrow: "HELLO, I AM",
  projects: "View Projects",
  contact: "Contact Me",
  aboutTitle: "Beyond the headline",
  aboutLabel: "BACKGROUND",
  skillsTitle: "Tools I build with",
  skillsLabel: "TECH STACK",
  projectsTitle: "Selected projects",
  projectsLabel: "PROJECTS",
  awardsTitle: "Learning highlights",
  awardsLabel: "CREDENTIALS",
  contactTitle: "Let's connect.",
  contactLabel: "CONTACT",
  contactBody:
    "Feel free to reach out about opportunities, collaborations, or simply to start a conversation.",
} as const;

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
    if (!showIntro) document.documentElement.classList.add("intro-done");

    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  useEffect(() => {
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -45%", threshold: [0.15, 0.3, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Infinite marquees/orbits are expensive to keep compositing, so anything
  // scrolled out of view is flagged and paused via CSS until it returns.
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("main > section"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);
        }
      },
      { rootMargin: "150px 0px" }
    );

    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8%" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const finishIntro = useCallback(() => {
    document.documentElement.classList.add("intro-done");
    setShowIntro(false);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      {mounted && showIntro && <Intro onDone={finishIntro} />}

      {/* The bar stays put from the very top; it is only held back while the
          intro overlay is still covering the page. */}
      <header className={`site-header ${showIntro ? "" : "site-header--visible"}`}>
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Go to home">
          {portfolio.initials}<span>.</span>
        </button>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span /><span />
        </button>

        <nav className={`nav ${menuOpen ? "nav--open" : ""}`} aria-label="Main navigation">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              className={activeSection === id ? "active" : ""}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </nav>

      </header>

      <main>
        <Hero ready={!showIntro} />
        <AboutSection copy={copy} />
        <SkillsSection copy={copy} />
        <ProjectsSection copy={copy} />
        <AwardsSection copy={copy} />
        <ContactSection copy={copy} />
      </main>

    </>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import SectionDivider from "@/components/SectionDivider";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Stack"],
  ["projects", "Projects"],
  ["contact", "Contact"],
] as const;

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState<"EN" | "ID">("EN");
  const [headerVisible, setHeaderVisible] = useState(false);

  const copy = useMemo(
    () =>
      language === "EN"
        ? {
            eyebrow: "HELLO, I AM",
            projects: "View Projects",
            contact: "Contact Me",
            aboutTitle: "Beyond the headline",
            aboutLabel: "BACKGROUND",
            skillsTitle: "Tools I build with",
            skillsLabel: "TECH STACK",
            experienceTitle: "Experience in practice",
            experienceLabel: "EXPERIENCE",
            projectsTitle: "Selected projects",
            projectsLabel: "PROJECTS",
            awardsTitle: "Learning highlights",
            awardsLabel: "CREDENTIALS",
            contactTitle: "Let's connect.",
            contactLabel: "CONTACT",
            contactBody:
              "Feel free to reach out about opportunities, collaborations, or simply to start a conversation.",
          }
        : {
            eyebrow: "HALO, SAYA",
            projects: "Lihat Proyek",
            contact: "Hubungi Saya",
            aboutTitle: "Lebih dari sekadar profil",
            aboutLabel: "LATAR BELAKANG",
            skillsTitle: "Teknologi yang saya gunakan",
            skillsLabel: "TECH STACK",
            experienceTitle: "Pengalaman dalam praktik",
            experienceLabel: "PENGALAMAN",
            projectsTitle: "Proyek pilihan",
            projectsLabel: "PROYEK",
            awardsTitle: "Perjalanan belajar",
            awardsLabel: "SERTIFIKASI",
            contactTitle: "Mari terhubung.",
            contactLabel: "KONTAK",
            contactBody:
              "Silakan hubungi saya untuk peluang kerja, kolaborasi, atau sekadar memulai percakapan.",
          },
    [language]
  );

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
    const updateHeader = () => {
      const visible = window.scrollY > 80;
      setHeaderVisible(visible);
      if (!visible) setMenuOpen(false);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

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
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main > .sxn")
    );

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

      <header className={`site-header ${headerVisible ? "site-header--visible" : ""}`}>
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

        <div className="header-actions">
          <button
            className="language"
            onClick={() => setLanguage((value) => (value === "EN" ? "ID" : "EN"))}
            aria-label={`Switch language to ${language === "EN" ? "Indonesian" : "English"}`}
          >
            {language}
            <span aria-hidden="true">⌄</span>
          </button>
          <button
            className="theme-toggle"
            onClick={() => document.documentElement.classList.toggle("dark")}
            aria-label="Toggle dark mode"
          >
            <svg className="theme-toggle__sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <svg className="theme-toggle__moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
        </div>
      </header>

      <main>
        <Hero ready={!showIntro} />
        <SectionDivider label="Profile" variant="diagonal" />
        <AboutSection copy={copy} />
        <SectionDivider label="Stack" variant="wave" />
        <SkillsSection copy={copy} />
        <SectionDivider label="Selected work" variant="marquee" />
        <ProjectsSection copy={copy} />
        <SectionDivider label="Experience" variant="timeline" />
        <ExperienceSection copy={copy} />
        <SectionDivider label="Credentials" variant="seal" />
        <AwardsSection copy={copy} />
        <SectionDivider label="Let's talk" variant="converge" />
        <ContactSection copy={copy} />
      </main>

    </>
  );
}

"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!ready) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          ".hero__poster, .hero__letter, .hero__name-rail, .hero__vertical-text, .hero__reveal, .hero__scroll-hint",
          { opacity: 1, clearProps: "transform,filter" }
        );
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      timeline.set(".hero__poster", { opacity: 0, scale: 0.84, filter: "blur(16px)" });
      timeline.set(".hero__letter", { opacity: 0, yPercent: 115, rotateX: -45 });
      timeline.set(".hero__name-rail", { opacity: 0, y: 42 });
      timeline.set(photoRef.current, { opacity: 0, y: 150, scale: 1.16 });
      timeline.set(".hero__vertical-text", { opacity: 0 });
      timeline.set(".hero__reveal", { opacity: 0, y: 26 });
      timeline.set(".hero__scroll-hint", { opacity: 0 });

      timeline.to(".hero__poster", {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.45,
        ease: "expo.out",
      }, 0);

      timeline.to(".hero__letter", {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 1.05,
        stagger: 0.045,
      }, 0.18);

      timeline.to(".hero__name-rail", {
        opacity: 1,
        y: 0,
        duration: 1,
      }, 0.48);

      timeline.to(photoRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.35,
        ease: "expo.out",
      }, 0.28);

      timeline.to(".hero__vertical-text", { opacity: 1, duration: 0.8 }, 0.78);
      timeline.to(".hero__reveal", {
        opacity: 1,
        y: 0,
        duration: 0.72,
        stagger: 0.08,
      }, 0.72);
      timeline.to(".hero__scroll-hint", { opacity: 1, duration: 0.6 }, 1.05);

      gsap.to(photoRef.current, {
        y: -7,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo) return;

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;

      gsap.to(photo, { x: x * 12, rotateY: x * 2.2, duration: 0.8, ease: "power2.out" });
      gsap.to(".hero__line--solid", { x: x * -6, y: y * -3, duration: 1, ease: "power2.out" });
      gsap.to(".hero__space-layer--far", { x: x * -18, y: y * -12, duration: 1.2, ease: "power2.out" });
      gsap.to(".hero__space-layer--near", { x: x * 28, y: y * 18, duration: 1, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(photo, { x: 0, rotateY: 0, duration: 0.9, ease: "power2.out" });
      gsap.to(".hero__line--solid", { x: 0, y: 0, duration: 1, ease: "power2.out" });
      gsap.to(".hero__space-layer--far, .hero__space-layer--near", {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power2.out",
      });
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [ready]);

  const portfolioLetters = "PORTFOLIO".split("");

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`hero ${ready ? "hero--ready" : "hero--waiting"}`}
    >
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__registration" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="hero__vertical-text hero__vertical-text--left" aria-hidden="true">
        <div className="hero__vertical-track">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index}>ROSIDAH RAHMATI&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>

      <div className="hero__vertical-text hero__vertical-text--right" aria-hidden="true">
        <div className="hero__vertical-track hero__vertical-track--up">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index}>SOFTWARE DEVELOPER&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>

      <div className="hero__poster">
        <div className="hero__space" aria-hidden="true">
          <div className="hero__space-layer hero__space-layer--far">
            <div className="hero__orbit hero__orbit--outer"><i /></div>
            <div className="hero__orbit hero__orbit--middle"><i /></div>
            <div className="hero__orbit hero__orbit--inner"><i /></div>
            <div className="hero__starfield">
              {Array.from({ length: 12 }).map((_, index) => <span key={index} />)}
            </div>
          </div>

          <div className="hero__space-layer hero__space-layer--near">
            <span className="hero__space-tag hero__space-tag--idea">IDEA <b>01</b></span>
            <span className="hero__space-tag hero__space-tag--code">CODE <b>02</b></span>
            <span className="hero__space-tag hero__space-tag--test">TEST <b>03</b></span>
            <span className="hero__space-tag hero__space-tag--ship">SHIP <b>04</b></span>
            <span className="hero__comet" />
          </div>
        </div>

        <div className="hero__blueprint-piece hero__blueprint-piece--left" aria-hidden="true" />
        <div className="hero__blueprint-piece hero__blueprint-piece--right" aria-hidden="true" />

        <aside className="hero__corner-note hero__corner-note--left hero__reveal">
          <span>PORTFOLIO / 2026</span>
          <strong>FROM PROBLEM<br />TO PRODUCT</strong>
        </aside>

        <aside className="hero__corner-note hero__corner-note--right hero__reveal">
          <span>BASED / GMT+7</span>
          <strong>BATAM ↔ ANYWHERE</strong>
        </aside>

        <div className="hero__bg-text">
          <h1 className="hero__line hero__line--solid">
            {portfolioLetters.map((letter, index) => (
              <span key={index} className="hero__letter">{letter}</span>
            ))}
          </h1>

          <div className="hero__marquee-layer hero__name-rail" aria-label="Rosidah Rahmati">
            <div className="hero__marquee">
              <div className="hero__marquee-track">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span key={index} className="hero__marquee-item">
                    ROSIDAH RAHMATI<span className="hero__marquee-dot">•</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hero__photo-backdrop" aria-hidden="true" />

        <div className="hero__photo-wrap">
          <img
            ref={photoRef}
            className="hero__photo"
            src="/rosidah-portrait.png"
            alt="Rosidah Rahmati"
          />
        </div>
      </div>

      <div className="hero__cta-wrap hero__reveal">
        <a href="#projects" className="hero__cta hero__cta--primary">
          <span>Explore My Work</span>
          <span aria-hidden="true">↘</span>
        </a>
        <a href="#contact" className="hero__cta hero__cta--secondary">
          <span>Let&apos;s Talk</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span>SCROLL</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}

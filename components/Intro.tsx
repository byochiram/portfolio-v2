"use client";

import { useEffect, useState } from "react";

const greetings = [
  "HALO.",
  "HELLO.",
  "BONJOUR.",
  "HOLA.",
  "CIAO.",
  "こんにちは.",
  "안녕하세요.",
  "你好.",
  "مرحباً.",
];

export default function Intro({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const timeout = window.setTimeout(onDone, 120);
      return () => window.clearTimeout(timeout);
    }

    const delay = index === greetings.length - 1 ? 560 : 300;
    const timeout = window.setTimeout(() => {
      if (index < greetings.length - 1) {
        setIndex((value) => value + 1);
      } else {
        setLeaving(true);
        window.setTimeout(onDone, 780);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [index, onDone]);

  return (
    <div className={`intro ${leaving ? "intro--leaving" : ""}`} aria-live="polite">
      <div className="intro__orb intro__orb--one" />
      <div className="intro__orb intro__orb--two" />
      <p key={index} className="intro__word">
        {greetings[index]}
      </p>
      <span className="intro__counter">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

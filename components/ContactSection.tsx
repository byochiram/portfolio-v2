"use client";

import { memo } from "react";
import { portfolio } from "@/data/portfolio";
import Icon from "@/components/Icon";

type Copy = { contactTitle: string; contactLabel: string; contactBody: string };

const contactLinks = [
  {
    label: "GitHub",
    value: "@byochiram",
    href: portfolio.social.github,
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "Rosidah Rahmati",
    href: portfolio.social.linkedin,
    icon: "linkedin",
  },
  {
    label: "Email",
    value: portfolio.email,
    href: `mailto:${portfolio.email}`,
    icon: "mail",
  },
] as const;

function ContactSection({ copy }: { copy: Copy }) {
  return (
    <section id="contact" className="contact contact--simple" data-reveal>
      <div className="section-shell section-block contact-simple">
        <header className="contact-simple__intro">
          <h2 className="section-title">
            Let&apos;s <em>connect.</em>
          </h2>
          <p>{copy.contactBody}</p>
        </header>

        <div className="contact-simple__links">
          {contactLinks.map((item) => (
            <a
              href={item.href}
              key={item.label}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="contact-simple__icon">
                <Icon name={item.icon} size={19} />
              </span>
              <small>{item.label}</small>
              <strong>{item.value}</strong>
              <span className="contact-simple__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ContactSection);

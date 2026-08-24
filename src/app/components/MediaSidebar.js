"use client";
import { FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

const ICONS = [
  { Icon: FiInstagram, label: "instagram", href: "https://www.instagram.com/farisxdev" },
  { Icon: FiLinkedin, label: "linkedin", href: "https://www.linkedin.com/in/farisxdev/" },
  { Icon: FiMail, label: "email", href: "mailto:farisxdev@gmail.com" },
];

export function MediaSidebar() {
  return (
    <div className="hidden md:flex flex-col items-center fixed z-[60]"
      style={{ left: 36, top: 0, gap: 16 }}>
      <div style={{ width: 1, height: "28vh", backgroundColor: "#abb2bf", marginBottom: 4 }} />
      {ICONS.map(({ Icon, label, href }) => (
        <a key={label} href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          style={{ color: "#abb2bf", opacity: 0.7 }}
          className="hover:opacity-100 transition-opacity">
          <Icon size={22} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

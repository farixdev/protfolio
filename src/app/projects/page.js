"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MediaSidebar } from "../components/MediaSidebar";

// ── Media Sidebar ─────────────────────────────────────────────────────────────
// Component imported from ../components/MediaSidebar

// ── Button ────────────────────────────────────────────────────────────────────
function Btn({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        fontFamily: "FiraCode-Regular",
        padding: "8px 16px",
        border: "1px solid #c470db",
        color: "#fff",
        fontSize: 14,
        textDecoration: "none",
        backgroundColor: hovered ? "#c470db3b" : "transparent",
        transition: "background 0.2s",
      }}
    >
      {children}
    </a>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 40,
      }}
    >
      <h2
        style={{
          fontFamily: "FiraCode-SemiBold",
          fontSize: 28,
          color: "#fff",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "#c470db" }}>#</span>
        {children}
      </h2>
      <div style={{ height: 1, backgroundColor: "#c470db", width: 80 }} />
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ image, techs, name, desc, links }) {
  return (
    <div
      style={{
        border: "1px solid #abb2bf",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ borderBottom: "1px solid #abb2bf", overflow: "hidden" }}>
        <Image
          src={image}
          alt={name}
          width={400}
          height={220}
          className="w-full object-cover"
          style={{ display: "block" }}
        />
      </div>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 16px",
          padding: "8px 12px",
          borderBottom: "1px solid #abb2bf",
          color: "#abb2bf",
          fontFamily: "FiraCode-Regular",
          fontSize: 13,
          listStyle: "none",
        }}
      >
        {techs.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flex: 1,
        }}
      >
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>
          {name}
        </div>
        <div
          style={{
            color: "#abb2bf",
            fontFamily: "FiraCode-Regular",
            fontSize: 14,
          }}
        >
          {desc}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: "auto",
          }}
        >
          {links.map(({ label, href }) => (
            <Btn key={label} href={href}>
              {label} =&gt;
            </Btn>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
// Component imported from ../components/Footer

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Projects() {
  const projects = [
    {
      image: "/icons/calora-ai-portal.png",
      techs: ["Next.js", "NestJS", "PostgreSQL", "Tailwind CSS"],

      name: "Calora AI Portal",

      desc: "A modern HR management portal built to streamline employee management and payroll system",
      links: [],
    },
    {
      image: "/icons/Hush.png",
      techs: ["Flutter", "Dart", "Firebase"],
      name: "Hush Anonymous Chat App",
      desc: "A Flutter-based anonymous chat application that allows users to connect and communicate without revealing their identities.",
      links: [
        { label: "Website", href: "https://hush-seven-livid.vercel.app/" },
      ],
    },
    {
      image: "/icons/insta_finder2.png",
      techs: ["Python", "PyQt5", "Selenium"],
      name: "InstaMap Scraper",

      desc: "An automation tool that discovers local businesses through Google Maps and extracts website and Instagram.",
      links: [
        {
          label: "Github",
          href: "https://github.com/farixdev/InstagramScrapper",
        },
      ],
    },

    {
      image: "/icons/siteMirror.png",
      techs: ["Python", "Selenium", "BeautifulSoup", "PyQt5"],
      name: "SiteMirror",
      desc: "A desktop application that allows users to create local copies of websites for offline browsing",
      links: [
        { label: "Github", href: "https://github.com/farixdev/SiteMirror" },
      ],
    },

    {
      image: "/icons/kernelGhost.png",
      techs: ["Python"],
      name: "Kernel Ghost",
      desc: "A command-line based simulation tool that mimics real system-level activity",
      links: [
        { label: "Github", href: "https://github.com/farixdev/kernelGhost" },
      ],
    },

    {
      image: "/icons/thingsineversaid2.png",
      techs: ["Next.js", "NestJS", "MongoDB", "Tailwind CSS"],
      name: "Things I Never Said",
      desc: "An anonymous confession platform where people share the thoughts and words they never had the courage to say.",
      links: [
        {
          label: "Figma",
          href: "https://www.figma.com/design/KaO7WhtydVZvxO04tAMTHo/Things-I-never-said?node-id=0-1&t=bxciuK60A9leEAyG-1",
        },
        {
          label: "Github",
          href: "https://github.com/farixdev/ThingsINeverSaid",
        },
      ],
    },

    {
      image: "/icons/drift2.png",
      techs: ["Python", "PyQt5", "Groq Ai", "Selenium"],
      name: "drift.jobs",
      desc: " Desktop app that parses your resume, scrapes job boards, and scores listings with AI",
      links: [
        { label: "Github", href: "https://github.com/farixdev/Drift.jobs" },
      ],
    },

    {
      image: "/icons/mapharvest.png",
      techs: ["Python", "PyQt5", "Selenium"],
      name: "MapHarvest",
      desc: "Desktop app that scrapes Google Maps business listings and exports names, ratings, contacts & more to CSV",
      links: [
        { label: "Github", href: "https://github.com/farixdev/MapHarvest" },
      ],
    },

    {
      image: "/icons/Aegis-waf.png",
      techs: [
        "Python",
        "Flask",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Jinja2",
        "SQLite",
        "Socket.IO",
      ],
      name: "Aegis WAF",
      desc: "A Python-based Web Application Firewall featuring real-time attack detection, a live SOC dashboard, an attack simulator, and a vulnerable lab for cybersecurity research.",
      links: [],
    },

    {
      image: "/icons/air-sketch.png",
      techs: [
        "Python",
        "MediaPipe",
        "OpenCV",
        "NumPy",
        "CustomTkinter",
        "SQLite",
        "Win32 API",
      ],
      name: "Air Sketch",
      desc: "Draw on screen with hand gestures a webcam + MediaPipe tracker turns finger poses into ink rendered over any app. Auto-refines wobbly shapes into clean circles/rects/lines, smooths handwriting without reshaping it, and supports gesture-based undo/redo, color picking, and a dwell-activated HUD.",
      links: [],
    },

    {
      image: "/icons/Kasoti.png",
      techs: ["JavaScript", "HTML5", "CSS3", "localStorage"],
      name: "Kasoti",
      desc: "A 20-questions mind-reading game with a real Bayesian reasoning engine — it tracks probability across 348 things, picks each question by information gain, and shows a live 'AI's mind' panel of its uncertainty and top guesses. Learns from wrong guesses and gets sharper the more you play.",

      links: [],
    },

    {
      image: "/icons/fiona.png",
      techs: [
        "Python",
        "OpenAI Realtime API",
        "Twilio",
        "pywebview",
        "SQLite",
        "WebSockets",
      ],
      name: "Fiona",
      desc: "A desktop AI voice-calling studio that answers and places real phone calls by bridging Twilio's telephony to OpenAI's Realtime speech-to-speech API. Handles inbound/outbound campaigns, per-call transcription and lead extraction, exact usage-based cost tracking, and clock-accurate interruption handling across the audio bridge.",

      links: [],
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#282C33",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar active="projects" />
      <MediaSidebar />

      <main
        style={{
          maxWidth: 1024,
          margin: "0 auto",
          padding: "100px 24px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 64,
          flex: 1,
          width: "100%",
        }}
      >
        {/* Page title */}
        <div>
          <h1
            style={{
              fontFamily: "FiraCode-SemiBold",
              fontSize: "clamp(28px,5vw,40px)",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "#c470db" }}>/</span>projects
          </h1>
          <p
            style={{
              color: "#abb2bf",
              fontFamily: "FiraCode-Regular",
              fontSize: 14,
              marginTop: 12,
            }}
          >
            All of my projects
          </p>
        </div>

        {/* Projects grid */}
        <section>
          <SectionHeading>projects</SectionHeading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.name} {...p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

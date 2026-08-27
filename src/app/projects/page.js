"use client";
import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MediaSidebar } from "../components/MediaSidebar";
import { CATEGORIES, PROJECTS } from "../projectsData.mjs";

// ── Non-clickable badge for projects without public links ─────────────────────
function PrivateBadge() {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "FiraCode-Regular",
        padding: "8px 16px",
        border: "1px solid #abb2bf",
        color: "#abb2bf",
        fontSize: 14,
        cursor: "default",
      }}
    >
      Private build — demo on request
    </span>
  );
}

// ── Button ────────────────────────────────────────────────────────────────────
function Btn({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <h2 style={{ fontFamily: "FiraCode-SemiBold", fontSize: 24, color: "#fff", fontWeight: 500, whiteSpace: "nowrap" }}>
        <span style={{ color: "#c470db" }}>#</span>
        {children}
      </h2>
      <div style={{ height: 1, backgroundColor: "#c470db", flex: 1 }} />
    </div>
  );
}

// ── Tech stack line — muted mono tags with purple middots ─────────────────────
function TechLine({ techs }) {
  return (
    <div style={{ fontFamily: "FiraCode-Regular", fontSize: 12.5, color: "#8a93a0", lineHeight: 1.6 }}>
      {techs.map((tech, i) => (
        <span key={tech}>
          {i > 0 && <span style={{ color: "#c470db" }}> · </span>}
          {tech}
        </span>
      ))}
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ cover, name, techs, desc, links }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid #abb2bf",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s, transform 0.2s",
        borderColor: hovered ? "#c470db" : "#abb2bf",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      <div style={{ borderBottom: "1px solid #abb2bf", overflow: "hidden" }}>
        {/* Minimal generated cover — carries the title + tech stack */}
        <img
          src={cover}
          alt={name}
          width={800}
          height={450}
          loading="lazy"
          style={{ display: "block", width: "100%", aspectRatio: "16 / 9", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 500, fontFamily: "FiraCode-Medium" }}>{name}</h3>
        <TechLine techs={techs} />
        <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, lineHeight: 1.7, flex: 1, marginTop: 2 }}>{desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
          {links.length > 0 ? (
            links.map(({ label, href }) => (
              <Btn key={label} href={href}>{label} =&gt;</Btn>
            ))
          ) : (
            <PrivateBadge />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <div style={{ backgroundColor: "#282C33", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column" }}>
      <Navbar active="projects" />
      <MediaSidebar />

      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "100px 24px 64px", display: "flex", flexDirection: "column", gap: 64, flex: 1, width: "100%" }}>
        {/* Page title */}
        <div>
          <h1 style={{ fontFamily: "FiraCode-SemiBold", fontSize: "clamp(28px,5vw,40px)", color: "#fff", fontWeight: 600 }}>
            <span style={{ color: "#c470db" }}>/</span>projects
          </h1>
          <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, marginTop: 12, lineHeight: 1.7, maxWidth: 640 }}>
            {PROJECTS.length}{" "}things I&apos;ve built — AI voice agents, full-stack web apps, automation tools,
            computer-vision experiments, and low-level systems. Grouped by what they do.
          </p>
        </div>

        {/* Categorized sections */}
        {CATEGORIES.map((cat) => (
          <section key={cat.key}>
            <SectionHeading>{cat.label}</SectionHeading>
            <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 13, marginBottom: 28 }}>{cat.blurb}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {cat.projects.map((p) => (
                <ProjectCard key={p.slug} cover={`/covers/${p.slug}.svg`} name={p.name} techs={p.techs} desc={p.desc} links={p.links} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "/", label: "home" },
    { href: "/projects", label: "projects" },
    { href: "/about-me", label: "about-me" },
  ];
  return (
    <header className="fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: "#282C33", borderBottom: "1px solid #abb2bf22" }}>
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Image src="/icons/logo-header-01.png" alt="logo" width={22} height={22} />
          <span style={{ color: "#fff", fontFamily: "FiraCode-Bold", fontSize: 16 }}>Faris</span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 32 }} className="hidden md:flex">
          {links.map(({ href, label }) => (
            <Link key={label} href={href} style={{
              fontFamily: "FiraCode-Medium", fontSize: 16, textDecoration: "none",
              color: active === label ? "#fff" : "#9e9d9d",
            }}>
              <span style={{ color: "#c470db" }}>#</span>{label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {[
            menuOpen ? "rotate(45deg) translate(4px,4px)" : "none",
            null,
            menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none",
          ].map((transform, i) =>
            transform === null
              ? <span key={i} className="block h-px w-6" style={{ backgroundColor: "#c470db", opacity: menuOpen ? 0 : 1 }} />
              : <span key={i} className="block h-px w-6 transition-all duration-300" style={{ backgroundColor: "#c470db", transform }} />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "200px" : "0", backgroundColor: "#1e2227" }}>
        <nav style={{ display: "flex", flexDirection: "column", padding: "16px 24px", gap: 16 }}>
          {links.map(({ href, label }) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "FiraCode-Medium", color: "#9e9d9d", fontSize: 16, textDecoration: "none" }}>
              <span style={{ color: "#c470db" }}>#</span>{label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ── Media Sidebar ─────────────────────────────────────────────────────────────
function MediaSidebar() {
  return (
    <div className="hidden md:flex flex-col items-center fixed z-[60]"
      style={{ left: 32, top: 0, gap: 12 }}>
      <div style={{ width: 1, height: "28vh", backgroundColor: "#abb2bf", marginBottom: 4 }} />
      <a href="#" style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/discord.svg" alt="discord" width={20} height={20} />
      </a>
      <a href="https://github.com/farixdev" target="_blank" rel="noreferrer"
        style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/github.svg" alt="github" width={20} height={20} />
      </a>
      <a href="mailto:onlyfarix@gmail.com" style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/email.svg" alt="email" width={20} height={20} />
      </a>
    </div>
  );
}

// ── Button ────────────────────────────────────────────────────────────────────
function Btn({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block", fontFamily: "FiraCode-Regular",
        padding: "8px 16px", border: "1px solid #c470db",
        color: "#fff", fontSize: 14, textDecoration: "none",
        backgroundColor: hovered ? "#c470db3b" : "transparent",
        transition: "background 0.2s",
      }}>
      {children}
    </a>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
      <h2 style={{ fontFamily: "FiraCode-SemiBold", fontSize: 28, color: "#fff", fontWeight: 500, whiteSpace: "nowrap" }}>
        <span style={{ color: "#c470db" }}>#</span>{children}
      </h2>
      <div style={{ height: 1, backgroundColor: "#c470db", width: 80 }} />
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ image, techs, name, desc, links }) {
  return (
    <div style={{ border: "1px solid #abb2bf", display: "flex", flexDirection: "column" }}>
      <div style={{ borderBottom: "1px solid #abb2bf", overflow: "hidden" }}>
        <Image src={image} alt={name} width={400} height={220}
          className="w-full object-cover" style={{ display: "block" }} />
      </div>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", padding: "8px 12px", borderBottom: "1px solid #abb2bf", color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 13, listStyle: "none" }}>
        {techs.map(t => <li key={t}>{t}</li>)}
      </ul>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>{name}</div>
        <div style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14 }}>{desc}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
          {links.map(({ label, href }) => <Btn key={label} href={href}>{label} =&gt;</Btn>)}
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #abb2bf", paddingTop: 32, paddingBottom: 16 }}>
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Image src="/icons/logo-header-01.png" alt="logo" width={26} height={26} />
                <span style={{ color: "#fff", fontWeight: 700, fontFamily: "FiraCode-Bold" }}>Faris</span>
              </div>
              <a href="mailto:onlyfarix@gmail.com" style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 13, textDecoration: "none" }}>
                onlyfarix@gmail.com
              </a>
            </div>
            <p style={{ color: "#fff", marginTop: 12, fontFamily: "FiraCode-Regular", fontSize: 13 }}>
              Web designer and front-end developer based in Pakistan
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 20, color: "#fff", fontFamily: "FiraCode-Medium", marginBottom: 10 }}>Media</div>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { src: "/icons/discord.svg", alt: "discord", href: "#" },
                { src: "/icons/email.svg", alt: "email", href: "mailto:onlyfarix@gmail.com" },
                { src: "/icons/github.svg", alt: "github", href: "https://github.com/farixdev" },
              ].map(({ src, alt, href }) => (
                <a key={alt} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
                  <Image src={src} alt={alt} width={24} height={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p style={{ color: "#abb2bf", textAlign: "center", fontFamily: "FiraCode-Regular", fontSize: 13 }}>
          © Copyright 2025. Made by Faris
        </p>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Projects() {
  const projects = [
    {
      image: "/icons/deplos.png",
      techs: ["HTML", "CSS", "JavaScript"],
      name: "Calculator",
      desc: "Web Based Calculator",
      links: [{ label: "Figma", href: "#" }, { label: "Live", href: "https://deplos.github.io" }, { label: "Github", href: "#" }],
    },
    {
      image: "/icons/E-book.png",
      techs: ["C++"],
      name: "E-book Reader",
      desc: "Electronic book reader",
      links: [{ label: "Live", href: "#" }, { label: "Github", href: "#" }],
    },
    {
      image: "/icons/mapleads.png",
      techs: ["Python", "PyQt5"],
      name: "MapLeads",
      desc: "A desktop application to extract leads from Google Maps",
      links: [{ label: "Github", href: "#" }, { label: "Live", href: "#" }],
    },
  ];

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
          <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, marginTop: 12 }}>
            All of my projects
          </p>
        </div>

        {/* Projects grid */}
        <section>
          <SectionHeading>projects</SectionHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {projects.map(p => <ProjectCard key={p.name} {...p} />)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
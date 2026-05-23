"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Dot grid — fixed pixel size, never stretches ─────────────────────────────
function DotGrid({ cols = 5, rows = 5, size = 100 }) {
  const r = 3;
  const gap = (size - r * 2) / Math.max(cols - 1, 1);
  const circles = [];
  for (let c = 0; c < cols; c++)
    for (let row = 0; row < rows; row++)
      circles.push(
        <circle key={`${c}-${row}`} cx={r + c * gap} cy={r + row * gap} r={r} fill="#abb2bf" />
      );
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ display: "block", opacity: 0.45, flexShrink: 0 }}
    >
      {circles}
    </svg>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "home" },
    { href: "/projects", label: "projects" },
    { href: "/about-me", label: "about-me" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "#282C33ee" : "#282C33",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid #abb2bf33" : "none",
      }}
    >
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
          <Image src="/icons/logo-header-01.png" alt="logo" width={22} height={22} />
          <span style={{ color: "#fff", fontFamily: "FiraCode-Bold", fontSize: 16 }}>Faris</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link key={label} href={href} style={{ fontFamily: "FiraCode-Medium", color: "#9e9d9d", fontSize: 16, textDecoration: "none" }}
              className="hover:text-white transition-colors duration-200">
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
            transform === null ? (
              <span key={i} className="block h-px w-6" style={{ backgroundColor: "#c470db", opacity: menuOpen ? 0 : 1 }} />
            ) : (
              <span key={i} className="block h-px w-6 transition-all duration-300" style={{ backgroundColor: "#c470db", transform }} />
            )
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "200px" : "0", backgroundColor: "#1e2227" }}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          {links.map(({ href, label }) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "FiraCode-Medium", color: "#9e9d9d", fontSize: 16, textDecoration: "none" }}
              className="hover:text-white transition-colors">
              <span style={{ color: "#c470db" }}>#</span>{label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ── Left media sidebar — desktop only ────────────────────────────────────────
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
// ── Button ───────────────────────────────────────────────────────────────────
function Btn({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href}
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
      }}>
      {children}
    </a>
  );
}

// ── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: "FiraCode-SemiBold", fontSize: 28, color: "#fff", fontWeight: 500, whiteSpace: "nowrap" }}>
        <span style={{ color: "#c470db" }}>#</span>{children}
      </h2>
      <div style={{ height: 1, backgroundColor: "#c470db", width: 80 }} />
    </div>
  );
}

// ── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ image, techs, name, desc, links }) {
  return (
    <div style={{ border: "1px solid #abb2bf", display: "flex", flexDirection: "column" }}>
      <div style={{ borderBottom: "1px solid #abb2bf", overflow: "hidden" }}>
        <Image src={image} alt={name} width={400} height={220}
          className="w-full object-cover" style={{ display: "block" }} />
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 px-3 py-2"
        style={{ borderBottom: "1px solid #abb2bf", color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 13, listStyle: "none" }}>
        {techs.map(t => <li key={t}>{t}</li>)}
      </ul>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>{name}</div>
        <div style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14 }}>{desc}</div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {links.map(({ label, href }) => <Btn key={label} href={href}>{label} =&gt;</Btn>)}
        </div>
      </div>
    </div>
  );
}

// ── Skill block ──────────────────────────────────────────────────────────────
function SkillBlock({ name, skills }) {
  return (
    <div style={{ border: "1px solid #abb2bf", minWidth: 160, maxWidth: 220 }}>
      <div className="px-3 py-2"
        style={{ borderBottom: "1px solid #abb2bf", color: "#fff", fontWeight: 600, fontFamily: "FiraCode-Bold", fontSize: 14 }}>
        {name}
      </div>
      <ul className="flex flex-wrap gap-2 p-3"
        style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 13, listStyle: "none" }}>
        {skills.filter(Boolean).map(s => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
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

  const skills = [
    { name: "Languages", skills: ["JavaScript", "C++", "Python"] },
    { name: "Additional", skills: ["Wordpress", "Graphic Designing"] },
    { name: "Other", skills: ["HTML", "CSS", "Tailwind"] },
    { name: "Frameworks", skills: ["React", "Next", "PyQt5"] },
  ];

  return (
    <div style={{ backgroundColor: "#282C33", minHeight: "100vh", color: "#fff" }}>
      <Navbar />
      <MediaSidebar />

      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "100px 24px 0", display: "flex", flexDirection: "column", gap: 96 }}>

        {/* ── HERO ── */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontFamily: "FiraCode-SemiBold", fontSize: "clamp(24px,4vw,36px)", color: "#fff", fontWeight: 600, lineHeight: 1.35 }}>
              Faris is a{" "}
              <span style={{ color: "#c470db", fontFamily: "FiraCode-Medium" }}>web designer</span>
              {" "}and{" "}
              <span style={{ color: "#c470db", fontFamily: "FiraCode-Medium" }}>front-end</span>
              {" "}developer
            </h1>
            <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", marginTop: 24, marginBottom: 28, fontSize: 15, lineHeight: 1.7 }}>
              He crafts responsive websites where technologies meet creativity
            </p>
            <Btn href="#contacts">Contact ME =&gt;</Btn>
          </div>

          {/* Right illustration */}
          <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            {/* outline logo — top-left of the image box */}
            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}>
              <Image src="/icons/logo-outline.svg" alt="" width={110} height={110} aria-hidden style={{ opacity: 0.55 }} />
            </div>

            {/* hero photo */}
            <div style={{ position: "relative", zIndex: 2, borderBottom: "2px solid #c470db", width: "100%", maxWidth: 380 }}>
              <Image src="/icons/hero-3.png" alt="Faris" width={380} height={420}
                className="w-full object-cover" style={{ display: "block" }} />
            </div>

            {/* status badge */}
            <div style={{
              border: "1px solid #abb2bf", color: "#abb2bf", padding: "6px 14px",
              fontFamily: "FiraCode-Regular", fontSize: 13,
              display: "inline-flex", alignItems: "center", gap: 8,
              position: "relative", zIndex: 5, top: -1, alignSelf: "flex-end",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#c470db", display: "inline-block" }} />
              Open for new opportunities
            </div>

            {/* dot grid — bottom right corner */}
            <div style={{ position: "absolute", bottom: -20, right: -10, zIndex: 0 }}>
              <DotGrid cols={5} rows={5} size={104} />
            </div>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <figure style={{ border: "1px solid #abb2bf", margin: 0 }}>
          <blockquote style={{ padding: "28px 32px", fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 500, color: "#fff", fontFamily: "FiraCode-Medium" }}>
            <span style={{ color: "#abb2bf", fontSize: 40, lineHeight: 0, verticalAlign: "-0.35em", marginRight: 8 }}>"</span>
            My portfolio looks better than my life
            <span style={{ color: "#abb2bf", fontSize: 40, lineHeight: 0, verticalAlign: "-0.35em", marginLeft: 8 }}>"</span>
          </blockquote>
        </figure>

        {/* ── PROJECTS ── */}
        <section>
          <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: 40 }}>
            <SectionHeading>projects</SectionHeading>
            <Link href="/projects"
              style={{ color: "#fff", textDecoration: "underline", fontFamily: "FiraCode-Regular", fontSize: 14 }}>
              View all ~~&gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(p => <ProjectCard key={p.name} {...p} />)}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section>
          <SectionHeading>skills</SectionHeading>
          <div className="flex flex-col md:flex-row gap-10 items-start">

            {/* Illustration — desktop only, fixed size container */}
            <div className="hidden md:block flex-shrink-0" style={{ width: 200, height: 260, position: "relative" }}>
              {/* logo outline centered */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1 }}>
                <Image src="/icons/logo-outline.svg" alt="" width={80} height={80} aria-hidden style={{ opacity: 0.5 }} />
              </div>
              {/* top-left dots */}
              <div style={{ position: "absolute", top: 0, left: 0 }}>
                <DotGrid cols={4} rows={4} size={80} />
              </div>
              {/* bottom-right dots */}
              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                <DotGrid cols={5} rows={5} size={104} />
              </div>
            </div>

            {/* Skill blocks */}
            <div className="flex flex-wrap gap-4 flex-1">
              {skills.map(s => <SkillBlock key={s.name} name={s.name} skills={s.skills} />)}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section className="flex flex-col md:flex-row gap-10 justify-between items-start">
          <div style={{ flex: 1, minWidth: 0 }}>
            <SectionHeading>about</SectionHeading>
            <div className="flex flex-col gap-4" style={{ marginBottom: 32 }}>
              <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, lineHeight: 1.8 }}>
                I'm a self-taught developer based in Lahore, Pakistan. I specialize in building both
                desktop and web applications, creating responsive and efficient solutions that blend
                functionality with simplicity.
              </p>
              <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, lineHeight: 1.8 }}>
                For the past two years, coding has been more than just a skill for me—it's been a passion.
                I primarily work with Python and JS, building practical tools and modern apps. I'm always
                eager to explore new technologies and deliver better experiences.
              </p>
            </div>
            <Btn href="/about-me">View all -&gt;</Btn>
          </div>
          <div style={{ flexShrink: 0, width: "100%", maxWidth: 380 }} className="md:w-auto">
            <Image src="/icons/image_hoodie.png" alt="Faris" width={380} height={420}
              className="w-full object-cover" style={{ display: "block", borderBottom: "2px solid #c470db" }} />
          </div>
        </section>

        {/* ── CONTACTS ── */}
        <section id="contacts" style={{ paddingBottom: 64 }}>
          <SectionHeading>contacts</SectionHeading>
          <div className="flex flex-col sm:flex-row gap-10 justify-between items-start">
            <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, lineHeight: 1.8, maxWidth: 420 }}>
              I'm interested in freelance opportunities. However, if you have other requests or questions, don't hesitate to contact me.
            </p>
            <div style={{ border: "1px solid #abb2bf", padding: 20, minWidth: 240, flexShrink: 0 }}>
              <h3 style={{ fontWeight: 600, color: "#fff", fontFamily: "FiraCode-Bold", marginBottom: 16, fontSize: 15 }}>
                Message me here
              </h3>
              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center gap-3"
                  style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#abb2bf"}>
                  <Image src="/icons/instagram-01-01.svg" alt="instagram" width={26} height={26} />
                  faris.dev.
                </a>
                <a href="mailto:onlyfarix@gmail.com" className="flex items-center gap-3"
                  style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#abb2bf"}>
                  <Image src="/icons/email.svg" alt="email" width={22} height={22} />
                  onlyfarix@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #abb2bf", paddingTop: 32, paddingBottom: 16 }}>
        <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px" }}>
          <div className="flex flex-col sm:flex-row justify-between gap-8 flex-wrap" style={{ marginBottom: 40 }}>
            <div>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Image src="/icons/logo-header-01.png" alt="logo" width={26} height={26} />
                  <span style={{ color: "#fff", fontWeight: 700, fontFamily: "FiraCode-Bold" }}>Faris</span>
                </div>
                <a href="mailto:onlyfarix@gmail.com" style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 13 }}>
                  onlyfarix@gmail.com
                </a>
              </div>
              <p style={{ color: "#fff", marginTop: 12, fontFamily: "FiraCode-Regular", fontSize: 13 }}>
                Web designer and front-end developer based in Pakistan
              </p>
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 20, color: "#fff", fontFamily: "FiraCode-Medium", marginBottom: 10 }}>Media</div>
              <div className="flex gap-4">
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
    </div>
  );
}
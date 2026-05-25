"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MediaSidebar } from "./components/MediaSidebar";

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



// ── Left media sidebar — desktop only ────────────────────────────────────────
// Component imported from ./components/MediaSidebar
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
      <ul className="flex flex-wrap gap-x-4 gap-y-1"
        style={{ 
          borderBottom: "1px solid #abb2bf", 
          color: "#abb2bf", 
          fontFamily: "FiraCode-Regular", 
          fontSize: 13, 
          listStyle: "none",
          padding: "10px 16px"
        }}>
        {techs.map(t => <li key={t}>{t}</li>)}
      </ul>
      <div style={{ padding: "16px 16px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}>{name}</div>
        <div style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14 }}>{desc}</div>
        <div className="flex flex-wrap gap-2" style={{ marginTop: "auto" }}>
          {links.map(({ label, href }) => <Btn key={label} href={href}>{label} =&gt;</Btn>)}
        </div>
      </div>
    </div>
  );
}

// ── Skill block ──────────────────────────────────────────────────────────────
function SkillBlock({ name, skills }) {
  return (
    <div style={{ border: "1px solid #abb2bf", minWidth: 110, maxWidth: 220 }}>
      <div style={{ 
        borderBottom: "1px solid #abb2bf", 
        color: "#fff", 
        fontWeight: 600, 
        fontFamily: "FiraCode-Bold", 
        fontSize: 14,
        padding: "10px 16px"
      }}>
        {name}
      </div>
      <ul style={{ 
        color: "#abb2bf", 
        fontFamily: "FiraCode-Regular", 
        fontSize: 13, 
        listStyle: "none",
        padding: "12px 16px",
        display: "flex",
        flexWrap: "wrap",
        gap:8 ,
        margin: 0
      }}>
        {skills.filter(Boolean).map(s => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const projects = [
    {
      image: "/icons/Hr-Web-Portal.png",
   techs: ["Next.js", "NestJS", "MongoDB", "Tailwind CSS"],

name: "HR Nexus",

desc: "A modern HR management portal built to streamline employee management",
      links: [{ label: "Figma", href: "https://www.figma.com/design/de9FmmVprHrJCfKnLJLo2s/HR-portal?node-id=0-1&t=QF4cZkCFRQjkSkDc-1" }, , { label: "Github", href: "https://github.com/farixdev/HR-Portal" }],
    },
    {
      image: "/icons/insta_finder2.png",
      techs: ["Python", "PyQt5" , 'Selenium'],
      name: "InstaMap Scraper",

desc: "An automation tool that discovers local businesses through Google Maps and extracts website and Instagram.",
      links: [{ label: "Github", href: "https://github.com/farixdev/InstagramScrapper" }],
    },
    {
      image: "/icons/App-FStore.png",
      techs: ["Flutter", "Dart" , 'Firebase'],
      name: "F-Store",
      desc: "A modern Flutter e-commerce app with a full shopping experience and powerful admin panel",
      links: [{ label: "Github", href: "https://github.com/farixdev/shop" }],
    },
  ];

const skills = [
  { name: "Languages",   skills: ["JavaScript", "Python", "Dart", "HTML5", "CSS3", "C++"] },
  { name: "Frontend",    skills: ["React.js", "Next.js", "Flutter", "Tailwind CSS", "Bootstrap"] },
  { name: "Backend",     skills: ["Node.js", "NestJS", "REST APIs"] },
  { name: "Databases",   skills: ["MongoDB", "MySQL", "Firebase"] },
  { name: "Additional",  skills: ["WordPress", "Shopify", "WooCommerce", "Elementor"] },
  { name: "Automation",  skills: ["Python Scripting", "BeautifulSoup", "Selenium", "Task Scheduling"] },
  { name: "Design",      skills: ["Photoshop", "Illustrator", "Figma"] },
  { name: "DevOps",      skills: ["Git", "GitHub", "Linux CLI", "cPanel"] },
];

  return (
    <div style={{ backgroundColor: "#282C33", minHeight: "100vh", color: "#fff" }}>
      <Navbar active="home" />
      <MediaSidebar />

      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "100px 24px 0", display: "flex", flexDirection: "column", gap: 96 }}>
{/* ── HERO ── */}
<section className="flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Left text */}
  <div style={{ flex: 1, minWidth: 0 }}>
    <h1 style={{ fontFamily: "FiraCode-SemiBold", fontSize: "clamp(24px,4vw,36px)", color: "#fff", fontWeight: 600, lineHeight: 1.35 }}>
      Faris {"is a "}{" "} <br />
      <span style={{ color: "#c470db", fontFamily: "FiraCode-Medium" }}>Full-Stack Developer</span>
      {" "}&{" "}
      <span style={{ color: "#c470db", fontFamily: "FiraCode-Medium" }}>Automation Engineer</span>
    </h1>
    <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", marginTop: 24, marginBottom: 28, fontSize: 15, lineHeight: 1.7 }}>
      I turn complex problems into clean, working software{" "}<br />
      web apps, e-commerce platforms, and custom automation tools built for real business impact.
    </p>
    <Btn href="#contacts">Contact ME =&gt;</Btn>
  </div>
fa
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

           
    {/* status badge — now anchored to photo width */}
    <div style={{
      border: "1px solid #abb2bf", color: "#abb2bf", padding: "6px 14px",
      fontFamily: "FiraCode-Regular", fontSize: 13,
      display: "inline-flex", alignItems: "center", gap: 8,
      width: "80%", boxSizing: "border-box",
      justifyContent: "center",
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
<figure style={{ border: "1px solid #abb2bf", margin: "0 auto", maxWidth: 720 }}>
  <blockquote style={{ padding: "28px 32px", fontSize: "clamp(16px,2.5vw,22px)", fontWeight: 500, color: "#fff", fontFamily: "FiraCode-Medium", textAlign: "center" }}>
    <span style={{ color: "#abb2bf", fontSize: 40, lineHeight: 0, verticalAlign: "-0.35em", marginRight: 8 }}>"</span>
    Pixel-perfect on the frontend. Questionable life choices on the backend.
    <span style={{ color: "#abb2bf", fontSize: 40, lineHeight: 0, verticalAlign: "-0.35em", marginLeft: 8 }}>"</span>
  </blockquote>
</figure>

{/* ── PROJECTS ── */}
<section>
  <div className="flex items-center justify-between flex-wrap gap-4" style={{ marginBottom: 40 }}>
    <div style={{ marginBottom: -40 }}>
      <SectionHeading>projects</SectionHeading>
    </div>
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
  I'm a full-stack developer and automation engineer based in Lahore, Pakistan, 
  with 5+ years of experience building web applications, e-commerce platforms, 
  and custom software tools that solve real business problems.
</p>
<p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, lineHeight: 1.8 }}>
  I work across the full stack — from React and Next.js frontends to Node.js 
  backends, WordPress and Shopify stores, and Flutter mobile apps. When 
  repetitive work slows teams down, I automate it with Python.
</p>
<p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, lineHeight: 1.8 }}>
  Currently studying Software Engineering at Superior University, Lahore — 
  and building real things while I do it.
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
          <div className="flex flex-col sm:flex-row gap-10 justify-between " style={{ alignItems: "flex-start" }}>
            <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, lineHeight: 1.8, maxWidth: 420 }}>
              I'm interested in freelance opportunities. However, if you have other requests or questions, don't hesitate to contact me.
            </p>
            <div style={{ border: "1px solid #abb2bf", padding: 20, minWidth: 240, flexShrink: 0 ,  alignSelf: "flex-start"}}>
              <h3 style={{ fontWeight: 600, color: "#fff", fontFamily: "FiraCode-Bold", marginBottom: 16, fontSize: 15 }}>
                Message me here
              </h3>
              <div className="flex flex-col gap-4">
                <a href="https://www.instagram.com/farisxdev" className="flex items-center gap-3"
                  style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#abb2bf"}>
                  <Image src="/icons/instagram-01-01.svg" alt="instagram" width={24} height={24} />
                  farisxdev
                </a>
                <a href="mailto:farisxdev@gmail.com" className="flex items-center gap-3"
                  style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, textDecoration: "none" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#abb2bf"}>
                  <Image src="/icons/email.svg" alt="email" width={22} height={22} />
                  farisxdev@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
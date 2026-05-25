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
// Component imported from ../components/Footer

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Projects() {
const projects = [
    {
      image: "/icons/Hr-Web-Portal.png",
   techs: ["Next.js", "NestJS", "MongoDB", "Tailwind CSS"],

name: "HR Nexus",

desc: "A modern HR management portal built to streamline employee management",
      links: [{ label: "Figma", href: "https://www.figma.com/design/de9FmmVprHrJCfKnLJLo2s/HR-portal?node-id=0-1&t=QF4cZkCFRQjkSkDc-1" }, , { label: "Github", href: "https://github.com/farixdev/HR-Portal" }],
    },
    {
      image: "/icons/chat-app.png",
      techs: ["Flutter", "Dart" , 'Firebase'],
      name: "Chatify",
      desc: "A real-time Flutter chat app powered by Firebase",
      links: [{ label: "Github", href: "https://github.com/farixdev/chat-app" }],
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
    {
      image: "/icons/wordpress-jary.png",
      techs: ["Wordpress",],
      name: "Jaryinternational E-commerce Website",
      desc: "A custom WordPress-based aviation e-commerce website built for a client",
      links: [{ label: "Live", href: "https://jaryinternational.com/" }],
    },
    {
      image: "/icons/siteMirror.png",
      techs: ["Python", "Selenium" , 'BeautifulSoup' ,'pyqt5'],
      name: "SiteMirror",
      desc: "A desktop application that allows users to create local copies of websites for offline browsing",
      links: [{ label: "Github", href: "https://github.com/farixdev/SiteMirror" }],
    },

    {
      image: "/icons/kernelGhost.png",
      techs: ["Python",],
      name: "Kernel Ghost",
      desc: "A command-line based simulation tool that mimics real system-level activity",
      links: [{ label: "Github", href: "https://github.com/farixdev/kernelGhost" }],
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
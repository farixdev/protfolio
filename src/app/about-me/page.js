"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MediaSidebar } from "../components/MediaSidebar";

// ── Media Sidebar ─────────────────────────────────────────────────────────────
// Component imported from ../components/MediaSidebar
// ── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
      <h2 style={{ fontFamily: "FiraCode-SemiBold", fontSize: 28, color: "#fff", fontWeight: 500, whiteSpace: "nowrap" }}>
        <span style={{ color: "#c470db" }}>#</span>{children}
      </h2>
      <div style={{ height: 1, backgroundColor: "#c470db", width: 80 }} />
    </div>
  );
}

// ── Skill block ───────────────────────────────────────────────────────────────
function SkillBlock({ name, skills }) {
  return (
    <div style={{ border: "1px solid #abb2bf", minWidth: 160 }}>
      <div style={{ borderBottom: "1px solid #abb2bf", color: "#fff", fontWeight: 600, fontFamily: "FiraCode-Bold", fontSize: 14, padding: "8px 12px" }}>
        {name}
      </div>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 12, color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 13, listStyle: "none" }}>
        {skills.filter(Boolean).map(s => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
// Component imported from ../components/Footer

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutMe() {
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

  const facts = [
    "I like winter more than summer",
    "Sometimes I write poetry",
    "Python is my soulmate, but C++ is my guilty crush",
    "I believe cats secretly run the internet",
  ];

  return (
    <div style={{ backgroundColor: "#282C33", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column" }}>
      <Navbar active="about-me" />
      <MediaSidebar />

      <main style={{ maxWidth: 1024, margin: "0 auto", padding: "100px 24px 64px", display: "flex", flexDirection: "column", gap: 80, flex: 1, width: "100%" }}>

        {/* ── Page title ── */}
        <div>
          <h1 style={{ fontFamily: "FiraCode-SemiBold", fontSize: "clamp(28px,5vw,40px)", color: "#fff", fontWeight: 600 }}>
            <span style={{ color: "#c470db" }}>/</span>about-me
          </h1>
          <p style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, marginTop: 12 }}>
            Who am I
          </p>
        </div>

        {/* ── About ── */}
        <section style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start", justifyContent: "space-between" }}>
          {/* Image */}
          <div style={{ flexShrink: 0, width: "100%", maxWidth: 340 }}>
            <Image src="/icons/image_hoodie2.png" alt="Faris" width={340} height={400}
              className="w-full object-cover" style={{ display: "block", borderBottom: "2px solid #c470db" }} />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "  I'm a full-stack developer and automation engineer based in Lahore, Pakistan, with 5+ years of experience building web applications, e-commerce platforms, and custom software tools that solve real business problems.",
              "I work across the full stack — from React and Next.js frontends to Node.js backends, WordPress and Shopify stores, and Flutter mobile apps. When repetitive work slows teams down, I automate it with Python.",
              "  Currently studying Software Engineering at Superior University, Lahore and building real things while I do it..",
            ].map((text, i) => (
              <p key={i} style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14, lineHeight: 1.8 }}>
                {text}
              </p>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section>
          <SectionHeading>skills</SectionHeading>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {skills.map(s => <SkillBlock key={s.name} name={s.name} skills={s.skills} />)}
          </div>
        </section>

        {/* ── Fun facts ── */}
        <section>
          <SectionHeading>fun-facts</SectionHeading>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: 16, listStyle: "none" }}>
            {facts.map((fact, i) => (
              <li key={i} style={{
                border: "1px solid #abb2bf", padding: "8px 16px",
                color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 14,
              }}>
                {fact}
              </li>
            ))}
          </ul>
        </section>

      </main>

      <Footer />
    </div>
  );
}
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/Navbar";

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
export default function AboutMe() {
  const skills = [
    { name: "Languages",  skills: ["C++", "JavaScript", "Python"] },
    { name: "Databases",  skills: ["SQLite", "PostgreSQL"] },
    { name: "Other",      skills: ["HTML", "CSS", "Tailwind", "Bootstrap"] },
    { name: "Tools",      skills: ["VSCode", "NeoVim", "Figma", "Git & GitHub"] },
    { name: "Frameworks", skills: ["React", "Next", "PyQt5", "SDL2"] },
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
            <Image src="/icons/image_hoodie.png" alt="Faris" width={340} height={400}
              className="w-full object-cover" style={{ display: "block", borderBottom: "2px solid #c470db" }} />
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "I'm a self-taught front-end developer based in Lahore, Pakistan. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.",
              "Transforming my creativity and knowledge into websites has been my passion for over two years. I have been helping various clients to establish their presence online.",
              "I always strive to learn about the newest technologies and frameworks.",
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
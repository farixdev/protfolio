"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function Navbar({ active }) {
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
      className="fixed top-0 left-0 w-full z-50 "
      style={{
        backgroundColor: "#282C33",
        borderBottom: scrolled ? "1px solid #abb2bf33" : "none",
      }}
    >
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Image src="/icons/logo-header-01.png" alt="logo" width={22} height={22} />
          <span style={{ color: "#fff", fontFamily: "FiraCode-Bold", fontSize: 16 }}>Faris</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ gap: 32, display: "flex" }}>
          {links.map(({ href, label }) => (
            <Link key={label} href={href} style={{
              fontFamily: "FiraCode-Medium", fontSize: 16, textDecoration: "none",
              color: active === label ? "#fff" : "#9e9d9d",
            }}
              className="hover:text-white transition-colors duration-200">
              <span style={{ color: "#c470db" }}>#</span>{label}
            </Link>
          ))}
        </nav>

     
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden overflow-hidden transition-all duration-300"
        style={{ maxHeight: menuOpen ? "200px" : "0", backgroundColor: "#1e2227" }}>
        <nav style={{ display: "flex", flexDirection: "column", padding: "16px 24px", gap: 16 }}>
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

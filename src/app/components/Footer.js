"use client";
import Image from "next/image";
import { FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

const SOCIAL = [
  { Icon: FiInstagram, label: "instagram", href: "https://www.instagram.com/farisxdev" },
  { Icon: FiLinkedin, label: "linkedin", href: "https://www.linkedin.com/in/farisxdev/" },
  { Icon: FiMail, label: "email", href: "mailto:farisxdev@gmail.com" },
];

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #abb2bf", paddingTop: 32, paddingBottom: 16 }}>
      <div style={{ maxWidth: 1024, margin: "0 auto", padding: "0 24px" }}>
        <div className="flex flex-col sm:flex-row justify-between gap-8 flex-wrap" style={{ marginBottom: 40 }}>
          <div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Image src="/icons/logo-header-01.png" alt="logo" width={26} height={26} />
                <span style={{ color: "#fff", fontWeight: 700, fontFamily: "FiraCode-Bold" }}>Faris</span>
              </div>
              <a href="mailto:farisxdev@gmail.com" style={{ color: "#abb2bf", fontFamily: "FiraCode-Regular", fontSize: 13 }}>
                farisxdev@gmail.com
              </a>
            </div>
            <p style={{ color: "#fff", marginTop: 12, fontFamily: "FiraCode-Regular", fontSize: 13 }}>
              Full-Stack Developer & Automation Engineer based in Pakistan
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: 20, color: "#fff", fontFamily: "FiraCode-Medium", marginBottom: 10 }}>Media</div>
            <div className="flex gap-4">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  style={{ color: "#abb2bf", opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
                  <Icon size={22} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p style={{ color: "#abb2bf", textAlign: "center", fontFamily: "FiraCode-Regular", fontSize: 13 }}>
          © 2026 Faris
        </p>
      </div>
    </footer>
  );
}

"use client";
import Image from "next/image";

export function MediaSidebar() {
  return (
    <div className="hidden md:flex flex-col items-center fixed z-[60]"
      style={{ left: 36, top: 0, gap: 12 }}>
      <div style={{ width: 1, height: "28vh", backgroundColor: "#abb2bf", marginBottom: 4 }} />
      <a href="https://www.instagram.com/farisxdev" target="_blank" rel="noopener noreferrer"
        style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/instagram-01-01.svg" alt="instagram" width={25} height={25} />
      </a>
      <a href="https://www.linkedin.com/in/farisxdev/" target="_blank" rel="noopener noreferrer"
        style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/linkedin.svg" alt="linkedin" width={25} height={25} />
      </a>
      <a href="mailto:farisxdev@gmail.com" style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/email.svg" alt="email" width={25} height={25} />
      </a>
    </div>
  );
}

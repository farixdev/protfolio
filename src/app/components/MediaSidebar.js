"use client";
import Image from "next/image";

export function MediaSidebar() {
  return (
    <div className="hidden md:flex flex-col items-center fixed z-[60]"
      style={{ left: 36, top: 0, gap: 12 }}>
      <div style={{ width: 1, height: "28vh", backgroundColor: "#abb2bf", marginBottom: 4 }} />
      <a href="#" style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/discord.svg" alt="discord" width={25} height={25} />
      </a>
      <a href="https://github.com/farixdev" target="_blank" rel="noreferrer"
        style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/github.svg" alt="github" width={25} height={25} />
      </a>
      <a href="mailto:onlyfarix@gmail.com" style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">
        <Image src="/icons/email.svg" alt="email" width={25} height={25} />
      </a>
    </div>
  );
}

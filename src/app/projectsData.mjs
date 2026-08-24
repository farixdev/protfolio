// ── Single source of truth for every project shown on the site ────────────────
// Consumed by the projects page, the homepage featured strip, and the cover
// generator (scripts/gen-covers.mjs). Each project's `cover` points at a
// minimal SVG generated from one template, so every card looks like one system.

export const CATEGORIES = [
  {
    key: "ai",
    label: "ai-agents",
    title: "AI & Voice Agents",
    blurb: "Real-time voice, vision, and language systems that do actual work.",
    glyph: "waveform",
    projects: [
      {
        slug: "fiona",
        name: "Fiona",
        techs: ["Python", "OpenAI Realtime", "Twilio", "WebSockets"],
        desc: "A desktop AI voice-calling studio that answers and places real phone calls, bridging Twilio telephony to OpenAI's Realtime speech-to-speech API — with per-call transcription, lead extraction, and exact cost tracking.",
        links: [],
        featured: true,
      },
      {
        slug: "talora",
        name: "Talora AI",
        techs: ["Python", "Vapi", "Selenium", "SQLite"],
        desc: "An AI voice sales-agent platform: scrape leads from Google Maps, dial them one at a time or in bulk with a live AI agent, then track every deal through a pitch pipeline and follow-up queue.",
        links: [],
      },
      {
        slug: "screened",
        name: "Screened AI",
        techs: ["Electron", "React", "TypeScript", "Deepgram"],
        desc: "An always-on-top AI meeting copilot that transcribes live and surfaces answers on screen the moment a question is asked — while staying hidden from screen-share and screen recording.",
        links: [],
        featured: true,
      },
      {
        slug: "classwatch",
        name: "ClassWatch",
        techs: ["Python", "Django", "YOLOv8", "OpenCV"],
        desc: "AI room monitoring for campuses and offices: connects to CCTV / RTSP or webcams, counts occupancy with YOLO, and detects when a session actually starts, ends, or goes unattended against the schedule.",
        links: [],
      },
    ],
  },
  {
    key: "web",
    label: "web-apps",
    title: "Web & Full-Stack",
    blurb: "End-to-end products — auth, data, payments, and polished UI.",
    glyph: "browser",
    projects: [
      {
        slug: "clora",
        name: "Clora AI Portal",
        techs: ["Next.js", "NestJS", "PostgreSQL", "Tailwind"],
        desc: "A multi-company HR and payroll portal with role- and department-scoped access, attendance, leave, payslips, and optional biometric fingerprint + gate-terminal integrations.",
        links: [],
        featured: true,
      },
      {
        slug: "hubchat",
        name: "Hub Chat",
        techs: ["Next.js", "WebSockets", "Postgres", "Android"],
        desc: "AI + human live chat for all your WordPress sites, managed from one dashboard, with a companion phone app that gets push notifications for every new conversation.",
        links: [],
        featured: true,
      },
      {
        slug: "tins",
        name: "Things I Never Said",
        techs: ["Next.js", "NestJS", "MongoDB", "Tailwind"],
        desc: "An anonymous confession platform where people share the thoughts and words they never had the courage to say — no account, no identity, no judgment.",
        links: [
          { label: "Figma", href: "https://www.figma.com/design/KaO7WhtydVZvxO04tAMTHo/Things-I-never-said?node-id=0-1&t=bxciuK60A9leEAyG-1" },
          { label: "Github", href: "https://github.com/farixdev/ThingsINeverSaid" },
        ],
      },
      {
        slug: "hush",
        name: "Hush",
        techs: ["Flutter", "Firebase", "Next.js"],
        desc: "An anonymous chat app that lets people connect and talk without revealing who they are, paired with an animated marketing site and a release CMS for shipping new builds.",
        links: [{ label: "Website", href: "https://hush-seven-livid.vercel.app/" }],
      },
      {
        slug: "fstore",
        name: "F-Store",
        techs: ["Flutter", "Dart", "Firebase"],
        desc: "A modern Flutter e-commerce app with a full shopping experience and a powerful admin panel for catalog, orders, and inventory.",
        links: [{ label: "Github", href: "https://github.com/farixdev/F-Store-Flutter" }],
      },
    ],
  },
  {
    key: "automation",
    label: "automation",
    title: "Automation & Scraping",
    blurb: "Desktop tools that turn hours of manual work into one click.",
    glyph: "bot",
    projects: [
      {
        slug: "mapharvest",
        name: "MapHarvest",
        techs: ["Python", "PyQt5", "Selenium", "SMTP"],
        desc: "A desktop app that scrapes Google Maps business listings into clean CSV — then, on request, turns that list into a paced, personalised cold-email campaign sent from your own Gmail.",
        links: [{ label: "Github", href: "https://github.com/farixdev/MapHarvest" }],
        featured: true,
      },
      {
        slug: "drift",
        name: "Drift",
        techs: ["Python", "PyQt5", "BM25", "Embeddings"],
        desc: "A local-first job-discovery app that ranks listings against your résumé with an explainable score, dedupes the same role across boards, and helps you tailor and apply.",
        links: [{ label: "Github", href: "https://github.com/farixdev/Drift.jobs" }],
      },
      {
        slug: "instamap",
        name: "InstaMap Scraper",
        techs: ["Python", "Selenium", "PyQt5"],
        desc: "An automation tool that discovers local businesses through Google Maps and extracts website URLs and Instagram handles.",
        links: [{ label: "Github", href: "https://github.com/farixdev/InstagramScrapper" }],
      },
      {
        slug: "sitemirror",
        name: "SiteMirror",
        techs: ["Python", "PyQt5", "BeautifulSoup"],
        desc: "A desktop application that creates local, fully browsable copies of entire websites for offline use.",
        links: [{ label: "Github", href: "https://github.com/farixdev/SiteMirror" }],
      },
      {
        slug: "lms",
        name: "Superior LMS Suite",
        techs: ["Python", "Selenium", "WebView2"],
        desc: "A desktop app that automates repetitive university work — scraping LMS course material, tidying submission folders, and configuring ERP assessments from a single window.",
        links: [{ label: "Github", href: "https://github.com/farixdev/scrapper" }],
      },
    ],
  },
  {
    key: "vision",
    label: "vision",
    title: "Vision & Interaction",
    blurb: "Computer vision that reads your hands and paints on the screen.",
    glyph: "eye",
    projects: [
      {
        slug: "airsketch",
        name: "Air Sketch",
        techs: ["Python", "MediaPipe", "OpenCV", "Win32"],
        desc: "Draw on screen with hand gestures — a webcam + MediaPipe tracker turns finger poses into ink rendered over any app, auto-refining wobbly shapes and smoothing handwriting without reshaping it.",
        links: [],
        featured: true,
      },
      {
        slug: "airpad",
        name: "AirPad",
        techs: ["Python", "MediaPipe", "OpenCV", "Win32"],
        desc: "Control your whole PC with one hand in front of a webcam — cursor, all three clicks, drag, two-finger scroll and zoom, swipes, volume, and region screenshots, injected as real Windows input.",
        links: [],
      },
    ],
  },
  {
    key: "security",
    label: "security",
    title: "Security & Systems",
    blurb: "Low-level builds — firewalls, mining engines, reasoning games.",
    glyph: "shield",
    projects: [
      {
        slug: "aegis",
        name: "Aegis WAF",
        techs: ["Python", "Flask", "Socket.IO", "SQLite"],
        desc: "A Python Web Application Firewall with real-time attack detection, a live SOC dashboard, a red-team attack simulator, and a deliberately-vulnerable lab for research.",
        links: [],
      },
      {
        slug: "bitmine",
        name: "Bitmine",
        techs: ["Python", "SHA-256d", "Tkinter"],
        desc: "A SHA-256d Bitcoin mining engine built to make the process visible — runs on a private regtest chain so you can watch blocks get found, with no profit theater.",
        links: [],
      },
      {
        slug: "kasoti",
        name: "Kasoti",
        techs: ["JavaScript", "Bayesian", "HTML5"],
        desc: "A 20-questions mind-reading game with a real Bayesian reasoning engine — it tracks probability across 348 things and shows a live view of its own thinking as it narrows in.",
        links: [],
      },
    ],
  },
];

// Flat list + a cover path derived from the slug.
export const PROJECTS = CATEGORIES.flatMap((c) =>
  c.projects.map((p) => ({ ...p, category: c.title, cover: `/covers/${p.slug}.svg` }))
);

export const FEATURED = PROJECTS.filter((p) => p.featured);

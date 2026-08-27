// Generates one minimal UI-silhouette cover per project — a low-fi wireframe of
// the real app in the project's own colour scheme, so each card previews the
// product. Run: `node scripts/gen-covers.mjs`
import { mkdir, writeFile, readdir, unlink } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CATEGORIES } from "../src/app/projectsData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/covers");
const W = 800, H = 450;
const MONO = "ui-monospace,'Cascadia Code',Consolas,monospace";

// ── primitives ────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const r = (x, y, w, h, f, rad = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${f}"/>`;
const rs = (x, y, w, h, st, rad = 6, sw = 1.5) =>
  `<rect x="${(x + sw / 2).toFixed(2)}" y="${(y + sw / 2).toFixed(2)}" width="${(w - sw).toFixed(2)}" height="${(h - sw).toFixed(2)}" rx="${rad}" fill="none" stroke="${st}" stroke-width="${sw}"/>`;
const c = (cx, cy, rad, f) => `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${f}"/>`;
const cs = (cx, cy, rad, st, sw = 1.5) => `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${st}" stroke-width="${sw}"/>`;
const ln = (x1, y1, x2, y2, st, sw = 1.5) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${st}" stroke-width="${sw}" stroke-linecap="round"/>`;
const t = (x, y, s, f, size, { anchor, ls } = {}) =>
  `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" fill="${f}"${anchor ? ` text-anchor="${anchor}"` : ""}${ls ? ` letter-spacing="${ls}"` : ""}>${esc(s)}</text>`;

const DEFS = `<defs>
  <linearGradient id="kg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7c8cf8"/><stop offset="1" stop-color="#34d3ee"/></linearGradient>
  <linearGradient id="ig" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#f09433"/><stop offset="0.5" stop-color="#dc2743"/><stop offset="1" stop-color="#bc1888"/></linearGradient>
</defs>`;

// ── shared archetypes ─────────────────────────────────────────────────────────
function dashboard(P) {
  const A = P.accent, cta = P.cta || A;
  let s = r(0, 0, W, H, P.bg, 0);
  s += r(0, 0, 150, H, P.side, 0) + ln(150, 0, 150, H, P.line, 1);
  s += r(20, 22, 26, 26, A, 7) + r(54, 30, 62, 8, P.text, 4);
  s += r(14, 70, 122, 34, P.accentSoft, 9) + r(26, 84, 82, 7, A, 4);
  for (let i = 1; i < 6; i++) s += r(26, 84 + i * 34, 78, 7, P.line, 4);
  s += r(176, 32, 168, 14, P.text, 4) + r(176, 56, 104, 9, P.sub, 4);
  s += c(636, 45, 8, P.line) + c(664, 45, 8, P.line) + r(694, 30, 90, 30, cta, 8);
  const cxs = [176, 330, 484, 638], cw = 138, cy = 92, ch = 104;
  cxs.forEach((x, i) => {
    s += r(x, cy, cw, ch, P.card, 10) + rs(x, cy, cw, ch, P.cardBorder, 10, 1);
    s += r(x + 16, cy + 22, 58, 7, P.sub, 4) + r(x + 16, cy + 40, 52, 22, i === P.hi ? cta : P.text, 5) + r(x + 16, cy + 76, 74, 7, P.line, 4);
  });
  s += r(176, 212, 300, 140, P.card, 10) + rs(176, 212, 300, 140, P.cardBorder, 10, 1) + r(192, 234, 120, 9, P.sub, 4);
  [40, 64, 30, 54, 74, 46].forEach((h, i) => (s += r(196 + i * 44, 322 - h, 22, h, i % 2 ? A : P.line, 3)));
  s += r(500, 212, 300, 140, P.card, 10) + rs(500, 212, 300, 140, P.cardBorder, 10, 1) + r(516, 234, 120, 9, P.sub, 4);
  for (let i = 0; i < 3; i++) s += c(528, 264 + i * 30, 7, P.line) + r(546, 260 + i * 30, 150, 8, P.line, 4) + r(712, 260 + i * 30, 60, 8, i === 0 ? A : P.line, 4);
  s += r(176, 364, 624, 62, P.card, 10) + rs(176, 364, 624, 62, P.cardBorder, 10, 1) + r(196, 384, 90, 8, P.sub, 4) + r(196, 402, 220, 7, P.line, 4);
  return s;
}

function terminal(P, { title, lines }) {
  let s = r(0, 0, W, H, P.bg, 0);
  s += r(40, 40, 720, 372, P.term, 12) + rs(40, 40, 720, 372, P.line, 12, 1);
  s += c(66, 60, 6, "#ff5f57") + c(86, 60, 6, "#febc2e") + c(106, 60, 6, "#28c840");
  s += t(400, 65, title, P.sub, 13, { anchor: "middle" });
  s += ln(40, 80, 760, 80, P.line, 1);
  let y = 114;
  lines.forEach((L) => { s += t(66, y, L.t, L.c, 15.5); y += 30; });
  return s;
}

// ── per-project scenes ─────────────────────────────────────────────────────────
const scenes = {
  fiona: () => dashboard({ bg: "#0e1110", side: "#121614", card: "#151917", cardBorder: "#20261f", line: "#2a312d", sub: "#5c665f", text: "#e7ece9", accent: "#34d399", accentSoft: "#34d39922", cta: "#10b981", hi: 2 }),
  drift: () => dashboard({ bg: "#0b0e13", side: "#0e1219", card: "#121722", cardBorder: "#20293a", line: "#222b39", sub: "#5f6b7e", text: "#e8edf4", accent: "#3b82f6", accentSoft: "#3b82f622", cta: "#3b82f6", hi: 0 }),
  clora: () => dashboard({ bg: "#eef2ee", side: "#ffffff", card: "#ffffff", cardBorder: "#dbe5db", line: "#d7e0d7", sub: "#7c8b7f", text: "#173a24", accent: "#16a34a", accentSoft: "#16a34a1f", cta: "#16a34a", hi: 0 }),

  kasoti: (P = { bg: "#0a0e15", card: "#111726", line: "#232c40", sub: "#6f7b92", text: "#eef2f7" }) => {
    let s = r(0, 0, W, H, P.bg, 0);
    s += r(40, 34, 30, 30, "#20263a", 8) + r(80, 40, 70, 8, P.text, 4) + r(80, 54, 110, 6, P.sub, 4);
    s += rs(636, 34, 56, 26, P.line, 8, 1) + rs(704, 34, 64, 26, P.line, 8, 1);
    s += r(150, 104, 500, 26, P.text, 6) + r(210, 144, 180, 26, "url(#kg)", 6) + r(398, 144, 232, 26, P.text, 6) + r(250, 190, 300, 9, P.sub, 5);
    const cxs = [70, 300, 530], ic = ["#5b6b8c", "#f5c542", "#f5c542"];
    cxs.forEach((x, i) => { s += r(x, 232, 200, 116, P.card, 12) + rs(x, 232, 200, 116, P.line, 12, 1) + c(x + 34, 268, 13, ic[i]) + r(x + 18, 296, 92, 12, P.text, 4) + r(x + 18, 318, 150, 7, P.sub, 4) + r(x + 150, 248, 34, 7, P.sub, 4); });
    [250, 340, 430, 520].forEach((x, i) => { s += r(x, 380, 80, 46, P.card, 8) + rs(x, 380, 80, 46, P.line, 8, 1) + r(x + 22, 393, 36, 15, i === 1 ? "url(#kg)" : P.text, 4) + r(x + 16, 416, 48, 6, P.sub, 3); });
    return s;
  },

  hush: () => {
    let s = r(0, 0, W, H, "#000", 0);
    s += rs(250, 26, 300, 44, "#1c1c1c", 22, 1.5) + c(286, 48, 10, "#fff") + r(306, 44, 42, 8, "#fff", 4) + r(360, 45, 40, 7, "#8a8a8a", 4) + r(410, 45, 58, 7, "#8a8a8a", 4) + r(480, 45, 40, 7, "#8a8a8a", 4) + r(700, 30, 80, 30, "#fff", 16);
    s += r(60, 150, 220, 34, "#fff", 6) + r(60, 196, 300, 34, "#6a6a6a", 6) + r(60, 252, 360, 9, "#9a9a9a", 4) + r(60, 270, 300, 9, "#9a9a9a", 4);
    s += r(60, 322, 156, 42, "#fff", 21) + r(240, 336, 96, 9, "#8a8a8a", 4) + c(470, 118, 4, "#ef4444");
    s += r(560, 88, 180, 300, "#0c0c0c", 26) + rs(560, 88, 180, 300, "#242424", 26, 1.5) + r(590, 118, 34, 7, "#8a8a8a", 4) + c(716, 122, 8, "#161616") + r(590, 150, 120, 7, "#5a5a5a", 3) + rs(586, 168, 128, 62, "#242424", 10, 1.5) + r(606, 190, 92, 18, "#fff", 4) + r(586, 250, 128, 40, "#141414", 8) + r(586, 306, 128, 40, "#fff", 20);
    return s;
  },

  tins: () => {
    const cream = "#f3efe6", note = "#e9e3d5", ink = "#2a251f", rose = "#b45f6d", sub = "#8a8175";
    let s = r(0, 0, W, H, cream, 0);
    [[40, 118, 150, 90], [610, 88, 160, 92], [90, 300, 150, 90], [600, 300, 160, 90]].forEach(([x, y, w, h]) => (s += r(x, y, w, h, note, 8)));
    s += r(60, 40, 20, 20, rose, 4) + r(90, 46, 120, 8, sub, 4) + r(560, 46, 40, 7, sub, 4) + r(620, 46, 40, 7, sub, 4) + r(680, 46, 44, 7, sub, 4);
    s += cs(400, 118, 9, rose, 1.5) + ln(400, 128, 400, 150, rose, 1.5) + r(320, 168, 160, 7, "#a89a86", 4);
    s += r(250, 194, 300, 30, ink, 6) + r(280, 236, 240, 30, rose, 6) + r(250, 288, 300, 8, "#6f665a", 4) + r(280, 306, 240, 8, "#6f665a", 4);
    s += r(300, 342, 150, 42, "#141414", 21) + rs(470, 342, 150, 42, "#c9beac", 21, 1.5);
    return s;
  },

  hubchat: () => {
    const P = { bg: "#0b0f14", side: "#0e131a", card: "#121821", line: "#212a35", sub: "#68758a", text: "#e9eef4", accent: "#3b82f6", accentSoft: "#3b82f622" };
    let s = r(0, 0, W, H, P.bg, 0);
    s += r(0, 0, 120, H, P.side, 0) + ln(120, 0, 120, H, P.line, 1) + r(20, 24, 24, 24, P.accent, 6) + r(50, 30, 44, 8, P.text, 4);
    s += r(14, 72, 92, 30, P.accentSoft, 8) + r(26, 84, 58, 7, P.accent, 4);
    for (let i = 1; i < 5; i++) s += r(26, 84 + i * 32, 62, 7, P.line, 4);
    s += r(120, 0, 230, H, P.side, 0) + ln(350, 0, 350, H, P.line, 1) + r(140, 28, 80, 10, P.text, 4);
    s += r(140, 92, 30, 26, "#20262f", 6) + r(230, 96, 80, 22, "#20262f", 6);
    s += r(140, 130, 30, 26, "#20262f", 6);
    s += r(140, 172, 210, 74, P.accentSoft, 8) + c(162, 200, 12, "#2a3340") + r(184, 186, 90, 8, P.text, 4) + r(300, 184, 34, 12, P.accent, 4) + r(184, 206, 120, 7, P.sub, 4) + r(184, 224, 90, 7, P.line, 4);
    for (let i = 0; i < 3; i++) s += r(140, 262 + i * 60, 210, 50, P.card, 8) + c(162, 287 + i * 60, 12, "#20262f") + r(184, 276 + i * 60, 80, 8, P.text, 4) + r(184, 296 + i * 60, 120, 7, P.sub, 4);
    s += r(560, 214, 160, 10, P.sub, 4) + r(580, 234, 120, 8, P.line, 4) + cs(640, 150, 26, P.line, 2) + r(628, 142, 24, 16, P.line, 3);
    return s;
  },

  mapharvest: () => {
    const P = { bg: "#0f1512", card: "#131b17", line: "#26332c", sub: "#66766c", text: "#e6efe9", accent: "#22c55e" }, A = P.accent;
    let s = r(0, 0, W, H, P.bg, 0);
    s += r(0, 0, W, 34, "#0b120f", 0) + r(16, 12, 90, 9, P.text, 4) + r(560, 8, 72, 20, P.card, 5) + r(700, 8, 80, 20, P.card, 5);
    s += r(24, 50, 90, 12, P.text, 4) + r(150, 48, 58, 22, A, 5) + r(216, 48, 58, 22, P.card, 5) + r(282, 48, 58, 22, P.card, 5);
    s += r(24, 92, 60, 7, P.sub, 4) + r(24, 106, 300, 30, P.card, 6) + rs(24, 106, 300, 30, P.line, 6, 1) + r(24, 148, 60, 7, P.sub, 4) + r(24, 162, 300, 30, P.card, 6) + rs(24, 162, 300, 30, P.line, 6, 1);
    s += r(24, 210, 90, 7, P.sub, 4) + r(24, 226, 300, 6, P.line, 3) + c(40, 229, 8, A);
    const cols = [430, 620], rows = [96, 128, 160, 192, 224, 256];
    let n = 0;
    for (const y of rows) for (const x of cols) {
      const on = [0, 1, 3, 4, 5, 6, 8, 9, 11].includes(n);
      s += rs(x, y, 16, 16, on ? A : P.line, 4, 1.6);
      if (on) s += r(x + 3.5, y + 3.5, 9, 9, A, 2);
      s += r(x + 24, y + 4, 92, 8, P.sub, 4);
      n++;
    }
    s += r(650, 396, 130, 34, A, 8);
    return s;
  },

  sitemirror: () => {
    const P = { bg: "#0d0b14", side: "#130f1e", card: "#16112a", line: "#2a2140", sub: "#7a7192", text: "#ece8f6", accent: "#7c3aed", accentSoft: "#7c3aed22", cta: "#10b981" }, A = P.accent;
    let s = r(0, 0, W, H, P.bg, 0);
    s += r(0, 0, 150, H, P.side, 0) + ln(150, 0, 150, H, P.line, 1) + r(20, 24, 26, 26, A, 7) + r(54, 30, 70, 8, P.text, 4) + r(54, 44, 50, 6, P.sub, 3);
    s += r(14, 80, 122, 32, P.accentSoft, 8) + r(26, 92, 70, 7, A, 4);
    for (let i = 1; i < 6; i++) s += r(26, 92 + i * 32, 70, 7, P.line, 4);
    s += r(170, 30, 610, 118, P.card, 10) + rs(170, 30, 610, 118, P.line, 10, 1) + r(186, 46, 120, 8, P.sub, 4) + r(186, 62, 560, 28, P.bg, 6) + rs(186, 62, 560, 28, P.line, 6, 1);
    s += cs(194, 112, 7, A) + c(194, 112, 3, A) + r(210, 108, 80, 7, P.sub, 4) + cs(320, 112, 7, P.line) + r(336, 108, 90, 7, P.sub, 4);
    s += rs(470, 105, 14, 14, A, 3, 1.5) + r(473, 108, 8, 8, A, 1) + r(492, 108, 70, 7, P.sub, 4);
    s += r(650, 98, 120, 30, P.cta, 7);
    s += r(170, 162, 420, 222, P.card, 10) + rs(170, 162, 420, 222, P.line, 10, 1) + r(186, 180, 100, 8, P.sub, 4);
    for (let i = 0; i < 6; i++) s += r(186, 202 + i * 26, 388, 7, i % 2 ? P.line : "#241b38", 3);
    s += r(610, 162, 170, 222, P.card, 10) + rs(610, 162, 170, 222, P.line, 10, 1) + cs(695, 248, 42, P.line, 8) + `<path d="M695 206 A42 42 0 0 1 737 248" fill="none" stroke="${A}" stroke-width="8" stroke-linecap="round"/>`;
    for (let i = 0; i < 4; i++) s += r(626, 316 + i * 15, 78, 6, P.sub, 3) + r(730, 316 + i * 15, 34, 6, P.line, 3);
    return s;
  },

  lms: () => {
    let s = r(0, 0, W, H, "#2b2431", 0);
    const X = 150, Y = 70, w = 500, h = 310;
    s += r(X, Y, w, h, "#e7e8ea", 16);
    s += `<path d="M${X + 16} ${Y} H${X + 250} V${Y + h} H${X + 16} A16 16 0 0 1 ${X} ${Y + h - 16} V${Y + 16} A16 16 0 0 1 ${X + 16} ${Y} Z" fill="#5b1a3a"/>`;
    s += r(X + 34, Y + 40, 24, 24, "#7a2b50", 6) + r(X + 66, Y + 46, 90, 10, "#f0e4ec", 4);
    s += r(X + 34, Y + 148, 150, 20, "#e9d7e2", 5) + r(X + 34, Y + 176, 120, 20, "#e9d7e2", 5) + r(X + 34, Y + 214, 180, 7, "#c9a7bb", 4) + r(X + 34, Y + 228, 150, 7, "#c9a7bb", 4);
    const fx = X + 282;
    s += r(fx, Y + 50, 140, 16, "#2a2430", 4) + r(fx, Y + 74, 176, 8, "#8a8390", 4);
    s += r(fx, Y + 108, 186, 30, "#fff", 6) + rs(fx, Y + 108, 186, 30, "#d3d6db", 6, 1) + c(fx + 16, Y + 123, 5, "#8a8390");
    s += r(fx, Y + 154, 186, 30, "#fff", 6) + rs(fx, Y + 154, 186, 30, "#d3d6db", 6, 1) + c(fx + 16, Y + 169, 5, "#8a8390");
    s += r(fx, Y + 198, 186, 34, "#6b1f43", 8);
    return s;
  },

  classwatch: () => {
    const wht = "#f0efe9", sub = "#6b6b66", line = "#232320";
    let s = r(0, 0, W, H, "#0a0a0a", 0);
    s += r(40, 34, 180, 12, wht, 3) + r(560, 36, 40, 7, sub, 3) + r(610, 36, 50, 7, sub, 3) + r(668, 36, 44, 7, sub, 3) + r(720, 36, 40, 7, sub, 3);
    [40, 150, 260, 380, 500].forEach((x) => (s += r(x, 80, 26, 26, wht, 4) + r(x, 116, 60, 6, "#5b5b56", 3)));
    [[40, 158], [300, 158], [560, 158], [40, 300], [300, 300], [560, 300]].forEach(([x, y]) => (s += rs(x, y, 220, 126, line, 10, 1.5) + r(x + 18, y + 22, 90, 10, "#e6e5df", 4) + r(x + 18, y + 40, 130, 6, sub, 3) + r(x + 18, y + 68, 20, 18, "#3a3a36", 3) + r(x + 18, y + 98, 72, 16, "#171715", 4)));
    return s;
  },

  airsketch: () => {
    let s = r(0, 0, W, H, "#f1f2f4", 0);
    s += r(90, 44, 620, 108, "#e6e8eb", 14) + rs(90, 44, 620, 108, "#d1d5db", 14, 1);
    ["#ef4444", "#f97316", "#f59e0b", "#22c55e", "#38bdf8", "#3b82f6", "#a855f7", "#ec4899", "#ffffff", "#111827"].forEach((col, i) => { s += r(110 + i * 40, 62, 28, 28, col, 7); if (col === "#ffffff") s += rs(110 + i * 40, 62, 28, 28, "#c9ccd1", 7, 1); });
    [0, 1, 2, 3, 4].forEach((i) => (s += r(516 + i * 36, 68, 26, 12, i === 0 ? "#3b82f6" : "#4b5563", 3)));
    for (let i = 0; i < 6; i++) s += r(300 + i * 70, 112, 54, 26, "#dfe2e6", 6);
    s += r(40, 392, 230, 42, "#2a2f36", 8) + r(56, 404, 150, 8, "#c9ccd1", 3) + r(56, 420, 120, 6, "#8a94a0", 3);
    return s;
  },

  // ── invented ──
  screened: () => {
    const wht = "#f0f0f0", sub = "#7a7a7a", pnl = "#171717";
    let s = r(0, 0, W, H, "#0a0a0a", 0);
    s += rs(56, 48, 688, 356, "#1e1e1e", 14, 1.5) + r(86, 78, 120, 10, "#242424", 4) + r(86, 108, 300, 8, "#1a1a1a", 4) + r(86, 130, 240, 8, "#1a1a1a", 4) + r(86, 152, 280, 8, "#1a1a1a", 4);
    s += r(430, 150, 300, 182, pnl, 16) + rs(430, 150, 300, 182, "#3a3a3a", 16, 1.5);
    [14, 26, 42, 24, 36, 18, 30, 22].forEach((h, i) => (s += r(456 + i * 12, 236 - h / 2, 5, h, wht, 2)));
    s += r(560, 220, 150, 8, sub, 4) + r(560, 236, 120, 8, sub, 4);
    s += r(452, 268, 256, 48, "#0e0e0e", 8) + r(468, 282, 180, 8, wht, 4) + r(468, 298, 140, 7, sub, 4);
    s += cs(474, 180, 11, wht, 1.6) + c(474, 180, 4, wht) + ln(465, 189, 483, 171, wht, 2.2);
    return s;
  },

  fstore: () => {
    const bg = "#f4f8fb", card = "#ffffff", line = "#dbe6ef", sub = "#8496a6", text = "#1f2d3a", A = "#0ea5e9";
    let s = r(0, 0, W, H, bg, 0);
    s += r(90, 46, 258, 358, card, 28) + rs(90, 46, 258, 358, line, 28, 1.5);
    s += r(120, 76, 60, 7, sub, 3) + r(300, 76, 22, 7, sub, 3) + r(120, 98, 120, 12, text, 4) + c(322, 102, 10, A);
    s += r(114, 124, 210, 108, "#e6f4fc", 12) + c(219, 178, 26, A) + r(190, 210, 68, 8, "#cbe8f8", 4);
    [[114, 248], [222, 248], [114, 328], [222, 328]].forEach(([x, y]) => (s += r(x, y, 100, 66, "#f1f6fa", 8) + rs(x, y, 100, 66, line, 8, 1) + r(x + 12, y + 10, 56, 28, "#e1eef7", 5) + r(x + 12, y + 46, 40, 7, text, 3) + r(x + 66, y + 45, 24, 11, A, 4)));
    s += r(400, 64, 360, 138, card, 12) + rs(400, 64, 360, 138, line, 12, 1) + r(420, 86, 120, 10, text, 4) + r(420, 106, 300, 7, sub, 3) + r(420, 122, 250, 7, sub, 3) + r(420, 158, 120, 30, A, 8);
    [[400, 222], [590, 222]].forEach(([x], i) => (s += r(x, 222, 170, 158, card, 12) + rs(x, 222, 170, 158, line, 12, 1) + r(x + 20, 244, 80, 8, sub, 3) + r(x + 20, 262, 44, 24, i ? text : A, 5) + r(x + 20, 300, 120, 7, "#e3ecf3", 3) + r(x + 20, 318, 90, 7, "#e3ecf3", 3) + r(x + 20, 344, 130, 16, "#eef4f9", 4)));
    return s;
  },

  instamap: () => {
    const bg = "#0d1017", grid = "#161c26", road = "#232c3c", sub = "#6f7c90", text = "#e6ecf4", card = "#141a24", line = "#2a3446";
    let s = r(0, 0, W, H, bg, 0);
    for (let x = 40; x <= 760; x += 60) s += ln(x, 30, x, 420, grid, 1);
    for (let y = 60; y <= 420; y += 60) s += ln(40, y, 760, y, grid, 1);
    s += ln(40, 210, 760, 250, road, 7) + ln(320, 30, 360, 420, road, 7) + ln(40, 340, 760, 300, road, 4);
    [[200, 150], [520, 300], [180, 320], [640, 200]].forEach(([x, y]) => (s += `<path d="M${x} ${y} c-16 0 -27 12 -27 27 c0 19 27 41 27 41 c0 0 27 -22 27 -41 c0 -15 -11 -27 -27 -27 Z" fill="url(#ig)"/>` + c(x, y + 25, 9, bg)));
    s += r(420, 84, 168, 128, card, 12) + rs(420, 84, 168, 128, line, 12, 1) + rs(438, 100, 28, 28, "url(#ig)", 8, 2.2) + r(474, 106, 78, 8, text, 4) + r(474, 122, 54, 6, sub, 3) + r(438, 140, 132, 56, bg, 6) + rs(438, 140, 132, 56, line, 6, 1);
    return s;
  },

  airpad: () => {
    const wht = "#f0f0f0", sub = "#7a7a7a";
    let s = r(0, 0, W, H, "#0a0a0a", 0);
    s += rs(80, 58, 640, 334, "#1e1e1e", 16, 1.5);
    s += cs(300, 232, 40, "#ffffff", 2) + cs(300, 232, 72, "#ffffff88", 2) + cs(300, 232, 104, "#ffffff3a", 2) + c(300, 232, 5, wht);
    s += `<g stroke="${wht}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M470 302 v-70 a10 10 0 0 1 20 0 v38 M490 272 v-84 a10 10 0 0 1 20 0 v92 M510 282 v-74 a10 10 0 0 1 20 0 v74 M530 292 v-52 a10 10 0 0 1 20 0 v52"/><path d="M470 302 q-26 -6 -30 -34 M448 300 q2 62 62 62 q60 0 60 -60 v-30"/></g>`;
    s += c(480, 150, 6, wht) + cs(480, 150, 13, "#ffffff", 2);
    s += r(110, 88, 120, 10, wht, 4) + r(110, 108, 180, 7, sub, 3) + r(110, 352, 90, 7, wht, 4) + r(212, 352, 80, 7, sub, 4) + r(304, 352, 70, 7, sub, 4);
    return s;
  },

  aegis: () => terminal({ bg: "#0a0b0a", term: "#0c0e0c", line: "#20241f", sub: "#6b7280" }, {
    title: "aegis-waf — :9090",
    lines: [
      { t: "$ aegis-waf --serve", c: "#8b9488" },
      { t: "[OK]    GET /            200  clean", c: "#4ade80" },
      { t: "[BLOCK] SQLi   /login?id=1'--", c: "#f87171" },
      { t: "[BLOCK] XSS    <script>alert(1)", c: "#f87171" },
      { t: "[OK]    GET /shop        200  clean", c: "#4ade80" },
      { t: "[BAN]   1.2.3.4   rate-limit exceeded", c: "#fbbf24" },
      { t: "watching █", c: "#4ade80" },
    ],
  }),

  bitmine: () => terminal({ bg: "#0a0a0b", term: "#0d0d0e", line: "#232326", sub: "#6b7280" }, {
    title: "bitmine — regtest",
    lines: [
      { t: "$ bitmine --regtest", c: "#8b8f98" },
      { t: "hashrate   81.4 MH/s", c: "#f7931a" },
      { t: "nonce 0x1a3f9c  target 0000ffff", c: "#8b8f98" },
      { t: "0000009c4e… ✓ block found", c: "#4ade80" },
      { t: "height 128   reward 50 (test)", c: "#8b8f98" },
      { t: "mining ▓▓▓▓▓░░░ 62%", c: "#f7931a" },
      { t: "█", c: "#f7931a" },
    ],
  }),
};

// ── build ─────────────────────────────────────────────────────────────────────
await mkdir(OUT, { recursive: true });
for (const f of await readdir(OUT)) if (f.endsWith(".svg")) await unlink(resolve(OUT, f));

const slugs = CATEGORIES.flatMap((cat) => cat.projects.map((p) => p.slug));
const written = [];
for (const slug of slugs) {
  const scene = scenes[slug];
  if (!scene) throw new Error(`No cover scene for "${slug}"`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${slug} interface preview">${DEFS}${scene()}</svg>`;
  await writeFile(resolve(OUT, `${slug}.svg`), svg, "utf8");
  written.push(slug);
}
console.log(`Generated ${written.length} covers into public/covers:\n  ${written.join(", ")}`);

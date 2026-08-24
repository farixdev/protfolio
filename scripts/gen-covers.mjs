// Generates one minimal SVG cover per project from a single template, so every
// card on the site reads as one visual system. Run: `node scripts/gen-covers.mjs`
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CATEGORIES } from "../src/app/projectsData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/covers");

// Brand tokens — mirror globals.css.
const BG = "#22262c";
const PANEL = "#262b32";
const PURPLE = "#c470db";
const GRAY = "#abb2bf";
const MUTE = "#6b727d";
const WHITE = "#f4f5f6";
const HAIR = "#363c44";
const FONT = `'FiraCode-SemiBold', ui-monospace, 'Cascadia Code', Consolas, monospace`;
const FONT_R = `'FiraCode-Regular', ui-monospace, 'Cascadia Code', Consolas, monospace`;

const W = 800, H = 450, P = 46;

// Minimal line glyphs, drawn in a 0..64 box, purple stroke, no fill.
const GLYPHS = {
  waveform: `<g stroke="${PURPLE}" stroke-width="3.2" stroke-linecap="round">
    <line x1="6" y1="26" x2="6" y2="38"/><line x1="17" y1="16" x2="17" y2="48"/>
    <line x1="28" y1="6" x2="28" y2="58"/><line x1="39" y1="20" x2="39" y2="44"/>
    <line x1="50" y1="12" x2="50" y2="52"/><line x1="61" y1="24" x2="61" y2="40"/></g>`,
  browser: `<g fill="none" stroke="${PURPLE}" stroke-width="2.6" stroke-linejoin="round">
    <rect x="6" y="10" width="52" height="44" rx="5"/><line x1="6" y1="22" x2="58" y2="22"/>
    <circle cx="13" cy="16" r="1.6" fill="${PURPLE}" stroke="none"/>
    <circle cx="20" cy="16" r="1.6" fill="${PURPLE}" stroke="none"/>
    <circle cx="27" cy="16" r="1.6" fill="${PURPLE}" stroke="none"/></g>`,
  bot: `<g fill="none" stroke="${PURPLE}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <rect x="12" y="20" width="40" height="32" rx="7"/><line x1="32" y1="10" x2="32" y2="20"/>
    <circle cx="32" cy="8" r="2.4" fill="${PURPLE}" stroke="none"/>
    <circle cx="24" cy="34" r="3.2" fill="${PURPLE}" stroke="none"/>
    <circle cx="40" cy="34" r="3.2" fill="${PURPLE}" stroke="none"/>
    <line x1="25" y1="44" x2="39" y2="44"/><line x1="12" y1="32" x2="6" y2="32"/><line x1="52" y1="32" x2="58" y2="32"/></g>`,
  eye: `<g fill="none" stroke="${PURPLE}" stroke-width="2.6" stroke-linejoin="round">
    <path d="M5 32 Q32 12 59 32 Q32 52 5 32 Z"/><circle cx="32" cy="32" r="9"/>
    <circle cx="32" cy="32" r="3.4" fill="${PURPLE}" stroke="none"/></g>`,
  shield: `<g fill="none" stroke="${PURPLE}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M32 6 L55 15 V31 Q55 48 32 59 Q9 48 9 31 V15 Z"/><path d="M23 32 l6 6 l12 -14"/></g>`,
  terminal: `<g fill="none" stroke="${PURPLE}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">
    <rect x="6" y="12" width="52" height="40" rx="5"/><path d="M16 27 l9 7 l-9 7"/><line x1="31" y1="41" x2="45" y2="41"/></g>`,
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Greedy word-wrap to at most 2 lines, then size the title to fit the width.
function layoutTitle(name) {
  const words = name.split(" ");
  let lines = [name];
  if (name.length > 13 && words.length > 1) {
    let a = "", b = "";
    for (const w of words) {
      if ((a + " " + w).trim().length <= Math.ceil(name.length / 2) && !b) a = (a + " " + w).trim();
      else b = (b + " " + w).trim();
    }
    lines = b ? [a, b] : [a];
  }
  const maxChars = Math.max(...lines.map((l) => l.length));
  const size = Math.max(30, Math.min(48, Math.floor((W - 2 * P) / (maxChars * 0.62))));
  return { lines, size };
}

function dotGrid(x, y, n = 5, gap = 15, r = 2.4) {
  let out = "";
  for (let c = 0; c < n; c++)
    for (let row = 0; row < n; row++)
      out += `<circle cx="${x + c * gap}" cy="${y + row * gap}" r="${r}" fill="${GRAY}" opacity="0.18"/>`;
  return out;
}

function cover({ label, glyph, name, techs, index }) {
  const { lines, size } = layoutTitle(name);
  const titleTop = 250 - (lines.length - 1) * (size * 0.58);
  const titleSvg = lines
    .map((l, i) => `<text x="${P}" y="${titleTop + i * (size * 1.15)}" font-family="${FONT}" font-size="${size}" font-weight="600" fill="${WHITE}">${esc(l)}</text>`)
    .join("");

  const techJoined = techs.join("   ·   ");
  const techSize = techJoined.length > 44 ? 14 : 16;
  const techParts = techs
    .map((t) => `<tspan fill="${GRAY}">${esc(t)}</tspan>`)
    .join(`<tspan fill="${PURPLE}">   ·   </tspan>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(name)}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${HAIR}"/>
  ${dotGrid(W - 46 - 4 * 15, H - 46 - 4 * 15)}
  <text x="${P}" y="${P + 6}" font-family="${FONT_R}" font-size="15" letter-spacing="1.5" fill="${PURPLE}">#${esc(label)}</text>
  <text x="${W - P}" y="${P + 6}" text-anchor="end" font-family="${FONT_R}" font-size="15" fill="${MUTE}">${String(index).padStart(2, "0")}</text>
  <line x1="${P}" y1="82" x2="${W - P}" y2="82" stroke="${HAIR}"/>
  <g transform="translate(${P}, 108)">${GLYPHS[glyph]}</g>
  ${titleSvg}
  <rect x="${P}" y="${titleTop + (lines.length - 1) * (size * 1.15) + 16}" width="52" height="3" fill="${PURPLE}"/>
  <text x="${P}" y="${H - P}" font-family="${FONT_R}" font-size="${techSize}">${techParts}</text>
</svg>`;
}

let index = 0;
await mkdir(OUT, { recursive: true });
const written = [];
for (const cat of CATEGORIES) {
  for (const p of cat.projects) {
    index += 1;
    const svg = cover({ label: cat.label, glyph: cat.glyph, name: p.name, techs: p.techs, index });
    await writeFile(resolve(OUT, `${p.slug}.svg`), svg, "utf8");
    written.push(`${String(index).padStart(2, "0")}  ${p.slug}.svg  (${cat.label})`);
  }
}
console.log(`Generated ${written.length} covers into public/covers:\n` + written.join("\n"));

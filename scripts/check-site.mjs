import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = (name) => join(root, name);
const read = (name) => readFileSync(file(name), "utf8");
const requiredFiles = [
  "index.html",
  "styles.css",
  "main.js",
  "assets/favicon.svg",
  "assets/social-preview.png",
  "robots.txt",
  ".nojekyll",
];

for (const path of requiredFiles) {
  assert.ok(existsSync(file(path)), `Missing required file: ${path}`);
}

const html = read("index.html");
assert.match(html, /<html\s+lang=["']en["']/i, "Set the document language");
assert.match(html, /<meta\s+name=["']viewport["']/i, "Mobile viewport metadata is required");
assert.match(html, /<title>[^<]+<\/title>/i, "Page title is required");
assert.match(html, /<main\b[^>]*\bid=["']main["']/i, "A main content landmark is required");

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "HTML element IDs must be unique");

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match?.[2] ?? null;
};

const anchors = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]);
const destinations = [];
for (const anchor of anchors) {
  const href = attr(anchor, "href");
  assert.ok(href, "Each link must have an href attribute");
  destinations.push(href);
  if (href.startsWith("#")) {
    assert.ok(ids.includes(href.slice(1)), `Broken internal anchor: ${href}`);
  }
  if (attr(anchor, "target") === "_blank") {
    const rel = (attr(anchor, "rel") ?? "").split(/\s+/);
    assert.ok(rel.includes("noopener") && rel.includes("noreferrer"),
      `External links opening a new tab must use noopener noreferrer: ${href}`);
  }
}

const expectedLinks = [
  "https://leobobadilha.github.io/workforce-analytics-portfolio/",
  "https://leobobadilha.github.io/brazil-fixed-income-lab/",
  "https://leobobadilha.github.io/project-vortex-portfolio/",
  "https://www.linkedin.com/in/leonardobobadilha/",
];
for (const link of expectedLinks) {
  assert.ok(destinations.includes(link), `Missing featured link: ${link}`);
}

assert.ok(!destinations.includes("https://github.com/LeoBobadilha/brazil-fixed-income-lab"),
  "Do not link visitors to the private fixed-income repository");
console.log(`Website checks passed: ${requiredFiles.length} files, ${ids.length} unique IDs, ${anchors.length} links.`);

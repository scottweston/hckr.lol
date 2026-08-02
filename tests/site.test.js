const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const output = path.join(process.cwd(), "_site");
const webring = require("../src/_data/webring.js");
const palettes = require("../src/_data/palettes.json");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

test("essential static pages are built", () => {
  const pages = [
    "index.html",
    "blog/index.html",
    "resources/index.html",
    "webring/index.html",
    "events/index.html",
    "now/index.html",
    "colophon/index.html",
    "feed.xml",
    "sitemap.xml",
    "_headers",
  ];

  for (const page of pages) {
    assert.ok(fs.existsSync(path.join(output, page)), `missing ${page}`);
  }
});

test("every webring member has static next and previous routes", () => {
  const validTargets = webring.members.map((member) => member.url);
  const routes = new Map();

  for (const member of webring.members) {
    for (const direction of ["next", "previous"]) {
      const route = path.join(output, "webring", member.slug, direction, "index.html");
      assert.ok(fs.existsSync(route), `missing ${member.slug}/${direction}`);

      const html = fs.readFileSync(route, "utf8");
      const target = validTargets.find((url) => html.includes(`rel="canonical" href="${url}"`));
      assert.ok(target, `invalid target in ${route}`);
      assert.notEqual(target, member.url, `${member.slug}/${direction} points to itself`);
      assert.match(html, /http-equiv="refresh"/);
      routes.set(`${member.slug}:${direction}`, target);
    }
  }

  for (const member of webring.members) {
    const nextUrl = routes.get(`${member.slug}:next`);
    const nextMember = webring.members.find((candidate) => candidate.url === nextUrl);
    assert.equal(routes.get(`${nextMember.slug}:previous`), member.url);
  }
});

test("the deployment contains no Cloudflare runtime code", () => {
  assert.equal(fs.existsSync(path.join(output, "_worker.js")), false);
  assert.equal(fs.existsSync(path.join(process.cwd(), "functions")), false);
});

test("palette data produces valid light and dark choices", () => {
  const ids = new Set();
  const requiredColours = ["ink", "paper", "signal", "coral", "violet", "sky", "muted", "shadow", "onViolet"];

  assert.equal(palettes[0].mode, "light");
  assert.equal(palettes.filter((palette) => palette.systemDark).length, 1);
  assert.ok(palettes.some((palette) => palette.mode === "light"));
  assert.ok(palettes.some((palette) => palette.mode === "dark"));

  for (const palette of palettes) {
    assert.match(palette.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(ids.has(palette.id), false, `duplicate palette ID: ${palette.id}`);
    assert.ok(["light", "dark"].includes(palette.mode));
    for (const colour of requiredColours) assert.match(palette.colors[colour], /^#[0-9a-f]{6}$/i);
    ids.add(palette.id);
  }

  const home = fs.readFileSync(path.join(output, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(output, "assets/css/site.css"), "utf8");
  for (const palette of palettes) {
    assert.ok(home.includes(`data-theme-option="${palette.id}"`));
    assert.ok(css.includes(`:root[data-theme="${palette.id}"]`));
  }
});

test("generated HTML has no broken root-relative links", () => {
  for (const file of walk(output).filter((item) => item.endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1]);

    for (const href of hrefs) {
      const pathname = href.split(/[?#]/, 1)[0];
      let target = path.join(output, pathname);
      if (pathname.endsWith("/")) target = path.join(target, "index.html");
      assert.ok(fs.existsSync(target), `${path.relative(output, file)} links to missing ${href}`);
    }
  }
});

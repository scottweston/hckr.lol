const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const output = path.join(process.cwd(), "_site");
const webring = require("../src/_data/webring.js");
const palettes = require("../src/_data/palettes.json");
const events = require("../src/_data/events.js");

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

test("events publish only with tickets and infer whether tickets are still available", () => {
  const home = fs.readFileSync(path.join(output, "index.html"), "utf8");
  const listing = fs.readFileSync(path.join(output, "events/index.html"), "utf8");
  const now = Date.now();
  const upcoming = events.filter((event) => event.ticketUrl && Date.parse(event.end) > now);

  for (const event of events) {
    assert.equal(Object.hasOwn(event, "status"), false);
    assert.equal(event.displayDate.startsWith("Wednesday"), true);
    if (event.ticketUrl) {
      assert.ok(listing.includes(event.title), `${event.title} should be listed`);
    } else {
      assert.equal(listing.includes(event.title), false, `${event.title} should wait for tickets`);
      assert.equal(home.includes(event.title), false, `${event.title} should wait for tickets`);
    }
  }

  assert.equal(listing.includes("data-events-coming-soon hidden"), upcoming.length > 0);
  assert.equal(home.includes("data-next-event-soon hidden"), upcoming.length > 0);
});

test("meetup recaps carry the event end time into the page and feed", () => {
  const feed = fs.readFileSync(path.join(output, "feed.xml"), "utf8");
  const recaps = [
    ["first-domain-first-website", "2026-08-26T10:30:00.000Z"],
    ["moving-dns-before-a-domain-transfer", "2026-09-23T10:30:00.000Z"],
  ];

  for (const [slug, timestamp] of recaps) {
    const html = fs.readFileSync(path.join(output, "blog", slug, "index.html"), "utf8");
    assert.ok(html.includes(`class="dt-published" datetime="${timestamp}"`));
    assert.ok(feed.includes(`<pubDate>${new Date(timestamp).toUTCString()}</pubDate>`));
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

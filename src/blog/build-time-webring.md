---
layout: layouts/post.njk
title: A webring with no server
description: How build-time shuffling gives a static ring a little movement.
date: 2026-07-28
readingTime: 4 min read
tags: [post, eleventy, webring]
permalink: /blog/build-time-webring/
---

A webring normally needs a tiny server to look up the current member and send a visitor to the next one. This site takes a different route: it generates every possible redirect as a static HTML file.

Each neighbour has four small pieces of data in `src/_data/webring.js`:

```js
{
  slug: "your-name",
  title: "Your excellent website",
  description: "Notes on bread, buses and browsers.",
  url: "https://example.net/"
}
```

The build shuffles the array once, then creates pages such as:

```text
/webring/your-name/previous/
/webring/your-name/next/
```

Those pages use an immediate HTML redirect and include an ordinary fallback link. JavaScript improves the hand-off but is not required.

## Random enough

The order stays fixed for the lifetime of one deployment. On the next content update, the build shuffles it again. This is not request-by-request randomness, but it gives the neighbourhood an occasional reshuffle without a database, function or running process.

That constraint is useful: the ring can move from Cloudflare Pages to GitHub Pages, a basic VPS, object storage or a Raspberry Pi without changing its architecture.

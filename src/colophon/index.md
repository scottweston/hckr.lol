---
layout: layouts/page.njk
title: Colophon
eyebrow: How the clubhouse is made
description: The tools, constraints and deliberate decisions behind hckr.lol.
permalink: /colophon/
---

This site is built with [Eleventy](https://www.11ty.dev/), a static site generator. Source files go in `src/`; the build writes the complete deployable site to `_site/`.

## The stack

- **Content:** Markdown, Nunjucks and JavaScript data files.
- **Build:** Eleventy 3.1.6, installed and pinned by [mise](https://mise.jdx.dev/).
- **Hosting:** Cloudflare Pages, serving static output only.
- **Enhancement:** one small JavaScript file for the colour palette switcher.
- **Typography:** system fonts already on the visitor’s device.

There are no Pages Functions, Workers, databases, third-party analytics, external font requests or client-side framework. Cloudflare is the current file host, not part of the application architecture.

## Eleventy features on display

- global data in `src/_data/`;
- reusable layouts and includes;
- Markdown content with Nunjucks shortcodes;
- custom collections and filters;
- JavaScript templates with pagination for the webring redirects;
- passthrough copying for static assets and `_headers`;
- generated RSS and sitemap files; and
- a stylesheet generated from theme data.

## The palettes

The default “Neighbourhood Signal” palette borrows from community noticeboards, risograph flyers and bits of radio equipment. It is joined by five other light and dark palettes with names like “CRT Afterglow” and “GeoCities Night Bus”. Their names, modes and colours live together in `src/_data/palettes.json`; Eleventy uses that one file to generate both the CSS and the swatch menu.

Until a visitor chooses a palette, the site follows their browser’s light or dark preference. An explicit choice is saved locally in their browser, and “Follow system” removes that choice. The tiny inline script in the page head makes the decision before the stylesheet loads to avoid a flash of the wrong palette.

The site is designed to work without the enhancement script, respect reduced-motion preferences, remain usable by keyboard, and print without decorative clutter.

## Portability test

Run `mise run build`, then serve `_site/` with any static HTTP server. That is the whole deployment contract. To move providers, copy that directory or point another build service at the repository.

{% note "Read the source" %}
The [repository README]({{ site.sourceUrl }}#readme) is a guided tour and includes the exact Cloudflare Pages settings, webring editing steps and suggestions for meetup exercises.
{% endnote %}

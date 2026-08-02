---
layout: layouts/resource.njk
title: Start an IndieWeb site
description: The smallest useful path from no site to a place you control.
category: Foundations
level: Beginner
updated: 2026-08-01
permalink: /resources/getting-started/
---

You do not need to implement every IndieWeb idea on day one. Start with a page at a domain you control, then let it grow in the direction of your actual interests.

## A useful first evening

1. Choose a domain name you are happy to say aloud.
2. Make an `index.html` containing your name, a short introduction and one link.
3. Publish that file with a static host.
4. Put the source in version control.
5. Add one thing because *you* want it there.

{% note "The important bit" %}
Owning the domain matters more than choosing the perfect generator or host. A domain gives your work a stable address while everything behind it remains replaceable.
{% endnote %}

## Then add structure

When repeating page headers and lists becomes tedious, a static site generator can help. Eleventy reads familiar formats such as Markdown, HTML, Nunjucks and JavaScript data, then writes ordinary files that any web server can serve.

This repository is intentionally small enough to take apart. Begin with these files:

- `src/index.njk` — the home page;
- `src/_includes/layouts/base.njk` — the shared HTML frame;
- `src/_data/site.json` — site-wide values; and
- `eleventy.config.js` — the build configuration.

## Keep going

Add an [h-card](/resources/microformats/) so software can recognise your identity, then publish a [feed](/resources/feeds/) so people can follow updates without an account.

Further reading: [IndieWeb Getting Started](https://indieweb.org/Getting_Started) and [Eleventy documentation](https://www.11ty.dev/docs/).

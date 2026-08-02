---
layout: layouts/post.njk
title: Hello, small web
description: Why this deliberately modest website exists.
date: 2026-08-01
readingTime: 3 min read
tags: [post, indieweb]
permalink: /blog/hello-small-web/
---

The web is at its best when it feels less like a shopping centre and more like a neighbourhood. A personal website can be a front porch, a workshop, a library card and a very slow conversation all at once.

This site is an example, not a prescription. It uses [Eleventy](https://www.11ty.dev/) to turn a folder of plain text, HTML and data into a folder of plain web pages. That output can live almost anywhere.

## What “independent” means here

It means the important bits are ours:

- a domain we control;
- content stored in ordinary files;
- links that do not depend on a social platform;
- a build that does not require a database or proprietary runtime; and
- the freedom to change hosts without rebuilding the whole idea.

{% note "Try this at the meetup" %}
Open <code>src/blog/hello-small-web.md</code>, change a sentence, and run <code>mise run build</code>. You have just updated a static website.
{% endnote %}

## Small is a feature

There is no login, recommendation engine, analytics script or cookie banner here. Not because those things are forbidden, but because a useful community site does not automatically need them.

We will add complexity when it earns its keep. Until then, we have hyperlinks. Hyperlinks are wonderful.

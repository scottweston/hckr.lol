---
layout: layouts/post.njk
title: URLs are tiny promises
description: Choose addresses for readers, not for the tool you happen to use today.
date: 2026-07-20
readingTime: 3 min read
tags: [post, architecture]
permalink: /blog/urls-are-promises/
---

A good URL tells a reader roughly what waits on the other side. `/blog/urls-are-promises/` is dull in exactly the right way.

Tools change. A site might begin in Eleventy, move to a hand-written folder, spend a season on GitHub Pages and eventually live on a small computer under a desk. The public addresses should not need to follow those changes.

## Pick the shape first

Before choosing a generator, sketch the durable parts of the site:

- `/blog/` for dated writing;
- `/resources/` for documents that improve over time;
- `/now/` for what has your attention;
- `/events/` for gatherings; and
- `/colophon/` for explaining how the site is made.

Eleventy’s `permalink` data lets each page state its public address explicitly. That makes the URL part of the content, rather than an accidental consequence of a folder structure.

> A URL is a promise that you can change everything behind the address while keeping the address useful.

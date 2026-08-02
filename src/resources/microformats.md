---
layout: layouts/resource.njk
title: Microformats
description: Small class names that make ordinary HTML understandable to people and software.
category: Publishing
level: Beginner
updated: 2026-07-30
permalink: /resources/microformats/
---

Microformats add agreed class names to the HTML you already write. They do not replace semantic elements or require a new file format.

An `h-card` describes a person or organisation:

```html
<article class="h-card">
  <a class="p-name u-url" href="https://example.net/">
    Ada Example
  </a>
  <p class="p-note">Making tiny tools for the web.</p>
</article>
```

The `h-card` says what kind of object this is. The `p-name`, `u-url` and `p-note` properties identify its useful parts.

## Posts and events

The same pattern describes writing with `h-entry` and gatherings with `h-event`. This site marks up blog posts as entries, the site identity as a card, and event listings as events.

View the generated HTML, find those classes and compare them with the [Microformats wiki](https://microformats.org/wiki/microformats2). You can also paste a URL into the [IndieWebify.me validator](https://indiewebify.me/) while learning.

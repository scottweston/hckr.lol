---
layout: layouts/resource.njk
title: Feeds
description: Follow updates from many sites in one place, without a central platform.
category: Reading
level: Beginner
updated: 2026-07-29
permalink: /resources/feeds/
---

RSS and Atom feeds are lists of recent updates in a machine-readable format. A reader subscribes to a feed URL once, then checks it periodically for new items.

On this site, `/feed.xml` is generated from the same Eleventy collection that produces the blog index. No one has to remember to update a second list.

## Discovery

The base page layout includes this element:

```html
<link rel="alternate"
      type="application/rss+xml"
      title="hckr.lol blog"
      href="/feed.xml">
```

Feed readers can use it to discover the subscription address from any page.

## Why feeds still matter

Feeds separate publishing from reading. Authors choose where to publish; readers choose how to read. There is no single service deciding which posts appear or whether an account is allowed to reach its audience.

See the [IndieWeb feed overview](https://indieweb.org/feed) for formats, readers and publishing patterns.

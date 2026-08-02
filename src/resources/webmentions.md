---
layout: layouts/resource.njk
title: Webmentions
description: A web standard for notifying a page when another page links to it.
category: Conversation
level: Intermediate
updated: 2026-07-27
permalink: /resources/webmentions/
---

A webmention is a notification between two URLs. If your post links to another person’s post, your publishing tool can tell their site. Their site verifies the link before displaying or recording the mention.

## The useful mental model

- The source is the page containing the link.
- The target is the page being linked to.
- The endpoint receives those two URLs.
- The receiver fetches the source and verifies the link exists.

Webmentions can represent replies, likes, reposts and plain references when combined with microformats.

{% note "Why this example does not receive them yet" %}
Receiving webmentions needs an endpoint and somewhere to store or fetch the results. This teaching site deliberately deploys as static files only. A hosted IndieWeb service can add that feature later without tying the site itself to Cloudflare Functions.
{% endnote %}

Read the [W3C Webmention recommendation](https://www.w3.org/TR/webmention/) or the friendlier [IndieWeb Webmention page](https://indieweb.org/Webmention).

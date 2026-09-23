# hckr.lol

A small IndieWeb clubhouse built to be read in two ways: as a live community site and as an approachable Eleventy teaching project.

The deployed site is entirely static. Eleventy turns Markdown, Nunjucks, JavaScript data and CSS into the `_site/` directory. Cloudflare Pages currently serves those files, but nothing in the application requires Cloudflare, a function runtime or a database.

## Start here

Install the configured tools and start Eleventy:

```sh
mise install
mise run dev
```

Open `http://localhost:8080`. Other useful commands are:

```sh
mise run build   # write the production site to _site/
mise run check   # build, then verify key output and webring routes
mise run deploy  # build, check, then upload to Cloudflare Pages
mise run clean   # remove generated output
```

## Guided tour

| What to learn | Where to look |
| --- | --- |
| Global JSON data | `src/_data/site.json`, `palettes.json`, `navigation.json` |
| JavaScript data and validation | `src/_data/webring.js`, `events.js` |
| Shared HTML | `src/_includes/layouts/` and `components/` |
| Markdown content | `src/blog/` and `src/resources/` |
| Collections, filters and a shortcode | `eleventy.config.js` |
| Pagination and computed permalinks | `src/webring-next.11ty.js`, `src/webring-previous.11ty.js` |
| Data-generated CSS theme | `src/styles/site.css.njk` |
| RSS and sitemap generation | `src/feed.njk`, `src/sitemap.njk` |
| Static-host headers | `src/_headers` |

The [colophon](https://hckr.lol/colophon/) explains the architecture from a visitor’s perspective.

## Add someone to the webring

Edit the `members` array in `src/_data/webring.js`:

```js
{
  slug: "ada-example",
  title: "Ada’s website",
  description: "Notes on making small and useful things.",
  url: "https://ada.example/",
}
```

That is all the source data needed. Slugs must be unique, lowercase, URL-safe words separated by hyphens. Member URLs must use HTTPS. The build fails with a useful message when either rule is broken.

After a build, Ada can place these links on her site:

```html
<a href="https://hckr.lol/webring/ada-example/previous/">← Previous</a>
<a href="https://hckr.lol/webring/">hckr.lol webring</a>
<a href="https://hckr.lol/webring/ada-example/next/">Next →</a>
```

Eleventy shuffles the member array once per build and generates a static redirect file for every member in both directions. The order is internally consistent for that deployment and wraps at each end. A later site update reshuffles the route. Redirect pages contain an HTML meta refresh, a tiny JavaScript enhancement and a normal fallback link.

`title`, `description`, `url` and `slug` are enough for the current ring. An optional avatar was deliberately omitted: it adds image ownership, sizing, privacy and broken-link questions that do not improve the first meetup exercise. It can be a useful follow-up lesson.

## Add content

A post is a Markdown file in `src/blog/` with front matter like:

```yaml
---
layout: layouts/post.njk
title: Notes from the meetup
description: What we made and what we learned.
date: 2026-08-26
readingTime: 3 min read
tags: [post, meetup]
permalink: /blog/notes-from-the-meetup/
---
```

Resources use `layouts/resource.njk` and add `category`, `level` and `updated`. Events live in `src/_data/events.js`, which demonstrates keeping structured records separate from presentation.

To add a meetup, copy an event record and update its title, dates, times, location, description and ticket URL. Use `status: "upcoming"` for planned events and `status: "past"` for finished ones. Status is maintained manually; it does not change automatically with the date.

The front page shows the earliest start time among events marked `upcoming`, or a coming-soon message when there are none. The events page lists every record in file order. Both pages use the same data, so updating `ticketUrl` updates both links; leave it empty to hide the ticket link until it is ready. Run `mise run check` to rebuild and verify the site, then publish the generated site for the changes to appear live.

## Change the theme

Six light and dark palette definitions live in `src/_data/palettes.json`. Eleventy uses that single file to generate the CSS custom-property sets and the swatch menu in the site header.

With no saved choice, the site follows the visitor’s `prefers-color-scheme` browser setting. Choosing a named palette stores its ID in local browser storage; choosing “Follow system” removes it. The automatic light/dark fallback also works when JavaScript is unavailable.

This is a good meetup exercise:

1. Duplicate a palette object in `src/_data/palettes.json`.
2. Give it a unique ID, retro name, light/dark mode and colour values.
3. Run `mise run build`; no template or JavaScript changes are required.
4. Open the palette menu and share the result.

## Deploy to Cloudflare Pages

To deploy from your local checkout:

```sh
mise run deploy
```

This runs `check` first, then uploads `_site/` to the `hckr-lol` Pages project. If you need to sign in first, run `mise exec -- wrangler login`. Wrangler uses your current Git branch: use `main` for production, or another branch for a preview deployment. See the [Cloudflare direct upload guide](https://developers.cloudflare.com/pages/get-started/direct-upload/).

To set up automatic deployments from Git instead:

Connect the Git repository to Pages and use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npx @11ty/eleventy@3.1.6` |
| Build output directory | `_site` |
| Root directory | `/` |

The explicit version makes the hosted build match `mise.toml`. Pages’ official Eleventy guide also uses `npx @11ty/eleventy` and `_site`; see the [Cloudflare Eleventy deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/).

Do not add a `functions/` directory. There are no bindings, secrets or runtime environment variables to configure. `src/_headers` is copied to the output as an optional Pages adapter; other static hosts safely ignore or replace it.

Before announcing the site, update these site-specific values:

- the contact `email` in `src/_data/site.json`.

## Move it somewhere else

Run `mise run build`, then publish `_site/` with any static server. Examples include GitHub Pages, Netlify, an nginx or Caddy document root, object storage, or a Raspberry Pi. The host needs no knowledge of Eleventy.

The only host-specific source file is `_headers`. The webring routes are directories containing `index.html`, so they work on ordinary static servers with conventional directory-index support.

## Meetup-sized experiments

- Add a webring member and inspect its two generated direction files.
- Write a post and watch the blog, home page, RSS feed and sitemap update together.
- Add a resource category without changing a template.
- Make a fourth colour palette.
- Deploy `_site/` to a second provider and switch the domain.
- Add a `/uses/`, `/links/` or `/guestbook/` slash page.
- Validate the home page’s `h-card`, a post’s `h-entry` and an event’s `h-event`.

## Project status

The email address is sample data, intentionally obvious in the source. Confirm it before treating the site as production information.

## Licence

Source code is available under the MIT licence. Written content is available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) unless otherwise noted.

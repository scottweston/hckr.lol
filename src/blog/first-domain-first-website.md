---
layout: layouts/post.njk
title: A first domain and a website that works
description: How one attendee went from buying a domain to publishing a first site with GitHub Pages.
date: 2026-08-26T20:30:00+10:00
showTime: true
readingTime: 3 min read
tags: [post, meetup, domains, github-pages]
permalink: /blog/first-domain-first-website/
---

At our first Ballarat IndieWeb meetup, someone arrived without a domain and left with a working website at an address they owned. They bought their first domain; together we set up its DNS, got them started on GitHub, made a first project, published it with GitHub Pages and connected the domain. It was a lovely reminder that a personal site can start small and still be real.

If you want to try the same thing, the path has a few distinct parts:

1. **Choose a domain you want to keep.** Register it in an account you control, with an email address you can access. The domain is your address; it does not have to tie you to one website host.
2. **Make a small site on GitHub.** Create a repository and add an `index.html` page. GitHub's [Pages guide](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) explains how to choose a publishing source in the repository's **Settings → Pages**. Check that the temporary `github.io` address works before adding your domain.
3. **Tell GitHub which domain belongs to the site.** Add the custom domain in the repository's Pages settings. GitHub recommends [verifying a domain you own](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) so another account cannot claim it for Pages.
4. **Point DNS at the site.** At your DNS provider, add the records GitHub specifies for your choice of root domain (`example.com`) or subdomain (`www.example.com`). The record type and value differ, so use GitHub's [current custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) rather than copying someone else's old settings.
5. **Visit the address and check HTTPS.** DNS changes can take time to reach every resolver. Once the site loads at your domain, check both the address you intend to share and the HTTPS setting in Pages.

That was the whole first project: a page, a repository and a domain pointing to it. The attendee could leave with a working site and the ability to edit it later. If you get stuck at any step, bring the problem to a meetup. These are exactly the kinds of small, practical web problems we like solving together.

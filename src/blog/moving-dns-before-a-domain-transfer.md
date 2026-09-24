---
layout: layouts/post.njk
title: Move the DNS before moving the domain
description: A meetup plan for changing registrars without losing track of the DNS that keeps a site and email working.
date: 2026-09-23T20:30:00+10:00
showTime: true
readingTime: 4 min read
tags: [post, meetup, domains, dns]
permalink: /blog/moving-dns-before-a-domain-transfer/
---

At our second Ballarat IndieWeb meetup, an attendee wanted to change domain registrars. A registrar manages the registration; nameservers tell the rest of the internet where to find the domain's DNS records. Those jobs can move at different times, which gave us a manageable first step.

We talked through the likely snags: DNS records have **TTL** values that tell resolvers how long to cache an answer, some resolvers may still have old records, and a registrar transfer usually needs an **EPP/Auth-Code**. Then we worked on the DNS move. The attendee created a zone with the new provider, recreated the existing records there and checked that the new nameservers answered correctly. Only then did we change the domain's nameservers at the old registrar. They left with instructions for starting the registration transfer after the DNS change had settled; we did **not** initiate that transfer at the meetup.

If you are making a similar move, this is a useful order of work:

1. **Inventory the current DNS.** Copy every record you rely on, including website, email, verification and service records. Note the type, name, value and TTL. Check whether DNSSEC is enabled; a nameserver change can need extra DS-record coordination.
2. **Build the new zone first.** Recreate the records at the new DNS provider while the old nameservers are still authoritative. Compare the old and new zones carefully, especially `MX` and `TXT` records used for email.
3. **Ask the new nameservers directly.** For example, `dig @ns-new.example.net example.com MX` queries one proposed nameserver for mail records. Check the website and other important record types too. This tells you what the new servers would answer before you change the delegation.
4. **Change the nameservers at the current registrar.** Keep the old DNS zone in place during the transition. Cached answers and nameserver information can linger; [TTL affects how long DNS answers are cached](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/), so allow time and check from more than one resolver. If DNSSEC is in use, follow your providers' instructions for its DS records before and after the change.
5. **Transfer the registration when DNS is steady.** Check that the site and email still work, then follow the new registrar's process. This may involve unlocking the domain, getting the [Auth-Code from the old registrar](https://www.icann.org/resources/pages/auth-2013-05-03-en) and approving the request. [ICANN's transfer FAQ](https://www.icann.org/resources/pages/name-holder-faqs-2017-10-10-en) explains common restrictions, including some 60-day locks. Rules for country-code domains can differ, so check your domain's registrar instructions.

The key idea is to make each change observable. Prepare and test the replacement DNS, change the nameservers, confirm that traffic and mail still resolve, and only then start the registrar transfer. It is a good example of what happens at these meetups: bring a real web problem, work through it together and leave with the next step clear.

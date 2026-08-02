const members = [
  {
    slug: "hckr-lol",
    title: "hckr.lol",
    description: "A small web clubhouse and the home of this webring.",
    url: "https://hckr.lol/",
  },
  {
    slug: "ballarat-hackerspace",
    title: "Ballarat Hackerspace",
    description: "A volunteer-run community workshop where Ballarat makers learn, build and share across STEAM.",
    url: "https://ballarathackerspace.org.au/",
  },
  {
    slug: "indieweb-au",
    title: "IndieWeb Australia",
    description: "A home for local IndieWeb groups and meetups, beginning with the personal-web community at Ballarat Hackerspace.",
    url: "https://indieweb.au/",
  },
  {
    slug: "brain",
    title: "BRAIN",
    description: "The Ballarat Region Artificial Intelligence Network, connecting local people, projects and ideas around AI.",
    url: "https://brain.net.au/",
  },
  {
    slug: "srw",
    title: "Scott Weston",
    description: "A chaotic creative hacker’s independent home for software, systems, computers and electronics.",
    url: "https://srw.au/",
  },
  {
    slug: "obsolete-nerd",
    title: "ObsoleteNerd.com",
    description: "Retrocomputing, electronics, hardware projects and old-web enthusiasm from a lifelong tinkerer.",
    url: "https://obsoletenerd.com/",
  },
];

function validate(items) {
  const slugs = new Set();

  for (const member of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(member.slug)) {
      throw new Error(`Invalid webring slug: ${member.slug}`);
    }
    if (slugs.has(member.slug)) {
      throw new Error(`Duplicate webring slug: ${member.slug}`);
    }
    if (!/^https:\/\//.test(member.url)) {
      throw new Error(`Webring URLs must use HTTPS: ${member.url}`);
    }
    slugs.add(member.slug);
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapWith = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapWith]] = [copy[swapWith], copy[index]];
  }
  return copy;
}

validate(members);

module.exports = {
  members,
  shuffled: shuffle(members),
  builtAt: new Date().toISOString(),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

class WebringPrevious {
  data() {
    return {
      pagination: { data: "webring.shuffled", size: 1, alias: "member" },
      permalink: ({ member }) => `/webring/${member.slug}/previous/index.html`,
      eleventyExcludeFromCollections: true,
    };
  }

  render({ member, webring }) {
    const index = webring.shuffled.findIndex((item) => item.slug === member.slug);
    const target = webring.shuffled[(index - 1 + webring.shuffled.length) % webring.shuffled.length];
    const url = escapeHtml(target.url);
    const scriptUrl = JSON.stringify(target.url).replaceAll("<", "\\u003c");

    return `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${url}">
  <title>Previous from ${escapeHtml(member.title)} · hckr.lol webring</title>
  <link rel="canonical" href="${url}">
  <script>location.replace(${scriptUrl})</script>
</head>
<body>
  <p>Back to <a href="${url}">${escapeHtml(target.title)}</a>…</p>
</body>
</html>`;
  }
}

module.exports = WebringPrevious;

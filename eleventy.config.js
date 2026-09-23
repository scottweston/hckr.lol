module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addWatchTarget("src/assets/");

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/blog/*.md")
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("resources", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/resources/*.md")
      .sort((a, b) => a.data.title.localeCompare(b.data.title))
  );

  eleventyConfig.addFilter("readableDate", (date) =>
    new Intl.DateTimeFormat("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date)
  );

  eleventyConfig.addFilter("htmlDateString", (date) =>
    new Date(date).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("head", (items, count) =>
    (items || []).slice(0, count)
  );

  eleventyConfig.addFilter("nextEvent", (events) =>
    events
      .filter((event) => event.status === "upcoming")
      .sort((a, b) => new Date(a.start) - new Date(b.start))[0]
  );

  eleventyConfig.addFilter("eventDay", (date) =>
    new Intl.DateTimeFormat("en-AU", { day: "numeric", timeZone: "UTC" })
      .format(new Date(date))
  );

  eleventyConfig.addFilter("eventMonth", (date) =>
    new Intl.DateTimeFormat("en-AU", { month: "short", timeZone: "UTC" })
      .format(new Date(date))
  );

  eleventyConfig.addFilter("absoluteUrl", (url, base) =>
    new URL(url, base).toString()
  );

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addShortcode("year", () => new Date().getFullYear());

  eleventyConfig.addPairedShortcode(
    "note",
    (content, title = "Field note") =>
      `<aside class="note"><strong>${title}</strong><div>${content}</div></aside>`
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk", "11ty.js"],
  };
};

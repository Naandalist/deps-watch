export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });

  eleventyConfig.addFilter("formatCount", (value) => {
    if (value === undefined || value === null || value === "") return "";
    const n = Number(value);
    if (!Number.isFinite(n)) return "";
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, "")}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, "")}k`;
    return String(n);
  });

  eleventyConfig.addFilter("statusLabel", (status) => {
    return {
      "needs-pr": "needs PR",
      "pr-open": "PR open",
      "fixed-unreleased": "fixed, unreleased",
      fixed: "fixed",
    }[status] || status;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: "/deps-watch/",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}

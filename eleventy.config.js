import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default async function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  //   eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addNunjucksAsyncFilter("postcss", (cssCode, done) => {
    postcss([tailwindcss(), autoprefixer()])
      .process(cssCode, { from: undefined })
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null)
      );
  });

  // human readable date
  //   eleventyConfig.addFilter("readableDate", (dateObj) => {
  //     return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-MM-dd");
  //   });

  // Copy Static Files to /_Site
  // eleventyConfig.addPassthroughCopy({
  //   "./node_modules/temporal-polyfill/global.min.js":
  //     "static/js/tempolal-polyfill.js",
  // });
  // eleventyConfig.addPassthroughCopy("bundle.js");

  return {
    dir: {
      input: "src",
    },

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}

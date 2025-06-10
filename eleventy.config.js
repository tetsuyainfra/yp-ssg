import "tsx/esm";
import { renderToStaticMarkup } from "react-dom/server";

import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import tailwindcss from '@tailwindcss/vite'
import postcss from "postcss";
import { compression } from 'vite-plugin-compression2'

import { DeepCopy, Merge } from "@11ty/eleventy-utils";

import fs from "fs";

export default async function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  //   eleventyConfig.setUseGitIgnore(false);
  // eleventyConfig.addPlugin(
  //   MyPluginWrap, {
  // })

  // doc: https://www.11ty.dev/docs/server-vite/
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: "build/.11ty-vite",

    viteOptions: {
      // [@11ty/eleventy-plugin-vite]plugin内でrootが指定される
      // root:  -> build/.11ty-vite
      // ↑のrootから見たpublicDirの場所が下になる。(つまり、eleventy側ではpublicに出力するようにすれば万事うまくいく)
      publicDir: "public",
      assetsInclude: ['**/*.json'],
      plugins: [
        tailwindcss(),
        // checkViteConfig()
        compression({
          exclude: [/\.map$/, /\.html$/],
        }),
      ],
      build: {
        // cssMinify: false,
      },
    },
  });

  // process by Vite
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/client');

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // We can add support for JSX too, at the same time:
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function () {
      return async function (data) {
        let content = await this.defaultRenderer(data);
        return renderToStaticMarkup(content);
      };
    },
  });
  eleventyConfig.addTemplateFormats("11ty.ts,11ty.tsx");


  eleventyConfig.addNunjucksAsyncFilter("postcss", (cssCode, done) => {
    postcss([])
      // .process(cssCode, { from: "a.css", to: "output.css" })
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
      output: process.env.OUTPUT_DIR || "build/_site",
    },

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}

function checkViteConfig() {
  let config = null
  return {
    name: 'my-plugin',

    configResolved(resolvedConfig) {
      config = resolvedConfig
      console.log('最終的な設定だよ👉', config)
    },

    buildStart() {
      console.log('ビルド開始時のルートは👉', config)
    },
  }
}
// function MyPluginWrap(eleventyConfig, pluginOptions = {}) {
//   let myPlguin = new MyPlugin(eleventyConfig, pluginOptions);
//   eleventyConfig.on("eleventy.after", async ({ dir, runMode, outputMode, results }) => {
//     fs.readdir("build/public", (err, files) => {
//       if (err) {
//         console.error("Error reading directory:", err);
//         return;
//       }
//       files.forEach(file => {
//         console.log("PublicFile:", file);
//       });
//     });
//     fs.readdir(dir.output, (err, files) => {
//       if (err) {
//         console.error("Error reading directory:", err);
//         return;
//       }
//       files.forEach(file => {
//         console.log("File:", file);
//       });
//     });
//   });
// }
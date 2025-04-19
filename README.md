# YP-SSG
Yellow page for peercast-root on SSG(StaticSiteGenerator)
genreated by 11ty(eleventy)


# how to build
```shell
# Install mise
$ cd yp-ssg
# create venv automatically

# build/serve
$ npm run dev
$ npm run build

# format
$ npm run format:check
$ npm run format:fix

# lint
```

# Directory
- src
  - _data: variables
  - _include: template
  - _styles: css
  - js-bundle.njk for global javascript
  - css-bundle.njk for global css
  - index.njk: / page
  - broadcast: /broadcast page
  - contact: /contact page
  - client : run on Browser, compiled by Vite

# Tools
using their programs 
- nodejs for 11ty
- python for Djlint(linter)
- uv for Djlint(linter)


# Licenses
## including OSS
- https://github.com/madrilene/eleventy-excellent (ISC, MIT, SIL)
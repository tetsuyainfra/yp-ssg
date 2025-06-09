# YP-SSG
Yellow page for peercast-root on SSG(StaticSiteGenerator)
genreated by 11ty(eleventy)

# TODO
- github actions
- docker build
- 運用開始

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
## nunjucks
$ djlint --check src
$ djlint --reformat src
## nginxfmt
$ nginxfmt share/nginx.conf

# lint

# build for yp.007144.xyz
$ ./build.sh

# docker run
$ docker run --rm -it -p 80:80 yp-ssg:latest
$ docker run --rm -it -p 80:80 -v ./share/007144-nginx.conf:/etc/nginx/nginx.conf yp-ssg:latest


# check access
curl http://localhost
curl -H 'Host: yp.007144.xyz' http://localhost
curl -H 'Host: yp-beta.007144.xyz' http://localhost

curl --resolve yp.007144.xyz:80:127.0.0.1 http://yp.007144.xyz/config.json
curl --resolve yp-beta.007144.xyz:80:127.0.0.1 http://yp-beta.007144.xyz/config.json

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
- python for Djlint(linter), nginxfmt(nginx-config-formatter)
- uv for Djlint(linter)


# Licenses
## including OSS
- https://github.com/madrilene/eleventy-excellent (ISC, MIT, SIL)
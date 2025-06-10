# YP-SSG
Yellow page for peercast-root on SSG(StaticSiteGenerator)
genreated by 11ty(eleventy)
[Docker tetsuyainfra/yp-ssg](https://hub.docker.com/r/tetsuyainfra/yp-ssg/tags)

# TODO
- github actions
- docker build
- 運用開始

# how to build
```shell
# Install mise
$ cd yp-ssg

# build container
$ ./build-container

# docker run
$ docker run --rm -it yp-ssg:latest npm run build
$ docker run --rm -it -p 8080:8080 yp-ssg:latest npm run dev

# build site
$ ./build.sh
$ ls -la build



# In container
## build/serve
$ npm run dev
$ npm run build

## format
$ npm run format:check
$ npm run format:fix
### nunjucks
$ djlint --check src
$ djlint --reformat src
### nginxfmt
$ nginxfmt share/nginx.conf

# check access 
curl http://localhost
curl -H 'Host: yp.007144.xyz' http://localhost
curl -H 'Host: yp-beta.007144.xyz' http://localhost

curl --resolve yp.007144.xyz:80:127.0.0.1 http://yp.007144.xyz/config.json
curl --resolve yp-beta.007144.xyz:80:127.0.0.1 http://yp-beta.007144.xyz/config.json

```


# 注意
- output directoryは build/HOGE に指定する必要がある
  - 11tyのVitePluginにてコンパイルする際一度、build/.11ty-tmpに出力し、その後renameしている。
  - /appはDocker内のマウント、出力を-v ./tmp:/app/buildでマウントしている時、違うマウント先となりrenameできない

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
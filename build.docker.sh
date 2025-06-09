#!/bin/bash
SCRIPT_ROOT=$(cd $(dirname $0);pwd)
set -ex

pushd $SCRIPT_ROOT
    # VERSION=$(cargo metadata --format-version=1 --no-deps | jq  '.packages[] | select(.name == "peercast-root") | .version')
    # latest(tag)はローカルビルドで簡単にバージョンを指定する為に使うに留め
    # docker hubにアップロードすることはないように注意する
    docker build -t yp-ssg:latest -f $1 ./

    # if you run
    # docker run --rm -it -p 80:80 -p 7143:7143 yp-ssg:latest
    # docker run --rm -it -p 80:80 -p 7143:7143 -v ./share/007144-nginx.conf:/etc/nginx/nginx.conf --name yp-ssg yp-ssg:latest
popd

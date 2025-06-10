#!/bin/bash
SCRIPT_ROOT=$(cd $(dirname $0);pwd)
set -ex

pushd $SCRIPT_ROOT
    ./build-container.sh
    docker run --rm -it \
        -v ./build:/app/build \
        yp-ssg:latest \
        npm run build
popd

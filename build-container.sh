#!/bin/bash
SCRIPT_ROOT=$(cd $(dirname $0);pwd)
set -ex

pushd $SCRIPT_ROOT
    docker build -t yp-ssg:latest -f docker/Dockerfile .
popd

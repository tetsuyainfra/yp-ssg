#!/bin/bash
SCRIPT_ROOT=$(cd $(dirname $0);pwd)
set -ex

pushd $SCRIPT_ROOT
    ./build.site_with_env.sh yp-007144-xyz.env
    ./build.site_with_env.sh yp-beta-007144-xyz.env
    ./build.docker.sh docker/Dockerfile.007144
popd

#!/bin/bash

docker run --rm -it \
    -p 3000:3000 \
    yp-ssg:latest \
    sh -c 'npm run build && npm run serve build/yp-example'

#!/bin/bash
set -e

function http_json_value_check {
    local url=$1; shift
    local key=$1; shift
    local val=$1; shift
    local url_opt=$@
    title=$(curl --silent ${url_opt[@]} $url | jq -r ".$key")
    if [[ $title != "$val" ]]; then
        echo "Title does not match expected value"
        exit 1
    fi
}

function http_code {
    local url=$1
    shift
    local url_opts=$@
    local code=$(curl --output /dev/null --silent --write-out "%{http_code}" ${url_opt[@]} "$url")
    if [[ $code != 200 ]]; then
        echo "HTTP request to $url failed with code $code"
        exit 1
    fi
}

http_json_value_check http://localhost/config.json title "DevYP"
http_code http://localhost/index.txt
http_code http://localhost/api/index.json

http_json_value_check http://yp.007144.xyz/config.json title "DevYP" --resolve yp.007144.xyz:80:127.0.0.1
http_code http://yp.007144.xyz/index.txt      --resoleve yp.007144.xyz:80:127.0.0.1
http_code http://yp.007144.xyz/api/index.json --resoleve yp.007144.xyz:80:127.0.0.1

http_json_value_check http://yp-beta.007144.xyz/config.json title "DevYP-BETA" --resolve yp-beta.007144.xyz:80:127.0.0.1
http_code http://yp-beta.007144.xyz/index.txt      --resoleve yp-beta.007144.xyz:80:127.0.0.1
http_code http://yp-beta.007144.xyz/api/index.json --resoleve yp-beta.007144.xyz:80:127.0.0.1


echo "success"
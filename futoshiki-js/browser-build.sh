#!/bin/sh

$(npm bin)/tsc -m es6 --outDir d src/*.ts --target es2019 --moduleResolution node

$(npm bin)/rollup d/index.js --file static/bundle.js --format iife --output.name abc


# Serve with
# python3 -m http.server --directory static

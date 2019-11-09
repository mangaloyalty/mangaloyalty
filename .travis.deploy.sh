if [ "$TRAVIS_OS_NAME" == osx ]; then
  npm run release
else
  docker run --rm \
    -e GH_TOKEN \
    -v "${PWD}":/project \
    -v ~/.cache/electron:/root/.cache/electron \
    -v ~/.cache/electron-builder:/root/.cache/electron-builder \
    electronuserland/builder:wine /bin/bash -c "npm install && npm run release -- -lw"
fi

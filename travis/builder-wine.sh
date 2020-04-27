  docker run --rm \
    -e GH_TOKEN \
    -v "${PWD}":/project \
    -v ~/.cache/electron:/root/.cache/electron \
    -v ~/.cache/electron-builder:/root/.cache/electron-builder \
    electronuserland/builder:wine /bin/bash -c "npm ci && npm run release:wine"

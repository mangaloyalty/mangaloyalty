export DOCKER_CLI_EXPERIMENTAL=enabled
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker manifest create mangaloyalty/mangaloyalty:latest mangaloyalty/mangaloyalty:amd64 mangaloyalty/mangaloyalty:arm64
docker manifest push mangaloyalty/mangaloyalty:latest

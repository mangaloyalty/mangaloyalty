export DOCKER_CLI_EXPERIMENTAL=enabled
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t mangaloyalty/mangaloyalty:$TRAVIS_CPU_ARCH .
docker run --cap-add=SYS_ADMIN mangaloyalty/mangaloyalty:$TRAVIS_CPU_ARCH node server --verify-browser
docker push mangaloyalty/mangaloyalty:$TRAVIS_CPU_ARCH

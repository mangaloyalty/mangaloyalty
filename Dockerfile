FROM node:12-alpine
RUN addgroup -S mluser && adduser -S -g mluser mluser
RUN apk add --no-cache ca-certificates chromium freetype freetype-dev harfbuzz nss ttf-freefont
ENV ML_PUPPETEER_EXECUTABLEPATH=/usr/bin/chromium-browser
ENV ML_PUPPETEER_USERDATADIR=/home/mluser/chromium

WORKDIR /usr/src/mangaloyalty
COPY package.json package-lock.json server.js ./
RUN npm ci --production

EXPOSE 7783
USER mluser
CMD ["node", "."]

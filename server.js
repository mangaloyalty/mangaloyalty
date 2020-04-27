const express = require('express');
const http = require('http');

// Initialize the browser verification.
if (process.argv.some((arg) => arg === '--verify-browser')) {
  return require('mangaloyalty-server/dist/core').core.browser.pageAsync(() => {})
    .then(() => process.exit(0))
    .catch(err => console.error(err) || process.exit(1));
}

// Initialize the server router.
const serverApp = express();
const server = http.createServer(serverApp);
mangaloyaltyServer.attachSocket(server);

// Initialize the server.
serverApp.disable('x-powered-by');
serverApp.use(require('mangaloyalty-client').router);
serverApp.use(require('mangaloyalty-server').router);
server.listen(7783, () => console.log(`Running on http://localhost:7783/`));

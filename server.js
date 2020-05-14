const cl = require('mangaloyalty-client/server');
const express = require('express');
const http = require('http');
const sv = require('mangaloyalty-server/server');

// Initialize the browser verification.
if (process.argv.some((arg) => arg === '--verify-browser')) {
  return require('mangaloyalty-server/dist/core').core.browser.pageAsync(() => {})
    .then(() => process.exit(0))
    .catch(err => console.error(err) || process.exit(1));
}

// Initialize the server router.
sv.routerAsync().then((serverRouter) => {
  const serverApp = express();
  const server = http.createServer(serverApp);
  sv.attachSocket(server);

  // Initialize the server.
  serverApp.disable('x-powered-by');
  serverApp.use(cl.router);
  serverApp.use(serverRouter);
  server.listen(7783, () => console.log(`Running on http://localhost:7783/`));
});

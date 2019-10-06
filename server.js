const express = require('express');
const http = require('http');
const mangaloyaltyClient = require('mangaloyalty-client');
const mangaloyaltyServer = require('mangaloyalty-server');

// Initialize the server router.
const serverApp = express();
const server = http.createServer(serverApp);
mangaloyaltyServer.attachSocket(server);

// Initialize the server.
serverApp.disable('x-powered-by');
serverApp.use(mangaloyaltyClient.router);
serverApp.use(mangaloyaltyServer.router);
server.listen(7783, () => console.log(`Running on http://localhost:7783/`));

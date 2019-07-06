const http = require('http');
const server = require('express')();

// Initialize the server.
server.disable('x-powered-by');
server.use(require('mangaloyalty-client'));
server.use(require('mangaloyalty-server'));

// Initialize the server sockets.
const p1 = new Promise((resolve) => http.createServer(server).listen(7767, resolve));
const p2 = new Promise((resolve) => http.createServer(server).listen(7783, resolve))
Promise.all([p1, p2]).then(() => console.log('Running on http://localhost:7783/'));

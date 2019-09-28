const express = require('express');
const server = express();
server.disable('x-powered-by');
server.use(require('mangaloyalty-client'));
server.use(require('mangaloyalty-server'));
server.listen(7783, () => console.log(`Running on http://localhost:7783/`));

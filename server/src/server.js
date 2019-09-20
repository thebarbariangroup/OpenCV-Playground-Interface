"use strict";
process.title = 'OpenCV-Playground';

const fs    = require('fs');
const path  = require('path');
const https = require('https');

const app = require('./app');
const WebsocketController = require('./websocket/websocketController');

const WSS_PORT = 8443;
const HTTPS_OPTIONS = {
  key: fs.readFileSync(path.resolve(__dirname, '../keys/client-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../keys/client-cert.pem')),
}

const httpsServer = https.createServer(HTTPS_OPTIONS, app);

httpsServer.listen(WSS_PORT, () => {
  console.log((new Date()) + " Server is listening on port " + WSS_PORT);
});

const websocketController = new WebsocketController({
  httpServer: httpsServer,
});

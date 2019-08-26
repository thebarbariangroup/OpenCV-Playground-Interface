"use strict";
process.title = 'node-chat';
const http = require('http');
const WebsocketController = require('./websocket/websocketController');
const webSocketServerPort = 1337;


const httpServer = http.createServer(function(request, response) {});

httpServer.listen(webSocketServerPort, function() {
  console.log((new Date()) + " Server is listening on port " + webSocketServerPort);
});

const websocketController = new WebsocketController({
  httpServer: httpServer,
});

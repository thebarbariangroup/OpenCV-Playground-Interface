const websocket = require('websocket');
const WebsocketServer = websocket.server;

module.exports = class WebsocketController {

  constructor (conf) {
    this.websocketServer = new WebsocketServer({
      httpServer: conf.httpServer,
    });
    this.clients = [];
    this.history = [];
    this.nextId = 0;

    this._setupEventHandlers();
  }

  _setupEventHandlers () {
    this._onRequest = this._onRequest.bind(this);
    this.websocketServer.on('request', this._onRequest);
  }

  _onRequest (request) {
    console.log(new Date() + ` Connection from origin ${request.origin}`);

    const connection = request.accept(null, request.origin); // TODO: Check origin
    const client = {
      connection,
      id: this.nextId++,
      type: null, // e.g. renderer vs controls
    };

    console.log(new Date() + ' Accepted connection: ID = ' + client.id);
    this.clients.push(client);

    // send back message history
    if (this.history.length > 0) {
      connection.sendUTF(JSON.stringify({ action: 'HISTORY', payload: this.history }));
    }

    connection.on('message', this._onMessage.bind(this, client));
    connection.on('close', this._onClose.bind(this, client));
  }

  _onMessage (client, message) {
    if (message.type === 'utf8') {
      console.log(new Date() + ` Received Message from ${client.id}: ${message.utf8Data}`);

      // we want to keep history of all sent messages
      const messageData = this._safeJsonParse(message.utf8Data);

      this.history.push(messageData);
      this.history = this.history.slice(-100);

      this._broadcast(messageData)
    }
  }

  _onClose (client, connection) {
    // connection.remoteAddress
    console.log(new Date() + ` Disconnected: ${client.id}`);
    this.clients = this.clients.filter(item => item.id !== client.id);
  }

  _broadcast (messageData) {
    const message = JSON.stringify(messageData);

    for (let i = 0, len = this.clients.length; i < len; i++) {
      console.log(new Date() + ` - Sent Message to ${this.clients[i].id}: ${message}`);
      this.clients[i].connection.sendUTF(message);
    }
  }

  _safeJsonParse (string) {
    let json;
    try {
      json = JSON.parse(string);
    } catch (e) {
      console.log('invalid JSON: ', string);
      return;
    }
    return json;
  }

}
const websocket = require('websocket');
const WebsocketServer = websocket.server;

module.exports = class WebsocketController {

  constructor (conf) {
    this.websocketServer = new WebsocketServer({
      httpServer: conf.httpServer,
    });
    this.clients = [];
    this.history = [];

    this._setupEventHandlers();
  }

  _setupEventHandlers () {
    this._onRequest = this._onRequest.bind(this);
    this.websocketServer.on('request', this._onRequest);
  }

  _onRequest (request) {
    console.log(new Date() + ` Connection from origin ${request.origin}.`);

    const connection = request.accept(null, request.origin); // TODO: Check origin
    const client = {
      connection,
      id: null,
      userName: null,
      type: null,
    };
    const id = this.clients.push(client) - 1;
    this.clients[id].id = id;
    this.clients[id].userName = `id_${id}`;

    console.log(new Date() + ' Connection accepted.');
    // send back chat history
    if (this.history.length > 0) {
      connection.sendUTF(JSON.stringify({ type: 'history', payload: this.history }));
    }

    connection.on('message', this._onMessage.bind(this, client));
    connection.on('close', this._onClose.bind(this, client));
  }

  _onMessage (client, message) {
    if (message.type === 'utf8') {
      console.log(new Date() + ` Received Message from ${client.userName}: ${message.utf8Data}`);

      // we want to keep history of all sent messages
      const obj = {
        time: (new Date()).getTime(),
        text: this._safeJsonParse(message.utf8Data).payload.text,
        author: client.userName,
      };
      this.history.push(obj);
      this.history = this.history.slice(-100);

      const newMessage = JSON.stringify({ action: 'message', payload: obj });

      for (let i = 0, len = this.clients.length; i < len; i++) {
        console.log(new Date() + ` Sent Message to ${this.clients[i].userName}: ${newMessage}`);
        this.clients[i].connection.sendUTF(newMessage);
      }
    }
  }

  _onClose (client, connection) {
    if (client.userName !== false) {
      console.log(new Date() + ` Peer ${connection.remoteAddress} disconnected.`);
      this.clients.filter(item => item.id !== client.id);
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
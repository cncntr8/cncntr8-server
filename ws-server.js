var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;

var WS = function(options) {
  var self = this;
  self.port = options.port || 8080;
  self.users = options.users || {};
  self.server = new WebSocketServer({
    port: self.port
  });
  self.logConnections = options.logConnections || false;
  console.log('WebSocket server opened on port ' + self.port);
  
  self.server.on('connection', function(client) {
    if (self.logConnections) {
      console.log('WebSocket client connected');
    };
    client.send({type: 'users', users: self.users});
  })
  
  self.server.on('error', function(err) {
    console.error('WebSocket server error: ' + err)
  })
};

WS.prototype.broadcast = function(data) {
  var self = this;
  self.server.clients.forEach(function(client) {
    
    // this is an extra layer of protection in case the connection is closed between the initialization of the forEach and the evaluation of this section
    if (client.readyState == WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

module.exports = WS;
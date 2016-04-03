var _ = require('underscore'),
  osc = require('node-osc'),
  EventEmitter = require('events').EventEmitter;

var ServerManager = function() {
  var self = this;
  
  self.servers = [];
  
  self.server = new osc.Server(self.port, '0.0.0.0');
  console.log('OSC server now listening on port ' + port);
  
  self.server.on('message', function(msg) {
    switch (msg[0]) {
      case '/muse/elements/experimental/concentration':
        console.log('concentration: ' + msg[1]);
        self.emit('concentration', [
          
        ])
        break;
      case '/muse/elements/experimental/mellow':
        console.log('mellow: ' + msg[1]);
        break;
      default:
        // nothing
    }
  });
}

ServerManager.prototype.create = function(users) {
  _.each(users, function(user) {
    var server = new osc.Server(user.port, '0.0.0.0');
    server.on('message', function(msg) {
        switch (msg[0]) {
          case '/muse/elements/experimental/concentration':
            console.log('concentration: ' + msg[1]);
            self.emit('concentration', [
          
            ])
            break;
          case '/muse/elements/experimental/mellow':
            console.log('mellow: ' + msg[1]);
            break;
          default:
            // nothing
        }
      });
  });
}

var port = 5000;
var oscServer = new osc.Server(port, '0.0.0.0');

oscServer.on('message', function(msg) {
  
});

util.inherits(oscServer, EventEmitter);
var _ = require('underscore'),
  osc = require('node-osc'),
  util = require('util'),
  EventEmitter = require('events').EventEmitter;

var ServerManager = function() {
  var self = this;

  self.servers = [];
}

util.inherits(ServerManager, EventEmitter);

ServerManager.prototype.create = function(users) {
  var self = this;

  _.each(users, function(user) {
    var server = new osc.Server(user.port, '0.0.0.0');
    server.on('message', function(msg) {
      switch (msg[0]) {
        case '/muse/elements/experimental/concentration':
          self.emit('data', {user: user, type: 'concentration', value: msg[1]});
          break;
        case '/muse/elements/experimental/mellow':
          self.emit('data', {user: user, type: 'mellowness', value: msg[1]});
          break;
        default:
          // nothing
      }
    });
    self.servers.push(server);
  });
}

module.exports = ServerManager;
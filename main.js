var ServerManager = require('./osc-servermanager.js');
var WSServer = require('./ws-server.js');

var users = require('./users.json').users;

var manager = new ServerManager({
  users: users,
  onCreate: function(count) {
    console.log('OSC servers created for ' + count + ' user(s)!')
  }
});

var ws = new WSServer({
  port: 8080,
  users: users
});

manager.on('data', function(packet) {
  ws.broadcast(packet);
  console.log(packet);
});

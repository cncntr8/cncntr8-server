var ServerManager = require('./osc-servermanager.js');
var WSServer = require('./ws-server.js');

var users = require('./users.json').users;

var manager = new ServerManager();
var ws = new WSServer({
  port: 8080
});

manager.create(users);
console.log('Servers created for ' + users.length + ' user(s)!')

manager.on('data', function(packet) {
  ws.broadcast(packet);
  console.log(packet);
});

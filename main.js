var ServerManager = require('./osc-servermanager.js'),
  WSServer = require('./ws-server.js'),
  math = require('mathjs'),
  _ = require('underscore'),
  config = require('./config.json'),
  users = config.users,
  useMean = config.hasOwnProperty('useMean') ? config.useMean : true,
  meanWindow = config.meanWindow || 1,
  dataQueue = _.mapObject(_.object(_.pluck(users, 'username'), []), function() {
    return {
      concentration: [],
      mellowness: []
    };
  });

var manager = new ServerManager({
  users: users,
  onCreate: function(count) {
    console.log('OSC servers created for ' + count + ' user(s)!')
  }
});

var ws = new WSServer({
  port: 8080,
  users: users,
  className: config.className,
  logConnections: true
});

manager.on('data', function(packet) {
  if (useMean) {
    var meanData = 0;

    dataQueue[packet.user.username][packet.type].push(packet.value);

    if (dataQueue[packet.user.username][packet.type].length >= meanWindow * 10) {
      var newPacket = packet;
      newPacket.value = math.mean(dataQueue[packet.user.username][packet.type]);
      ws.broadcast(newPacket);

      dataQueue[packet.user.username][packet.type] = [];
    }
  } else {
    ws.broadcast(packet);
  }
});

var ServerManager = require('./osc-servermanager.js'),
    WSServer = require('./ws-server.js'),
    math = require('mathjs'),

    dataQueue = {};

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

/*

    dataQueue = {
        johns: {
            concentration: [],
            mellowness: []
        }
    }

*/

manager.on('data', function(packet) {
    var meanData = 0;

    dataQueue[packet.user.username][packet.type].push(packet.value);

    if (dataQueue[packet.user.username][packet.type].length >= 100){
        var newPacket = packet;
        newPacket.value = math.mean(dataQueue[packet.user.username][packet.type]);
        ws.broadcast(newPacket);
        console.log ("The mean value for " + newPacket.user.username + "'s value of " + newPacket.type + " is " + newPacket.value);

        dataQueue[packet.user.username][packet.type] = [];
    }

});

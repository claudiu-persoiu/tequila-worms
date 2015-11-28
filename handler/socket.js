var wormCollection = require('../model/wormCollection')();
var modelWorm = require('../model/worm');

module.exports = function (server) {

    var io = require('socket.io')(server);

    io.on('connection', function(client) {

        console.log('a user connected');

        client.on('start game', function (name) {
            wormCollection.addWorm(client.id, new modelWorm(name));
            console.log(name + ' just started');
            io.emit('player list', wormCollection.getData());
        });

        client.on('disconnect', function () {
            if (wormCollection.removeWorm(client.id)) {
                io.emit('player list', wormCollection.getData());
            }

            console.log('a user disconnected');
        });
    });
};
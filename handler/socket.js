var wormCollection = require('../model/wormCollection')();
var modelWorm = require('../model/worm');

var io = null,
    matrix_size = {
    x: 56,
    y: 42
};

var connectionHandler = function (client) {

    console.log('a user connected');
    emitPlayerList();
    // matrix dimensions
    io.emit('matrix size', matrix_size);

    client.on('start game', function (name) {
        wormCollection.addWorm(client.id, modelWorm(name));
        emitPlayerList();
    });

    client.on('disconnect', function () {
        if (wormCollection.removeWorm(client.id)) {
            emitPlayerList();
        }
        console.log('a user disconnected');
    });
};

setInterval(function () {
    //console.log('emit matrix');
    //io.emit('matrix', matrix.getMatrix());
}, 1000);

var emitPlayerList = function () {
    console.log('emit player list');
    io.emit('player list', wormCollection.getData());
};

module.exports = function (server) {
    io = require('socket.io')(server);
    io.on('connection', connectionHandler);
};
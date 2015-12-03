
var tableSize = {
        x: 80,
        y: 55
    },
    wormCollection = require('./wormCollection')(tableSize),
    modelWorm = require('./worm'),
    randomDeadMessage = require('./dead-message'),
    io = null,
    connections = {},
    collision = require('./collision');

var connectionHandler = function (client) {

    connections[client.id] = client;

    console.log('a user connected');
    emitPlayerList();

    io.emit('matrix size', wormCollection.getSize());

    client.on('start game', function (name) {
        wormCollection.addWorm(client.id, modelWorm(client.id, name, wormCollection.getRandomPosition()));
        emitPlayerList();
    });

    client.on('disconnect', function () {
        if (wormCollection.removeWorm(client.id)) {
            emitPlayerList();
        }
        console.log('a user disconnected');
        delete connections[client.id];
    });

    client.on('new direction', function(direction) {
        var worm = wormCollection.getWorm(client.id);
        worm.setDirection(direction);
    })
};

setInterval(function () {
    new Promise(function (resolve, error) {

        var worms = wormCollection.getWorms();

        if (worms.length) {
            resolve(worms);
        }
    }).then(function (worms) {

        worms.forEach(function (worm) {

            worm.step();

            if (collision.checkHitTheWall(worm.getHead(), tableSize)
                || collision.checkHitItself(worm)) {
                worm.kill();

                return;
            }

            collision.intersectWormsWithOthers(worm, worms);
        });

        return worms;
    }).then(filterDeadWorms).then(exportWormsData);
}, 500);


var filterDeadWorms = function (worms) {
    worms = worms.filter(function (worm) {
        if (worm.isDead()) {
            wormCollection.removeWorm(worm.id);
            io.emit('dead worm',  worm.name + randomDeadMessage());

            connections[worm.id].emit('you dead', true);
            return false;
        }
        return true;
    });

    return worms;
};

var exportWormsData = function (worms) {
    var wormsData = worms.map(function (worm) {
        return worm.getData();
    });

    emitPlayerList();
    io.emit('worm data', wormsData);
};

var emitPlayerList = function () {
    console.log('emit player list');
    io.emit('player list', wormCollection.getWormsData());
};

module.exports = function (server) {
    io = require('socket.io')(server);
    io.on('connection', connectionHandler);
};

var tableSize = {
        x: 56,
        y: 42
    },
    wormCollection = require('../model/wormCollection')(tableSize),
    modelWorm = require('../model/worm'),
    randomDeadMessage = require('../model/dead-message'),
    io = null,
    headIndex = 0,
    connections = {};

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
        resolve(wormCollection.getWorms());
    }).then(function (worms) {

        worms.forEach(function (worm) {

            worm.step();

            // check hit the wall
            if (checkHitTheWall(worm.getHead(), tableSize)
                || checkHitItself(worm)) {
                worm.setDead();

                return;
            }

            worm.getPieces().every(function (piece, index) {
                return worms.every(function (otherWorm) {
                    if (worm === otherWorm || otherWorm.isDead()) {
                        return true;
                    }

                    if (wormIntersectWithPiece(otherWorm, piece)) {
                        if (index == headIndex) {

                            var wormPiecesLength = worm.getPieces().length,
                                otherWormPiecesLength = otherWorm.getPieces().length;

                            if (wormPiecesLength == otherWormPiecesLength) {
                                worm.setDead();
                                otherWorm.setDead();
                            } else if (wormPiecesLength < otherWormPiecesLength) {
                                worm.setDead();
                                otherWorm.addPieces(wormPiecesLength);
                            } else {
                                otherWorm.setDead();
                                worm.addPieces(otherWormPiecesLength);
                            }

                            return false;
                        }

                        otherWorm.addPieces(worm.getPieces().length - index);
                        worm.removePieces(index);

                        return false;
                    }

                    return true;
                });
            });
        });

        return worms;
    }).then(function (worms) {
        worms = worms.filter(function (worm) {
            if (worm.isDead()) {
                wormCollection.removeWorm(worm.id);
                io.emit('dead worm', worm.name + ' ' + randomDeadMessage());

                var client = connections[worm.id];
                client.emit('you dead', true);

                return false;
            }

            return true;
        });

        return worms;
    }).then(function (worms) {
        worms = worms.map(function (worm) {
            return worm.getData();
        });

        emitPlayerList();
        io.emit('worm data', worms);
    });
}, 1000);

var wormIntersectWithPiece = function (worm, piece) {
    var head = worm.getHead();

    return piece.x == head.x && piece.y == head.y;
};

var emitPlayerList = function () {
    console.log('emit player list');
    io.emit('player list', wormCollection.getWormsData());
};

var checkHitTheWall = function (head, table) {
    return head.x < -1 || head.y < -1 || head.x >= table.x - 1 || head.y >= table.y - 1;
};

var checkHitItself = function (worm) {
    var pieces = worm.getPieces().slice(0);
    var head = pieces.shift();

    return !pieces.every(function (piece) {
        return !((head.x == piece.x) && (head.y == piece.y));
    });
};

module.exports = function (server) {
    io = require('socket.io')(server);
    io.on('connection', connectionHandler);
};
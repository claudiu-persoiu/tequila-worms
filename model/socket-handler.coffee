tableSize =
    x: 80
    y: 55
wormCollection = require('./worm-collection') tableSize
modelWorm = require './worm'
randomDeadMessage = require './dead-message'
io = null
connections = {}
collision = require './collision'

connectionHandler = (client) =>
    connections[client.id] = client

    console.log 'a user connected'
    emitPlayerList()

    io.emit 'matrix size', wormCollection.getSize()

    client.on('start game', (name) =>
        wormCollection.addWorm(client.id, modelWorm(client.id, name, wormCollection.getRandomPosition()))
        emitPlayerList()
    )

    client.on('disconnect', () =>
        if (wormCollection.removeWorm(client.id))
            emitPlayerList();

        console.log 'a user disconnected'
        delete connections[client.id]
    )

    client.on('new direction', (direction) =>
        wormCollection.getWorm(client.id).setDirection(direction)
    )

setInterval(() =>
    new Promise((resolve) =>
        worms = wormCollection.getWorms()

        if worms.length
            resolve worms
    ).then((worms) =>
        worms.forEach((worm) =>
            worm.step()

            if collision.checkHitTheWall(worm.getHead(), tableSize) or collision.checkHitItself(worm)
                worm.kill()
                return

            collision.intersectWormsWithOthers(worm, worms)
        )

        worms
    ).then(filterDeadWorms).then(exportWormsData)
, 500)


filterDeadWorms = (worms) =>
    originalLength = worms.length

    worms = worms.filter((worm) =>
        if worm.isDead()
            wormCollection.removeWorm(worm.getId())
            io.emit('dead worm', worm.getName() + randomDeadMessage())
            connections[worm.getId()].emit('you dead', true)
            return false

        true
    )

    if originalLength > worms.length
        emitPlayerList()

    worms

exportWormsData = (worms) =>
    io.emit('worm data', (worm.getData() for worm in worms))

emitPlayerList = ->
    io.emit('player list', wormCollection.getWormsList())

module.exports = (server) ->
    io = require('socket.io')(server)
    io.on('connection', connectionHandler)

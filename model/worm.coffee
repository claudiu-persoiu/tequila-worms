direction = require './direction'
generateColor = require './generate-color'

module.exports = (id, name, position) =>
    generateElements = (number, position) =>
        Array.apply(null, Array(number)).map(Object.prototype.valueOf, position)

    _id = id
    _name = name
    _color = generateColor()
    _direction = direction.getRandom()
    MIN_LENGTH = 3
    _length = 7
    _pieces = generateElements(_length, position)
    _dead = false

    ret =
        getId: =>
            _id

        getName: =>
            _name

        getColor: =>
            _color

        getHead: =>
            _pieces[0]

        getPieces: =>
            _pieces

        getData: =>
            ret =
                name: _name
                color: _color
                pieces: _pieces

        setDirection: (newDirection) =>
            if direction.isValidDirection(newDirection) and !direction.isReverse(_direction, newDirection)
                _direction = newDirection

            this

        kill: =>
            _dead = true

        isDead: =>
            _dead

        addPieces: (number, position) =>
            if position is undefined
                position = _pieces[_pieces.length - 1]

            Array.prototype.push.apply(_pieces, generateElements(number, position))

        removePieces: (number) =>
            _pieces = _pieces.slice(0, number - 1)

            if _pieces.length < MIN_LENGTH
                _dead = true

        step: =>
            movementMatrix = direction.getMovementByDirection(_direction)

            _pieces.unshift({
                x: _pieces[0].x + movementMatrix.x,
                y: _pieces[0].y + movementMatrix.y
            });

            _pieces.pop()

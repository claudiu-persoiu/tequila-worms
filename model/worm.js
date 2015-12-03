var direction = require('./direction'),
    generateColor = require('./generate-color');

module.exports = function (id, name, position) {

    var generateElements = function (number, position) {
        return Array.apply(null, Array(number)).map(Object.prototype.valueOf, position);
    };

    var _id = id,
        _name = name,
        _color = generateColor(),
        _direction = direction.getRandom(),
        MIN_LENGTH = 3,
        _length = 7,
        _pieces = generateElements(_length, position),
        _dead = false;

    return {
        get name() {
            return _name;
        },
        get id() {
            return _id;
        },
        getData: function () {
            return {
                name: _name,
                color: _color,
                pieces: _pieces
            }
        },
        getPieces: function () {
            return _pieces;
        },
        getHead: function () {
            return _pieces[0];
        },
        setDirection: function (newDirection) {
            if (direction.isValidDirection(newDirection)
                && !direction.isReverse(_direction, newDirection)) {
                _direction = newDirection;
            }

        },
        kill: function () {
            _dead = true
        },
        isDead: function () {
            return _dead;
        },
        addPieces: function (number, position) {
            if (position === undefined) {
                position = _pieces[_pieces.length - 1];
            }

            Array.prototype.push.apply(_pieces, generateElements(number, position));
        },
        removePieces: function (number) {
            _pieces = _pieces.slice(0, number - 1);

            if (_pieces.length < MIN_LENGTH) {
                _dead = true;
            }
        },
        step: function () {
            var movementMatrix = direction.getMovementByDirection(_direction);
            _pieces.unshift({
                x: _pieces[0].x + movementMatrix.x,
                y: _pieces[0].y + movementMatrix.y
            });

            _pieces.pop();
        }
    };
};
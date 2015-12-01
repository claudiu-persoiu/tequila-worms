var directions = {
    left: {
        x: -1, y: 0
    },
    right: {
        x: 1, y: 0
    },
    up: {
        x: 0, y: 1
    },
    down: {
        x: 0, y: -1
    }
};

var getRandom = function () {
    var keys = Object.keys(directions);
    return keys[Math.floor(Math.random() * keys.length)];
};

module.exports = {
    getRandom: getRandom,
    getMovementByDirection: function (direction) {
        return directions[direction];
    },
    isValidDirection: function (direction) {
        return directions.hasOwnProperty(direction);
    },
    isReverse: function (oldDirection, newDirection) {
        return ((directions[oldDirection].x + directions[newDirection].x) == 0
            && (directions[oldDirection].y + directions[newDirection].y) == 0);
    }
};
module.exports = function (size) {

    var _worms = {},
        _size = size;

    var getRandomWithBezel = function (max, bezel) {
        return Math.floor(Math.random() * (max - (bezel * 2)) + bezel);
    };

    return {
        addWorm: function (id, worm) {
            _worms[id] = worm;
        },
        getWorm: function (id) {
            return _worms[id];
        },
        removeWorm: function (id) {
            if (_worms.hasOwnProperty(id)) {
                delete _worms[id];
                return true;
            }
        },
        getWorms: function () {
            return Object.keys(_worms).map(function (index) {
                return _worms[index];
            });
        },
        getWormsList: function () {
            return Object.keys(_worms).map(function (index) {
                var worm = _worms[index];

                return {
                    name: worm.name,
                    color: worm.color
                };
            });
        },
        getSize: function () {
            return _size;
        },
        getRandomPosition: function () {
            return {
                x: getRandomWithBezel(_size.x, 2),
                y: getRandomWithBezel(_size.y, 2)
            };
        }
    };
};
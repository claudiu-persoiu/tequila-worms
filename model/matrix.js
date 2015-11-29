
module.exports = function (params) {

    var _x = params.x,
        _y = params.y;

    var _matrix = Array.apply(null, Array(_x))
        .map(function () {
            return Array.apply(null, Array(_y)).map(Number.prototype.valueOf,0)
        });

    return {
        getMatrix: function () {
            return _matrix;
        }
    };
};
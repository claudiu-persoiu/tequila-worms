module.exports = function (name) {

    var generateColor = function () {
        return Math.round(Math.random() * parseInt('ffffff', 16))
            .toString(16);
    };

    var _name = name,
        _color = generateColor();

    return {
        get name () {
            return _name;
        },
        getData: function () {
            return {
                name: _name,
                color: _color
            }
        }
    };
};
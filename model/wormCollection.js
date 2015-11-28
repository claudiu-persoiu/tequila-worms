module.exports = function () {

    var worms = {};

    return {
        addWorm: function (id, worm) {
            worms[id] = worm;
        },
        getWorm: function (id) {
            return worms[id];
        },
        removeWorm: function (id) {
            if (worms.hasOwnProperty(id)) {
                delete worms[id];
                return true;
            }
        },
        getData: function () {
            return Object.keys(worms).map(function (wormId) {
                return worms[wormId].getData();
            });
        }
    };
};
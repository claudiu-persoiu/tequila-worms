module.exports = (size) =>
    _worms = {}
    _size = size

    getRandomWithBezel = (max, bezel) =>
        Math.floor(Math.random() * (max - (bezel * 2)) + bezel)

    ret =
        addWorm: (id, worm) =>
            _worms[id] = worm

        getWorm: (id) =>
            _worms[id]

        removeWorm: (id) =>
            if _worms.hasOwnProperty(id)
                delete _worms[id];
                return true

        getWorms: =>
            _worms[index] for index in Object.keys(_worms)

        getWormsList: =>

            Object.keys(_worms).map((index) =>
                worm = _worms[index]

                ret =
                    name: worm.getName()
                    color: worm.getColor()
            )

        getSize: =>
            _size

        getRandomPosition: =>
            x: getRandomWithBezel(_size.x, 2)
            y: getRandomWithBezel(_size.y, 2)

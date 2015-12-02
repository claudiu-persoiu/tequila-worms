var intersectWormsWithOthers = function (worm, worms) {

    worm.getPieces().every(function (piece, index) {
        return worms.every(function (otherWorm) {
            if (worm === otherWorm || otherWorm.isDead()) {
                return true;
            }

            if (wormIntersectWithPiece(otherWorm, piece)) {
                if (index == 0) {
                    headCrush(worm, otherWorm);
                } else {
                    otherWorm.addPieces(worm.getPieces().length - index);
                    worm.removePieces(index);
                }

                return false;
            }

            return true;
        });
    });
};

var headCrush = function (worm, otherWorm) {
    var wormPiecesLength = worm.getPieces().length,
        otherWormPiecesLength = otherWorm.getPieces().length;

    if (wormPiecesLength == otherWormPiecesLength) {
        worm.kill();
        otherWorm.kill();
    } else if (wormPiecesLength < otherWormPiecesLength) {
        worm.kill();
        otherWorm.addPieces(wormPiecesLength);
    } else {
        otherWorm.kill();
        worm.addPieces(otherWormPiecesLength);
    }
};

var wormIntersectWithPiece = function (worm, piece) {
    var head = worm.getHead();
    return piece.x == head.x && piece.y == head.y;
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

module.exports = {
    checkHitItself: checkHitItself,
    checkHitTheWall: checkHitTheWall,
    wormIntersectWithPiece: wormIntersectWithPiece,
    headCrush: headCrush,
    intersectWormsWithOthers: intersectWormsWithOthers
};
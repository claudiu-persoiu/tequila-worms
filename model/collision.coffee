intersectWormsWithOthers = (worm, worms) =>
    worm.getPieces().every (piece, index) =>
        return worms.every (otherWorm) =>
            if worm is otherWorm or otherWorm.isDead()
                return true

            if wormIntersectWithPiece(otherWorm, piece)
                if index == 0
                    headCrush(worm, otherWorm)
                else
                    otherWorm.addPieces(worm.getPieces().length - index)
                    worm.removePieces index

                return false
            true

headCrush = (worm, otherWorm) =>
    wormPiecesLength = worm.getPieces().length
    otherWormPiecesLength = otherWorm.getPieces().length

    if wormPiecesLength is otherWormPiecesLength
        worm.kill()
        otherWorm.kill()
    else if wormPiecesLength < otherWormPiecesLength
        worm.kill()
        otherWorm.addPieces(wormPiecesLength)
    else
        otherWorm.kill()
        worm.addPieces(otherWormPiecesLength)

wormIntersectWithPiece = (worm, piece) =>
    head = worm.getHead()
    piece.x is head.x and piece.y is head.y

checkHitTheWall = (head, table) =>
    head.x <= -1 || head.y <= -1 || head.x >= table.x || head.y >= table.y

checkHitItself = (worm) =>
    pieces = worm.getPieces().slice(0);
    head = pieces.shift();

    !pieces.every((piece) =>
        !((head.x == piece.x) && (head.y == piece.y))
    )

module.exports =
    checkHitItself: checkHitItself
    checkHitTheWall: checkHitTheWall
    wormIntersectWithPiece: wormIntersectWithPiece
    headCrush: headCrush
    intersectWormsWithOthers: intersectWormsWithOthers


intersectWormsWithOthers = (worm, worms) =>
    worm.getPieces().every (piece, index) =>
        return worms.every (otherWorm) =>
            if worm is otherWorm or otherWorm.isDead()
                return true

            if wormIntersectHeadWithPiece(otherWorm, piece)
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

piecesCollision = (piece1, piece2) ->
    piece1.x is piece2.x and piece1.y is piece2.y

wormIntersectHeadWithPiece = (worm, piece) =>
    head = worm.getHead()
    piecesCollision(head, piece)

checkHitTheWall = (head, table) =>
    head.x <= -1 || head.y <= -1 || head.x >= table.x || head.y >= table.y

checkHitItself = (worm) =>
    pieces = worm.getPieces().slice(0);
    head = pieces.shift();

    !pieces.every((piece) =>
        !piecesCollision(head, piece)
    )

module.exports =
    checkHitItself: checkHitItself
    checkHitTheWall: checkHitTheWall
    wormIntersectHeadWithPiece: wormIntersectHeadWithPiece
    headCrush: headCrush
    intersectWormsWithOthers: intersectWormsWithOthers


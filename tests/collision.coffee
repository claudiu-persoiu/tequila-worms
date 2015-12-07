assert = require 'assert'
expect = require('chai').expect
collision = require '../model/collision'
wormCreator = require '../model/worm'

describe('Collision', ->
    describe('checkHitItself', ->
        # headCrush(worm, otherWorm)

        # intersectWormsWithOthers(worm, worms)

        worm = wormCreator('test_id', 'test_name', {x: 1, y: 3})
        worm.setDirection 'up' # make sure right will not be in the opposite direction

        it('checkHitItself direction to right', ->
            worm.setDirection 'right'
            worm.step()
            expect(collision.checkHitItself(worm)).to.equal(false)
        )

        it('checkHitItself direction to down', ->
            worm.setDirection 'down'
            worm.step()
            expect(collision.checkHitItself(worm)).to.equal(false)
        )

        it('checkHitItself direction to left', ->
            worm.setDirection 'left'
            worm.step()
            expect(collision.checkHitItself(worm)).to.equal(false)
        )

        it('checkHitItself direction to up', ->
            worm.setDirection 'up'
            worm.step()
            expect(collision.checkHitItself(worm)).to.equal(true)
        )

        it('checkHitItself direction to right', ->
            worm.setDirection 'right'
            worm.step()
            expect(collision.checkHitItself(worm)).to.equal(true)
        )
    )

    describe('checkHitTheWall', ->
        it('check inside table', ->
            expect(collision.checkHitTheWall({x: 3, y: 3}, {x: 4, y: 4})).to.equal(false)
            expect(collision.checkHitTheWall({x: 0, y: 2}, {x: 4, y: 4})).to.equal(false)
            expect(collision.checkHitTheWall({x: 2, y: 0}, {x: 4, y: 4})).to.equal(false)
        )

        it('check outsite table', ->
            expect(collision.checkHitTheWall({x: 3, y: 3}, {x: 3, y: 3})).to.equal(true)
            expect(collision.checkHitTheWall({x: 3, y: 3}, {x: 1, y: 2})).to.equal(true)
            expect(collision.checkHitTheWall({x: -1, y: 2}, {x: 3, y: 3})).to.equal(true)
            expect(collision.checkHitTheWall({x: 2, y: -1}, {x: 1, y: 2})).to.equal(true)
        )
    )

    describe('wormIntersectHeadWithPiece', ->
        worm = wormCreator('test_id', 'test_name', {x: 1, y: 3})

        it('check all worm in one piece', ->
            expect(collision.wormIntersectHeadWithPiece(worm, {x: 2, y: 4})).to.equal(false)
            expect(collision.wormIntersectHeadWithPiece(worm, {x: 1, y: 4})).to.equal(false)
            expect(collision.wormIntersectHeadWithPiece(worm, {x: 1, y: 3})).to.equal(true)
        )

        it('check after step', ->
            worm.setDirection 'up'
            worm.setDirection 'right'
            worm.step()
            expect(collision.wormIntersectHeadWithPiece(worm, {x: 2, y: 3})).to.equal(true)
        )
    )
)

assert = require 'assert'
expect = require('chai').expect
direction = require '../model/direction'

describe('Direction manager', ->

    describe('getRandom', ->
        it('should return one of 4 directions', ->
            expect(direction.getRandom()).to.match(/^(left|right|up|down)$/)
            expect(direction.getRandom()).to.match(/^(left|right|up|down)$/)
            expect(direction.getRandom()).to.match(/^(left|right|up|down)$/)
            expect(direction.getRandom()).to.match(/^(left|right|up|down)$/)
            expect(direction.getRandom()).to.match(/^(left|right|up|down)$/)
        )
    )

    describe('getMovementByDirection', ->
        it('should return an object that has x, y and one of them is not 0', ->
            expect(direction.getMovementByDirection('')).to.be.a('undefined')
            expect(direction.getMovementByDirection('a')).to.be.a('undefined')
            expect(direction.getMovementByDirection('left')).to.contain.keys('x', 'y')
            expect(direction.getMovementByDirection('right')).to.contain.keys('x', 'y')
            expect(direction.getMovementByDirection('up')).to.contain.keys('x', 'y')
            expect(direction.getMovementByDirection('down')).to.contain.keys('x', 'y')
        )
    )

    describe('isValidDirection', ->
        it('should validate only the 4 directions', ->
            expect(direction.isValidDirection('left')).to.equal(true)
            expect(direction.isValidDirection('right')).to.equal(true)
            expect(direction.isValidDirection('up')).to.equal(true)
            expect(direction.isValidDirection('down')).to.equal(true)
            expect(direction.isValidDirection('')).to.equal(false)
            expect(direction.isValidDirection('other')).to.equal(false)
        )
    )

    describe('isReverse', ->
        it('should validate reverse direction', ->
            expect(direction.isReverse('left', 'right')).to.equal(true)
            expect(direction.isReverse('right', 'left')).to.equal(true)
            expect(direction.isReverse('up', 'down')).to.equal(true)
            expect(direction.isReverse('down', 'up')).to.equal(true)
            expect(direction.isReverse('left', 'up')).to.equal(false)
            expect(direction.isReverse('right', 'up')).to.equal(false)
            expect(direction.isReverse('left', 'down')).to.equal(false)
            expect(direction.isReverse('right', 'down')).to.equal(false)
        )
    )
)
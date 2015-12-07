assert = require('assert')
expect = require('chai').expect
wormCollectionCreator = require('../model/worm-collection')
wormCreator = require('../model/worm')

describe('Worm Collection', ->
    wormCollection = wormCollectionCreator(
        x: 10
        y: 12
    )

    describe('getRandomPosition', ->
        it('should be a valid table position', ->
            for i in [0...3]
                random = wormCollection.getRandomPosition()
                expect(random).to.have.property('x').that.is.within(2, 8)
                expect(random).to.have.property('y').that.is.within(2, 10)
        )
    )

    describe('getSize', ->
        it('size should equal initial size passed as parameter', ->
            expect(wormCollection.getSize()).to.eql({x: 10, y: 12})
        )
    )

    describe('add, get and remove worm', ->

        worm1 = wormCreator('id_test', 'name_test', {x: 1, y: 2})
        worm2 = wormCreator('id_test2', 'name_test2', {x: 1, y: 3})

        it('add worm', ->
            wormCollection.addWorm('id_test', worm1)
            wormCollection.addWorm('id_test2', worm2)
        )

        it('get worm', ->
            expect(wormCollection.getWorm('id_test')).to.equal(worm1)
            expect(wormCollection.getWorm('id_test2')).to.equal(worm2)
        )

        it('get worms list', ->
            wormlist = wormCollection.getWormsList()
            expect(wormlist).to.have.deep.property('[0].name', 'name_test')
            expect(wormlist).to.have.deep.property('[1].name', 'name_test2')
            expect(wormlist).to.have.deep.property('[0].color').and.length(7)
            expect(wormlist).to.have.deep.property('[1].color').and.length(7)
        )

        it('get worms', ->
            expect(wormCollection.getWorms()).to.eql([worm1, worm2])
        )

        it('remove worm', ->
            wormCollection.removeWorm('id_test')
        )

        it('get worms', ->
            expect(wormCollection.getWorms()).to.eql([worm2])
        )

        it('get worms list', ->
            wormlist = wormCollection.getWormsList()
            expect(wormlist).to.have.deep.property('[0].name', 'name_test2')
            expect(wormlist).to.have.deep.property('[0].color').and.length(7)
        )

        it('get invalid worm', ->
            expect(wormCollection.getWorm('id_test')).to.equal(undefined)
            expect(wormCollection.getWorm('id_test2')).to.equal(worm2)
        )
    )
)

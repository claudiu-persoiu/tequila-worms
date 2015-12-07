assert = require('assert')
expect = require('chai').expect
wormCreator = require('../model/worm')

describe('Worm', ->
    worm = wormCreator('id_test', 'name_test', {x: 5, y: 7})

    describe('valid data', ->
        it('should return id_test', ->
            expect(worm.getId()).to.equal('id_test')
        )

        it('should return name_test', ->
            expect(worm.getName()).to.equal('name_test')
        )

        it('should have head at initial possition x:5 and y: 7', ->
            head = worm.getHead()
            expect(head).to.have.property('x').and.equal(5)
            expect(head).to.have.property('y').and.equal(7)
        )

        it('oposite direction', ->
            worm.setDirection('up')
            worm.setDirection('right')
            worm.setDirection('left')
            worm.step()

            head = worm.getHead()
            expect(head).to.have.property('x').and.equal(6)
            expect(head).to.have.property('y').and.equal(7)
        )
        
    )
)

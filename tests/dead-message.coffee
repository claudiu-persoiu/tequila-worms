assert = require 'assert'
expect = require('chai').expect
messageGenerator = require '../model/dead-message'

describe('Dead message generator', ->


    describe('valid data', ->
        it('should always return a message', ->
            expect(messageGenerator()).to.have.length.above(3)
            expect(messageGenerator()).to.have.length.above(3)
            expect(messageGenerator()).to.have.length.above(3)
        )
    )
)
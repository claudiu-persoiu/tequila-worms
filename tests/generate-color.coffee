assert = require 'assert'
expect = require('chai').expect
colorGenerator = require '../model/generate-color'

describe('Color generator', ->

    describe('valid data', ->
        it('should always return a string of 7 chars', ->
            expect(colorGenerator()).to.have.length(7)
            expect(colorGenerator()).to.have.length(7)
            expect(colorGenerator()).to.have.length(7)
        )
    )
)
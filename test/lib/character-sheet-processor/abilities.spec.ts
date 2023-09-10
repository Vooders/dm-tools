import abilities from '../../../src/lib/character-sheet-processor/abilities'

describe('abilities', () => {
    it('should return true', () => {
        const result = abilities()
        result.should.equal(true)
    })
})

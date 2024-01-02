import ClassBuilder from "../../builders/ClassBuilder"
import * as hitDice from "../../../src/lib/character-sheet-processor/hitDice"

describe('hitDice', () => {
    for(let level = 1; level <= 20; level++) {
        it(`a level ${level} class should have ${level} hit dice`, () => {
            const characterClass = new ClassBuilder()
                .withLevel(level)
                .build()
    
            const characterHitDice = hitDice.calculate([characterClass])
    
            const numberOfHitDice = characterHitDice.reduce((total: number, hitDice: hitDice.HitDice) => {
                return total += hitDice.max
            }, 0)
    
            numberOfHitDice.should.equal(level)
        })
    }
})
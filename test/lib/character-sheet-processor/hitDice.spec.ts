import ClassBuilder from "../../builders/ClassBuilder"
import * as hitDice from "../../../src/lib/character-sheet-processor/hitDice"

describe('hitDice', () => {
    it('a level 1 character should have 1 hit dice', () => {
        const characterClass = new ClassBuilder()
            .withLevel(1)
            .build()

        const characterHitDice = hitDice.calculate([characterClass])

        const numberOfHitDice = characterHitDice.reduce((total: number, hitDice: hitDice.HitDice) => {
            return total += hitDice.max
        }, 0)

        numberOfHitDice.should.equal(1)
    })
})
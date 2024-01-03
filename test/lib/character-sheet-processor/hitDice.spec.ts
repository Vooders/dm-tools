import ClassBuilder from "../../builders/ClassBuilder"
import * as hitDice from "../../../src/lib/character-sheet-processor/hitDice"

describe('hitDice', () => {
    describe('max dice', () => {
        for (let level = 1; level <= 20; level++) {
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

    describe('dice type', () => {
        [6, 8, 10, 12].forEach((dice: 6 | 8 | 10 | 12) => {
            it(`should have dice d${dice} when class hit dice is ${dice}`, () => {
                const characterClass = new ClassBuilder()
                    .withHitDice(dice)
                    .build()

                const characterHitDice = hitDice.calculate([characterClass])

                const hitDiceType = characterHitDice[0].dice

                hitDiceType.should.equal(`d${dice}`)
            })
        })
    })

    it('hit dice used should be the correct number', () => {
        const characterClass = new ClassBuilder()
            .withHitDiceUsed(1)
            .build()

            const characterHitDice = hitDice.calculate([characterClass])

            const hitDiceUsed = characterHitDice[0].used

            hitDiceUsed.should.equal(1)
    })

    describe('Multi Class', () => {
        it('with the same die, combines them', () => {
            const firstClass = new ClassBuilder()
                    .withHitDice(6)
                    .build()
            const secondClass = new ClassBuilder()
                    .withHitDice(6)
                    .build()

            const characterHitDice = hitDice.calculate([firstClass, secondClass])

            characterHitDice.length.should.equal(1)
        })
    })
})
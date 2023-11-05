import AbilitiesBuilder from "../../builders/AbilitiesBuilder"
import skills from "../../../src/lib/character-sheet-processor/skills"

describe('Skills', () => {
    it('should return an array of length 18', () => {
        const abilities = new AbilitiesBuilder().build()

        const length = skills(abilities, [], [], [], 0).length
        length.should.equal(18)
    })

    const testArray = [
        { expected: 'DEX', args: 'Acrobatics' },
        { expected: 'WIS', args: 'Animal Handling' },
        { expected: 'INT', args: 'Arcana' },
        { expected: 'STR', args: 'Athletics' },
        { expected: 'CHA', args: 'Deception' },
        { expected: 'INT', args: 'History' },
        { expected: 'WIS', args: 'Insight' },
        { expected: 'CHA', args: 'Intimidation' },
        { expected: 'INT', args: 'Investigation' },
        { expected: 'WIS', args: 'Medicine' },
        { expected: 'INT', args: 'Nature' },
        { expected: 'WIS', args: 'Perception' },
        { expected: 'CHA', args: 'Performance' },
        { expected: 'CHA', args: 'Persuasion' },
        { expected: 'INT', args: 'Religion' },
        { expected: 'DEX', args: 'Sleight of Hand' },
        { expected: 'DEX', args: 'Stealth' },
        { expected: 'WIS', args: 'Survival' }
    ]

    testArray.forEach((test) => {
        it(`${test.args}'s modifier should be ${test.expected}`, () => {
            const abilities = new AbilitiesBuilder().build()

            const modifier = skills(abilities, [], [], [], 0).find(skill => skill.name === test.args).mod
            modifier.should.equal(test.expected)
        })
    })

})
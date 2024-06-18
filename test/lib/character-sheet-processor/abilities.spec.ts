import ModifierBuilder from '../../../test/builders/ModifierBuilder';
import abilities from '../../../src/lib/character-sheet-processor/abilities'

describe('abilities', () => {
    describe('names', () => {
        const nameTests = [
            { args: 0, expected: 'Strength' },
            { args: 1, expected: 'Dexterity' },
            { args: 2, expected: 'Constitution' },
            { args: 3, expected: 'Intelligence' },
            { args: 4, expected: 'Wisdom' },
            { args: 5, expected: 'Charisma' }
        ];

        nameTests.forEach((test) => {
            it(`Ability ${test.args + 1}'s name should be ${test.expected}`, function () {
                const stats = buildStats(10, 10, 10, 10, 10, 10)

                const theAbilities = abilities(stats, [])

                const name = theAbilities[test.args].name
                name.should.equal(test.expected)
            })
        })
    })

    describe('short names', () => {
        const shortNameTests = [
            { args: 0, expected: 'STR' },
            { args: 1, expected: 'DEX' },
            { args: 2, expected: 'CON' },
            { args: 3, expected: 'INT' },
            { args: 4, expected: 'WIS' },
            { args: 5, expected: 'CHA' }
        ];

        shortNameTests.forEach((test) => {
            it(`Ability ${test.args + 1}'s short name should be ${test.expected}`, function () {
                const stats = buildStats(10, 10, 10, 10, 10, 10)

                const theAbilities = abilities(stats, [])

                const shortName = theAbilities[test.args].shortName
                shortName.should.equal(test.expected)
            })
        })
    })

    describe('modifiers', () => {
        const modifiersTests = [
            { args: 1, expected: -5 },
            { args: 2, expected: -4 },
            { args: 3, expected: -4 },
            { args: 4, expected: -3 },
            { args: 5, expected: -3 },
            { args: 6, expected: -2 },
            { args: 7, expected: -2 },
            { args: 8, expected: -1 },
            { args: 9, expected: -1 },
            { args: 10, expected: 0 },
            { args: 11, expected: 0 },
            { args: 12, expected: 1 },
            { args: 13, expected: 1 },
            { args: 14, expected: 2 },
            { args: 15, expected: 2 },
            { args: 16, expected: 3 },
            { args: 17, expected: 3 },
            { args: 18, expected: 4 },
            { args: 19, expected: 4 },
            { args: 20, expected: 5 },
            { args: 21, expected: 5 },
            { args: 22, expected: 6 },
            { args: 23, expected: 6 },
            { args: 24, expected: 7 },
            { args: 25, expected: 7 },
            { args: 26, expected: 8 },
            { args: 27, expected: 8 },
            { args: 28, expected: 9 },
            { args: 29, expected: 9 },
            { args: 30, expected: 10 }
        ];

        modifiersTests.forEach((test) => {
            it(`a stat of ${test.args} should have a modifier of ${test.expected}`, function () {
                const stats = buildStats(test.args, 10, 10, 10, 10, 10)

                const theAbilities = abilities(stats, [])

                theAbilities[0].modifier.should.equal(test.expected)
            })
        })
    })

    describe('bonus modifiers', () => {
        it('should increase a stats value', () => {
            const stats = buildStats(10, 10, 10, 10, 10, 10)
            const plusTwoDex = new ModifierBuilder()
                .withType('bonus')
                .withEntityId(2)
                .withFixedValue(2)
                .build()

            const theAbilities = abilities(stats, [plusTwoDex])

            theAbilities[1].value.should.equal(12)
        })

        it('should increase a stats modifier', () => {
            const stats = buildStats(10, 10, 10, 10, 10, 10)
            const plusTwoDex = new ModifierBuilder()
                .withType('bonus')
                .withEntityId(2)
                .withFixedValue(2)
                .build()

            const theAbilities = abilities(stats, [plusTwoDex])

            theAbilities[1].modifier.should.equal(1)
        })
    })

    describe('set modifiers', () => {
        it('should set a stats value', () => {
            const stats = buildStats(10, 10, 10, 10, 10, 10)
            const modifier = new ModifierBuilder()
                .withType('set')
                .withEntityId(3)
                .withFixedValue(15)
                .build()

            const theAbilities = abilities(stats, [modifier])

            theAbilities[2].value.should.equal(15)
        })

        it('should increase a stats modifier', () => {
            const stats = buildStats(10, 10, 10, 10, 10, 10)
            const modifier = new ModifierBuilder()
                .withType('set')
                .withEntityId(5)
                .withFixedValue(16)
                .build()

            const theAbilities = abilities(stats, [modifier])

            theAbilities[4].modifier.should.equal(3)
        })
    })
})

function buildStats(...args: [number, number, number, number, number, number]) {
    return args.map((value: number, index: number) => {
        return {
            id: index + 1,
            name: "someName",
            value
        }
    })
}

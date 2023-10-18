import abilities from '../../../src/lib/character-sheet-processor/abilities'

const stats = buildStats()

describe('abilities', () => {
    // it('should give each ability a name', () => {
    //     const result = abilities(stats, modifiers)[0].name
    //     const result2 = abilities(stats, modifiers)[2].name
    //     const result3 = abilities(stats, modifiers)[4].name
    //     result.should.equal('Strength')
    //     result2.should.equal('Constitution')
    //     result3.should.equal('Wisdom')
    // })

    // it('should give each ability a value', () => {
    //     const stats = buildStats(0, 20, 0, 15, 0, 10)
    //     const result = abilities(stats, modifiers)[1].value
    //     const result2 = abilities(stats, modifiers)[3].value
    //     const result3 = abilities(stats, modifiers)[5].value
    //     result.should.equal(20)
    //     result2.should.equal(15)
    //     result3.should.equal(10)
    // })

    // it('should give each ability a short name', () => {
    //     const result = abilities(stats, modifiers)[0].shortName
    //     const result2 = abilities(stats, modifiers)[3].shortName
    //     const result3 = abilities(stats, modifiers)[4].shortName
    //     result.should.equal('STR')
    //     result2.should.equal('INT')
    //     result3.should.equal('WIS')
    // })

    // it('should add modifiers', () => {
    //     const modifiers = buildModifiers(null, null, 2, 2)
    //     const modifiers2 = buildModifiers(null, null, 1, 4)
    //     const modifiers3 = buildModifiers(null, null, 3, 6, null, null, 5, 1)
    //     const result = abilities(stats, modifiers)[1].value
    //     const result2 = abilities(stats, modifiers2)[3].value
    //     const result3 = abilities(stats, modifiers3)[0].value
    //     result.should.equal(12)
    //     result2.should.equal(11)
    //     result3.should.equal(15)
    // })
})

function buildStat(id: number = null, name: string = null, value: number = null) {
    return {
        id,
        name,
        value
    }
}

function buildStats(
    value1: number = 10,
    value2: number = 10,
    value3: number = 10,
    value4: number = 10,
    value5: number = 10,
    value6: number = 10) {
    return [
        buildStat(1, null, value1),
        buildStat(2, null, value2),
        buildStat(3, null, value3),
        buildStat(4, null, value4),
        buildStat(5, null, value5),
        buildStat(6, null, value6)
    ]
}

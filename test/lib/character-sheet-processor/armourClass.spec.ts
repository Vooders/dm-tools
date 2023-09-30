import { Ability } from '../../../src/lib/CharacterSheetProcessor'
import armourClass from '../../../src/lib/character-sheet-processor/armourClass'

describe('Armour Class', () => {
    it("should add dex modifier to 10", () => {
        const dex: Ability = buildAbility('Dexterity', 14)
        const ac = armourClass([dex])
        ac.should.equal(12)
    })

    it("should be lower than 10 with negative DEX mod", () => {
        const dex: Ability = buildAbility('Dexterity', 8)
        const ac = armourClass([dex])
        ac.should.equal(9)
    })
})

function buildAbility(name: string, value: number) {
    return {
        name: name,
        value,
        modifier: Math.floor((value - 10) / 2),
        shortName: name.slice(0, 3).toUpperCase()
    }
}

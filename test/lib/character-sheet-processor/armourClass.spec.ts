import { Ability } from '../../../src/lib/CharacterSheetProcessor'
import armourClass from '../../../src/lib/character-sheet-processor/armourClass'

describe('Armour Class', () => {
    it("should add dex modifier to 10", () => {
        const dex: Ability = buildAbility('Dexterity', 14)
        const profile = buildProfile('Paladin')
        const ac = armourClass([dex], profile)
        ac.should.equal(12)
    })

    it("should be lower than 10 with negative DEX mod", () => {
        const dex: Ability = buildAbility('Dexterity', 8)
        const profile = buildProfile('Paladin')
        const ac = armourClass([dex], profile)
        ac.should.equal(9)
    })

    it("should add dex and con modifiers to 10 if the class is Barbarian", () => {
        const dex: Ability = buildAbility('Dexterity', 14)
        const con: Ability = buildAbility('Constitution', 14)
        const profile = buildProfile('Barbarian')
        const ac = armourClass([dex, con], profile)
        ac.should.equal(14)
    })

    it("should add dex and wis modifiers to 10 if the class is Monk", () => {
        const dex: Ability = buildAbility('Dexterity', 16)
        const wis: Ability = buildAbility('Wisdom', 16)
        const profile = buildProfile('Monk')
        const ac = armourClass([dex, wis], profile)
        ac.should.equal(16)
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

function buildProfile(className: string) {
    return {
        name: '',
    race: '',
    level: 0,
    classes: className,
    background: '',
    alignment: '',
    appearance: {
        size: '',
        gender: '',
        faith: '',
        age: 0,
        hair: '',
        eyes: '',
        skin: '',
        height: '',
        weight: 0
    },
    xp: 0
    }
}

import { Ability, Modifier, Modifiers } from '../../../src/lib/CharacterSheetProcessor'
import armourClass from '../../../src/lib/character-sheet-processor/armourClass'

describe('Armour Class', () => {
    it("should add dex modifier to 10", () => {
        const abilities: Ability[] = buildAbilities(0, 14, 0, 0, 0, 0)
        const modifiers = buildModifiers()
        const ac = armourClass(abilities, modifiers)
        ac.should.equal(12)
    })

    it("should be lower than 10 with negative DEX mod", () => {
        const abilities: Ability[] = buildAbilities(0, 8, 0, 0, 0, 0)
        const modifiers = buildModifiers()
        const ac = armourClass(abilities, modifiers)
        ac.should.equal(9)
    })

    it("should add unarmored modifier and dex modifier to 10 if the class has an unarmored armor modifier", () => {
        const abilities: Ability[] = buildAbilities(0, 14, 14, 0, 0, 0)
        const modifiers = buildModifiers('unarmored-armor-class', 3)
        const ac = armourClass(abilities, modifiers)
        ac.should.equal(14)
        const abilities2: Ability[] = buildAbilities(0, 6, 0, 0, 14, 0)
        const modifiers2 = buildModifiers('unarmored-armor-class', 5)
        const ac2 = armourClass(abilities2, modifiers2)
        ac2.should.equal(10)
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

function buildAbilities(str: number, dex: number, con: number, int: number, wis: number, cha: number) {
    return [
        buildAbility('Strength', str),
        buildAbility('Dexterity', dex),
        buildAbility('Constitution', con),
        buildAbility('Intelligence', int),
        buildAbility('Wisdom', wis),
        buildAbility('Charisma', cha),
    ]
}




function buildModifiers(subType: string = '', statId: number = 0): Modifiers {

    const modifier: Modifier = {
        fixedValue: 0,
        id: 0,
        entityId: 0,
        entityTypeId: 0,
        type: '',
        subType,
        dice: null,
        restriction: '',
        statId,
        requiresAttunement: false,
        duration: null,
        friendlyTypeName: '',
        friendlySubtypeName: '',
        isGranted: true,
        bonusTypes: [],
        value: 0,
        availableToMulticlass: true,
        modifierTypeId: 0,
        modifierSubTypeId: 0,
        componentId: 0,
        componentTypeId: 0
    }
    return {
        race: [modifier],
        class: [modifier],
        background: [modifier],
        item: [modifier],
        feat: [modifier],
        condition: [modifier]
    }
}

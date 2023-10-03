import { Modifier } from '../../../src/lib/CharacterSheetProcessor'
import armourClass from '../../../src/lib/character-sheet-processor/armourClass'

describe('Armour Class', () => {
    it("should add dex modifier to 10", () => {
        const abilities = buildAbilities(0, 14, 0, 0, 0, 0)
        const modifiers = buildModifiers()
        const inventory = buildInventory()
        const ac = armourClass(abilities, modifiers, inventory)
        ac.should.equal(12)
    })

    it("should be lower than 10 with negative DEX mod", () => {
        const abilities = buildAbilities(0, 8, 0, 0, 0, 0)
        const modifiers = buildModifiers()
        const inventory = buildInventory()
        const ac = armourClass(abilities, modifiers, inventory)
        ac.should.equal(9)
    })

    it("should add unarmored modifier and dex modifier to 10 if the class has an unarmored armor modifier", () => {
        const abilities = buildAbilities(0, 14, 14, 0, 0, 0)
        const modifiers = buildModifiers('unarmored-armor-class', 3)
        const inventory = buildInventory()
        const ac = armourClass(abilities, modifiers, inventory)
        ac.should.equal(14)
        const abilities2 = buildAbilities(0, 6, 0, 0, 14, 0)
        const modifiers2 = buildModifiers('unarmored-armor-class', 5)
        const ac2 = armourClass(abilities2, modifiers2, inventory)
        ac2.should.equal(10)
    })

    it('should return the ac value for equipped armor', () => {
        const abilities = buildAbilities()
        const modifiers = buildModifiers()
        const inventory = buildInventory(15, 5)
        const ac = armourClass(abilities, modifiers, inventory)
        ac.should.equal(20)
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

function buildAbilities(
    str: number = 10,
    dex: number = 10,
    con: number = 10,
    int: number = 10,
    wis: number = 10,
    cha: number = 10) {
    return [
        buildAbility('Strength', str),
        buildAbility('Dexterity', dex),
        buildAbility('Constitution', con),
        buildAbility('Intelligence', int),
        buildAbility('Wisdom', wis),
        buildAbility('Charisma', cha),
    ]
}

function buildInventory(armor1: number = 0, armor2: number = 0) {
    return [{
        name: '',
        equipped: true,
        capacity: 0,
        contents: [
            buildItem('Armor', armor1),
            buildItem('Armor', armor2),
            buildItem('Weapon')
        ]
    }]
}

function buildItem(filterType: string = '', armorClass: number = 0) {
    return {
        id: 0,
        definition: {
            id: '',
            avatarUrl: '',
            name: '',
            weight: 0,
            rarity: '',
            filterType,
            isContainer: false,
            cost: 0,
            bundleSize: 1,
            description: '',
            notes: '',
            capacity: 0,
            armorClass,
            armorTypeId: 0

        },
        containerId: 0,
        equipped: true,
        quantity: 1
    }
}


function buildModifiers(subType: string = '', statId: number = 0) {

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

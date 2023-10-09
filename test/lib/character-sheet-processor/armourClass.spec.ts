import { Ability, Item, ItemContainer, Modifier } from '../../../src/lib/CharacterSheetProcessor'
import armourClass from '../../../src/lib/character-sheet-processor/armourClass'

const abilities = buildAbilities()
const inventory = buildInventory()
const modifiers = buildModifiers()

describe('Armour Class', () => {
    it("should add dex modifier to 10", () => {
        const abilities = buildAbilities(0, 14)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(12)
    })

    it("should be lower than 10 with negative DEX mod", () => {
        const abilities = buildAbilities(0, 8)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(9)
    })

    it("should add unarmored modifier if the class has an unarmored armor modifier", () => {
        const abilities = buildAbilities(0, 14, 14)
        const modifiers = buildModifiers('unarmored-armor-class', 3)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(14)
        const abilities2 = buildAbilities(0, 6, 0, 0, 14)
        const modifiers2 = buildModifiers('unarmored-armor-class', 5)
        const ac2 = armourClass(abilities2, inventory, modifiers2)
        ac2.should.equal(10)
    })

    it("should add armored modifier if the class has an armored armor modifier", () => {
        const abilities = buildAbilities(0, 14, 14)
        const inventory = buildInventory('Armor', 18, 3, 'Armor', 2)
        const modifiers = buildModifiers('armored-armor-class', 0, 1)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(21)
        const abilities2 = buildAbilities(0, 16, 0, 0, 14)
        const inventory2 = buildInventory('Armor', 16, 2, 'Armor', 1)
        const modifiers2 = buildModifiers('armored-armor-class', 0, 1, 'armored-armor-class', 0, 1)
        const ac2 = armourClass(abilities2, inventory2, modifiers2)
        ac2.should.equal(21)
    })

    it('should return the ac value for equipped armor', () => {
        const inventory = buildInventory('Armor', 15, 1, 'Armor', 5)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(20)
    })

    it('should add dex modifier to light armor', () => {
        const inventory = buildInventory('Armor', 15, 1, 'Armor', 5)
        const abilities = buildAbilities(0, 14)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(22)
        const inventory2 = buildInventory('Armor', 15, 1)
        const abilities2 = buildAbilities(0, 16)
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(18)
    })

    it('should add dex modifier to medium armor', () => {
        const inventory = buildInventory('Armor', 12, 2, 'Armor', 5)
        const abilities = buildAbilities(0, 14)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(19)
        const inventory2 = buildInventory('Armor', 2, 4, 'Armor', 15, 2)
        const abilities2 = buildAbilities(0, 12)
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(18)
    })

    it('should add 2 to medium armor if dex modifier is more than 2', () => {
        const inventory = buildInventory('Armor', 2, 4, 'Armor', 10, 2)
        const abilities = buildAbilities(0, 18)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(14)
        const inventory2 = buildInventory('Armor', 15, 2)
        const abilities2 = buildAbilities(0, 20)
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(17)
    })

    it('should add 0 to heavy armor', () => {
        const inventory = buildInventory('Armor', 18, 3, 'Armor', 5, 4)
        const abilities = buildAbilities(0, 18)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(23)
        const inventory2 = buildInventory('Armor', 2, 4, 'Armor', 17, 3)
        const abilities2 = buildAbilities(0, 20)
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(19)
    })

    it('should add ac from items to the unarmored modifier if not wearing armor', () => {
        const inventory = buildInventory('Armor', 5, 4)
        const abilities = buildAbilities(0, 18, 18)
        const modifiers = buildModifiers('unarmored-armor-class', 3)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(23)
        const inventory2 = buildInventory('Armor', 2, 4)
        const abilities2 = buildAbilities(0, 20, 20, 20, 20)
        const modifiers2 = buildModifiers('unarmored-armor-class', 5)
        const ac2 = armourClass(abilities2, inventory2, modifiers2)
        ac2.should.equal(22)
    })
})

function buildAbility(name: string, value: number): Ability {
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
    cha: number = 10): Ability[] {
    return [
        buildAbility('Strength', str),
        buildAbility('Dexterity', dex),
        buildAbility('Constitution', con),
        buildAbility('Intelligence', int),
        buildAbility('Wisdom', wis),
        buildAbility('Charisma', cha),
    ]
}

function buildInventory(
    filterType1: string = '',
    armorClass1: number = 0,
    armorTypeId1: number = 0,
    filterType2: string = '',
    armorClass2: number = 0,
    armorTypeId2: number = 0): ItemContainer[] {
    return [
        {
            name: '',
            equipped: true,
            capacity: 0,
            contents: [
                buildItem(),
                buildItem(filterType1, armorClass1, armorTypeId1),
                buildItem(),
                buildItem()
            ]
        },
        {
            name: '',
            equipped: true,
            capacity: 0,
            contents: [
                buildItem(),
                buildItem(),
                buildItem(filterType2, armorClass2, armorTypeId2),
                buildItem()
            ]
        }]
}

function buildItem(filterType: string = null, armorClass: number = null, armorTypeId: number = null): Item {
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
            armorTypeId

        },
        containerId: 0,
        equipped: true,
        quantity: 1
    }
}

function buildModifier(subType: string = null, statId: number = null, fixedValue: number = null): Modifier {
    return {
        fixedValue,
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
        isGranted: false,
        bonusTypes: [],
        value: 0,
        availableToMulticlass: true,
        modifierTypeId: 0,
        modifierSubTypeId: 0,
        componentId: 0,
        componentTypeId: 0
    }
}

function buildModifiers(
    subType: string = null, statId: number = null, fixedValue: number = null,
    subType2: string = null, statId2: number = null, fixedValue2: number = null) {
    return [
        buildModifier(subType2, statId2, fixedValue2),
        buildModifier(subType, statId, fixedValue),
        buildModifier()
    ]
}

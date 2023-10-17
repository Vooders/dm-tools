import { Item, ItemContainer, Modifier } from '../../../src/lib/CharacterSheetProcessor'
import armourClass from '../../../src/lib/character-sheet-processor/armourClass'
import Abilities from '../../Abilities'

const inventory = buildInventory()
const modifiers = buildModifiers()

describe('Armour Class', () => {
    it("should add dex modifier to 10", () => {
        const abilities = Abilities.builder()
            .withDexterity(14)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(12)
    })

    it("should be lower than 10 with negative DEX mod", () => {
        const abilities = Abilities.builder()
            .withDexterity(8)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(9)
    })

    it("should add unarmored modifier if the class has an unarmored armor modifier", () => {
        const abilities = Abilities.builder()
            .withDexterity(14)
            .withConstitution(14)
            .build()
        const modifiers = buildModifiers('unarmored-armor-class', Abilities.id('constitution'))
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(14)

        const abilities2 = Abilities.builder()
            .withDexterity(6)
            .withWisdom(14)
            .build()
        const modifiers2 = buildModifiers('unarmored-armor-class', Abilities.id('wisdom'))
        const ac2 = armourClass(abilities2, inventory, modifiers2)
        ac2.should.equal(10)
    })

    it("should add armored modifier if the class has an armored armor modifier", () => {
        const abilities = Abilities.builder()
            .withDexterity(14)
            .build()
        const inventory = buildInventory('Armor', 18, 3, 'Armor', 2, 4)
        const modifiers = buildModifiers('armored-armor-class', 0, 1)
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(21)

        const abilities2 = Abilities.builder()
            .withDexterity(16)
            .build()
        const inventory2 = buildInventory('Armor', 16, 2, 'Armor', 1, 4)
        const modifiers2 = buildModifiers('armored-armor-class', 0, 1, 0,'armored-armor-class', 0, 1)
        const ac2 = armourClass(abilities2, inventory2, modifiers2)
        ac2.should.equal(21)
    })

    it('should return the ac value for equipped armor', () => {
        const inventory = buildInventory('Armor', 15, 1, 'Armor', 5, 4)
        const ac = armourClass(Abilities.builder().build(), inventory, modifiers)
        ac.should.equal(20)
    })

    it('should add dex modifier to light armor', () => {
        const inventory = buildInventory('Armor', 15, 1, 'Armor', 5, 4)
        const abilities = Abilities.builder()
            .withDexterity(14)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(22)
        const inventory2 = buildInventory('Armor', 15, 1)
        const abilities2 = Abilities.builder()
            .withDexterity(16)
            .build()
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(18)
    })

    it('should add dex modifier to medium armor', () => {
        const inventory = buildInventory('Armor', 12, 2, 'Armor', 5, 4)
        const abilities = Abilities.builder()
            .withDexterity(14)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(19)
        const inventory2 = buildInventory('Armor', 2, 4, 'Armor', 15, 2)
        const abilities2 = Abilities.builder()
            .withDexterity(12)
            .build()
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(18)
    })

    it('should add 2 to medium armor if dex modifier is more than 2', () => {
        const inventory = buildInventory('Armor', 2, 4, 'Armor', 10, 2)
        const abilities = Abilities.builder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(14)
        const inventory2 = buildInventory('Armor', 15, 2)
        const abilities2 = Abilities.builder()
            .withDexterity(20)
            .build()
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(17)
    })

    it('should add 0 to heavy armor', () => {
        const inventory = buildInventory('Armor', 18, 3, 'Armor', 5, 4)
        const abilities = Abilities.builder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(23)
        const inventory2 = buildInventory('Armor', 2, 4, 'Armor', 17, 3)
        const abilities2 = Abilities.builder()
            .withDexterity(20)
            .build()
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(19)
    })

    it('should add ac from items to the unarmored modifier if not wearing armor', () => {
        const inventory = buildInventory('Armor', 5, 4)
        const abilities = Abilities.builder()
            .withDexterity(18)
            .withConstitution(18)
            .build()
        const modifiers = buildModifiers('unarmored-armor-class', Abilities.id('constitution'))
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(23)

        const inventory2 = buildInventory('Armor', 2, 4)
        const abilities2 = Abilities.builder()
            .withDexterity(20)
            .withWisdom(20)
            .build()
        const modifiers2 = buildModifiers('unarmored-armor-class', Abilities.id('wisdom'))
        const ac2 = armourClass(abilities2, inventory2, modifiers2)
        ac2.should.equal(22)
    })

    it('should add the highest ac armor item only, if more than one is equipped', () => {
        const inventory = buildInventory('Armor', 10, 2, 'Armor', 15, 2)
        const abilities = Abilities.builder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(17)
        const inventory2 = buildInventory('Armor', 15, 3, 'Armor', 20, 3)
        const abilities2 = Abilities.builder()
            .withDexterity(20)
            .build()
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(20)
    })

    it('should add the highest ac shield item only, if more than one is equipped', () => {
        const inventory = buildInventory('Armor', 2, 4, 'Armor', 5, 4)
        const abilities = Abilities.builder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(19)
        const inventory2 = buildInventory('Armor', 10, 4, 'Armor', 5, 4)
        const abilities2 = Abilities.builder()
            .withDexterity(20)
            .build()
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(25)
    })

    it('should add the highest ac armor item only, if more than one type is equipped', () => {
        const inventory = buildInventory('Armor', 10, 1, 'Armor', 15, 2)
        const abilities = Abilities.builder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, inventory, modifiers)
        ac.should.equal(17)

        const inventory2 = buildInventory('Armor', 20, 3, 'Armor', 14, 2)
        const abilities2 = Abilities.builder()
            .withDexterity(20)
            .build()
        const ac2 = armourClass(abilities2, inventory2, modifiers)
        ac2.should.equal(20)
    })
})

function buildInventory(
    filterType1: string = null,
    armorClass1: number = null,
    armorTypeId1: number = null,
    filterType2: string = null,
    armorClass2: number = null,
    armorTypeId2: number = null): ItemContainer[] {
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

 function buildModifier(subType: string = null, statId: number = null, fixedValue: number = null, entityId: number = null): Modifier {
    return {
        fixedValue,
        id: 0,
        entityId,
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

export function buildModifiers(
    subType: string = null, statId: number = null, fixedValue: number = null, entityId: number = null,
    subType2: string = null, statId2: number = null, fixedValue2: number = null, entityId2: number = null) {
    return [
        buildModifier(subType2, statId2, fixedValue2, entityId2),
        buildModifier(subType, statId, fixedValue, entityId),
        buildModifier()
    ]
}

import { Item, ItemContainer } from '../../../src/lib/CharacterSheetProcessor'
import armourClass from '../../../src/lib/character-sheet-processor/armourClass'
import AbilitiesBuilder from '../../builders/AbilitiesBuilder'
import ItemBuilder from '../../builders/ItemBuilder'
import ModifierBuilder from '../../builders/ModifierBuilder'

describe('Armour Class', () => {
    it("should add dex modifier to 10", () => {
        const abilities = new AbilitiesBuilder()
            .withDexterity(14)
            .build()
        const ac = armourClass(abilities, [], [])
        ac.should.equal(12)
    })

    it("should be lower than 10 with negative DEX mod", () => {
        const abilities = new AbilitiesBuilder()
            .withDexterity(8)
            .build()
        const ac = armourClass(abilities, [], [])
        ac.should.equal(9)
    })

    it("should add unarmored modifier if the class has an unarmored armor modifier", () => {
        const abilities = new AbilitiesBuilder()
            .withDexterity(14)
            .withConstitution(14)
            .build()
        const unArmouredDefense = new ModifierBuilder()
            .withSubType('unarmored-armor-class')
            .withStat('constitution')
            .build()
        const ac = armourClass(abilities, [], [unArmouredDefense])
        ac.should.equal(14)
    })

    it("should add armored modifier if the class has an armored armor modifier", () => {
        const abilities = new AbilitiesBuilder()
            .withDexterity(14)
            .build()

        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(18)
                .withArmorType('medium')
                .withEquipped(true)
                .build()
        ])

        const armouredAC = new ModifierBuilder()
            .withSubType('armored-armor-class')
            .withFixedValue(1)
            .build()
        const ac = armourClass(abilities, [inventory], [armouredAC])
        ac.should.equal(21)
    })

    it('should return the ac value for equipped armor', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(15)
                .withArmorType('light')
                .withEquipped(true)
                .build(),
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(5)
                .withArmorTypeId(4)
                .withEquipped(true)
                .build()
        ])
        const ac = armourClass(new AbilitiesBuilder().build(), [inventory], [])
        ac.should.equal(20)
    })

    it('should add dex modifier to light armor', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(15)
                .withArmorType('light')
                .withEquipped(true)
                .build()
        ])
        const abilities = new AbilitiesBuilder()
            .withDexterity(14)
            .build()
        const ac = armourClass(abilities, [inventory], [])
        ac.should.equal(17)
    })

    it('should add dex modifier to medium armor', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(12)
                .withArmorType('medium')
                .withEquipped(true)
                .build()
        ])
        const abilities = new AbilitiesBuilder()
            .withDexterity(14)
            .build()
        const ac = armourClass(abilities, [inventory], [])
        ac.should.equal(14)
    })

    it('should add 2 to medium armor if dex modifier is more than 2', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(12)
                .withArmorType('medium')
                .withEquipped(true)
                .build()
        ])
        const abilities = new AbilitiesBuilder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, [inventory], [])
        ac.should.equal(14)
    })

    it('should add 0 to heavy armor', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(18)
                .withArmorType('heavy')
                .withEquipped(true)
                .build()
        ])
        const abilities = new AbilitiesBuilder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, [inventory], [])
        ac.should.equal(18)
    })

    it('should add ac from items to the unarmored modifier if not wearing armor', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(18)
                .withArmorType('heavy')
                .withEquipped(false)
                .build()
        ])
        const abilities = new AbilitiesBuilder()
            .withDexterity(14)
            .withConstitution(14)
            .build()
        const unArmouredDefense = new ModifierBuilder()
            .withSubType('unarmored-armor-class')
            .withStat('constitution')
            .build()
        const ac = armourClass(abilities, [inventory], [unArmouredDefense])
        ac.should.equal(14)
    })

    it('should add the highest ac armor item only, if more than one is equipped', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(18)
                .withArmorType('heavy')
                .withEquipped(true)
                .build(),
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(14)
                .withArmorType('light')
                .withEquipped(true)
                .build()
        ])
        const abilities = new AbilitiesBuilder().build()
        const ac = armourClass(abilities, [inventory], [])
        ac.should.equal(18)
    })

    it('should add the highest ac shield item only, if more than one is equipped', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(2)
                .withArmorType('shield')
                .withEquipped(true)
                .build(),
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(5)
                .withArmorType('shield')
                .withEquipped(true)
                .build()
        ])
        const abilities = new AbilitiesBuilder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, [inventory], [])
        ac.should.equal(19)
    })

    it('should add the highest ac armor item only, if more than one type is equipped', () => {
        const inventory = buildItemContainer([
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(10)
                .withArmorType('light')
                .withEquipped(true)
                .build(),
            new ItemBuilder()
                .withFilterType('Armor')
                .withArmorClass(15)
                .withArmorType('medium')
                .withEquipped(true)
                .build()
        ])
        const abilities = new AbilitiesBuilder()
            .withDexterity(18)
            .build()
        const ac = armourClass(abilities, [inventory], [])
        ac.should.equal(17)
    })
})

function buildItemContainer(items: Item[]): ItemContainer {
    return {
        name: '',
        equipped: true,
        capacity: 0,
        contents: items
    }
}

import { Ability, ItemContainer, Item, Modifier } from "../CharacterSheetProcessor"

const baseAC = 10

export default function armourClass(abilities: Ability[], inventory: ItemContainer[], modifiers: Modifier[]): number {
    const dexModifier = getAbilityModifier('DEX', abilities)
    const equippedArmorItems = getEquippedArmorItems(inventory)
    const equippedArmorItemsAc = getEquippedArmorItemsAc(equippedArmorItems)
    const armorTypeModifier = getArmorTypeModifier(equippedArmorItems, dexModifier)
    const unarmoredModifier = getUnarmoredModifier(modifiers, abilities)
    const armoredModifier = getArmoredModifier(modifiers)
    const isWearingArmor = getEquippedArmorAc(equippedArmorItems) > 0

    if (isWearingArmor) {
        return equippedArmorItemsAc + armorTypeModifier + armoredModifier
    } else {
        return baseAC + dexModifier + unarmoredModifier + equippedArmorItemsAc
    }
}

function getArmorTypeModifier(items: Item[], dexModifier: number): number {
    const armorTypes = items.map((item) => item.definition.armorTypeId)

    if (armorTypes.includes(1)) {
        return dexModifier
    } else if (armorTypes.includes(2)) {
        return dexModifier < 2 ? dexModifier : 2
    } else return 0
}

function getArmoredModifier(modifiers: Modifier[]): number {
    return modifiers.filter((modifier) => modifier.subType === 'armored-armor-class')
        .reduce((total: number, item: any) => total + item.fixedValue, 0)
}

function getEquippedArmorAc(items: Item[]) {
    const armors = items.filter((item) => item.definition.armorTypeId < 4)
        .map((armor) => armor.definition.armorClass)
    return armors.length > 0 ? Math.max(...armors) : 0
}

function getEquippedShieldAc(items: Item[]) {
    const shields = items.filter((item) => item.definition.armorTypeId === 4)
        .map((shield) => shield.definition.armorClass)
    return shields.length > 0 ? Math.max(...shields) : 0
}

function getEquippedItemsAc(items: Item[]) {
    return items.filter((item) => item.definition.armorTypeId > 4)
        .reduce((total: number, item: any) => total + item.definition.armorClass, 0)
}

function getUnarmoredModifier(modifiers: Modifier[], abilities: Ability[]): number {
    const unarmoredMod = modifiers.filter((modifier) => modifier.subType === 'unarmored-armor-class')[0]
    return unarmoredMod ? abilities[unarmoredMod.statId - 1].modifier : 0
}

function getEquippedArmorItems(inventory: ItemContainer[]): Item[] {
    return inventory.map((container) => container.contents).flat()
        .filter((item) => item.equipped && item.definition.filterType === 'Armor')
}

function getEquippedArmorItemsAc(items: Item[]): number {
    return getEquippedArmorAc(items) + getEquippedShieldAc(items) + getEquippedItemsAc(items)
}

function getAbilityModifier(shortName: string, abilities: Ability[]): number {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

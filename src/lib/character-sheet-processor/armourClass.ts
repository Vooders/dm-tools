import { Ability, ItemContainer, ItemType, ModifierType } from "../CharacterSheetProcessor"

const baseAC = 10

export default function armourClass(abilities: Ability[], inventory: ItemContainer[], modifiers: ModifierType[]): number {
    const dexModifier = getAbilityModifier('DEX', abilities)
    const equippedArmorItems = getEquippedArmorItems(inventory)
    const equippedArmorItemsAc = getEquippedArmorItemsAc(equippedArmorItems)
    const armorTypeModifier = getArmorTypeModifier(equippedArmorItems, dexModifier)
    const unarmoredModifier = getUnarmoredModifier(modifiers, abilities)
    const armoredModifier = getArmoredModifier(modifiers)
    const armorIsEquipped = isWearingArmor(equippedArmorItems)

    if (armorIsEquipped) {
        return equippedArmorItemsAc + armorTypeModifier + armoredModifier
    } else {
        return baseAC + dexModifier + unarmoredModifier + equippedArmorItemsAc
    }
}

function getArmorTypeModifier(items: ItemType[], dexModifier: number): number {
    const armorTypes = items.filter((item) => (item.definition.armorTypeId < 4))
        .map((armor) => armor.definition.armorTypeId)
    const armorType = Math.max(...armorTypes)

    if (armorType === 1) {
        return dexModifier
    } else if (armorType === 2) {
        return dexModifier < 2 ? dexModifier : 2
    } else return 0
}

function isWearingArmor(items: ItemType[]): boolean {
    const armorItems = items.map((armor) => armor.definition.armorTypeId)
    return armorItems.includes(1) || armorItems.includes(2) || armorItems.includes(3)
}

function getEquippedArmorItems(inventory: ItemContainer[]): ItemType[] {
    return inventory.map((container) => container.contents).flat()
        .filter((item) => item.equipped && item.definition.filterType === 'Armor')
}

function getEquippedArmorAc(items: ItemType[]): number {
    const armorAcs = items.filter((item) => item.definition.armorTypeId < 4)
        .map((armor) => armor.definition.armorClass)
    return getHighestAc(armorAcs)
}

function getEquippedShieldAc(items: ItemType[]): number {
    const shieldAcs = items.filter((item) => item.definition.armorTypeId === 4)
        .map((shield) => shield.definition.armorClass)
    return getHighestAc(shieldAcs)
}

function getHighestAc(acValues: number[]): number {
    return acValues.length > 0 ? Math.max(...acValues) : 0
}

function getEquippedItemsAc(items: ItemType[]): number {
    return items.filter((item) => item.definition.armorTypeId > 4)
        .reduce((total: number, item: any) => total + item.definition.armorClass, 0)
}

function getEquippedArmorItemsAc(items: ItemType[]): number {
    return getEquippedArmorAc(items) + getEquippedShieldAc(items) + getEquippedItemsAc(items)
}

function getUnarmoredModifier(modifiers: ModifierType[], abilities: Ability[]): number {
    const unarmoredMod = modifiers.filter((modifier) => modifier.subType === 'unarmored-armor-class')[0]
    return unarmoredMod ? abilities[unarmoredMod.statId - 1].modifier : 0
}

function getArmoredModifier(modifiers: ModifierType[]): number {
    return modifiers.filter((modifier) => modifier.subType === 'armored-armor-class')
        .reduce((total: number, item: any) => total + item.fixedValue, 0)
}

function getAbilityModifier(shortName: string, abilities: Ability[]): number {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

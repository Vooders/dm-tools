import { Modifiers, Ability, ItemContainer, Item } from "../CharacterSheetProcessor"

const baseAC = 10

export default function armourClass(abilities: Ability[], modifiers: Modifiers, inventory: ItemContainer[]): number {
    const dexModifier = getAbilityModifier('DEX', abilities)
    const unarmoredModifier = getUnarmoredModifier(abilities, modifiers)
    const equippedArmorItems = getEquippedArmorItems(inventory)
    const equippedArmorItemsAc = getEquippedArmorItemsAc(equippedArmorItems)

    if (equippedArmorItemsAc > 10) {
        const armoredModifier = getArmoredModifier(equippedArmorItems, dexModifier)
        return equippedArmorItemsAc + armoredModifier
    } else {
        return baseAC + dexModifier + unarmoredModifier + equippedArmorItemsAc
    }
}

function getArmoredModifier(items: Item[], dexModifier: number) {
    const armorType = items.filter((item) => item.definition.armorTypeId === 1 || 2 || 3)[0].definition.armorTypeId

    if (armorType === 1) {
        return dexModifier
    } else if (armorType === 2) {
        return dexModifier < 2 ? dexModifier : 2
    } else return 0
}

function getEquippedArmorItems(inventory: ItemContainer[]) {
    return inventory.map((container) => container.contents).flat()
        .filter((item) => item.equipped && item.definition.filterType === 'Armor')
}
function getEquippedArmorItemsAc(items: Item[]): number {
    return items.reduce((total: number, item: any) => total + item.definition.armorClass, 0)
}

function getUnarmoredModifier(abilities: Ability[], modifiers: Modifiers): number {
    const modifier = modifiers.class.filter((modifier) => modifier.subType === 'unarmored-armor-class')[0]
    return modifier ? abilities[modifier.statId - 1].modifier : 0
}

function getAbilityModifier(shortName: string, abilities: Ability[]) {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

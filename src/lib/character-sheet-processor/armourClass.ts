import { Ability, ItemContainer, Item } from "../CharacterSheetProcessor"

const baseAC = 10

export default function armourClass(abilities: Ability[],  inventory: ItemContainer[], armoredModifier: number = 0, unarmoredMod: number = 0 ): number {
    const dexModifier = getAbilityModifier('DEX', abilities)
    const equippedArmorItems = getEquippedArmorItems(inventory)
    const equippedArmorItemsAc = getEquippedArmorItemsAc(equippedArmorItems)
    const armorTypeModifier = getArmorTypeModifier(equippedArmorItems, dexModifier)
    const unarmoredModifier = unarmoredMod ? abilities[unarmoredMod -1].modifier : 0

    if (isArmored(equippedArmorItems)) {
        return equippedArmorItemsAc + armorTypeModifier + armoredModifier
    } else {
        return baseAC + dexModifier + unarmoredModifier + equippedArmorItemsAc
    }
}

function getArmorTypeModifier(items: Item[], dexModifier: number): number {
    const armorTypes = getArmorTypes(items)

    if (armorTypes.includes(1)) {
        return dexModifier
    } else if (armorTypes.includes(2)) {
        return dexModifier < 2 ? dexModifier : 2
    } else return 0
}

function getArmorTypes(items: Item[]): number[] {
    return items.map((item) => item.definition.armorTypeId)
}

function isArmored(items: Item[]): boolean {
    const armorTypes = getArmorTypes(items)
    return armorTypes.includes(1) || armorTypes.includes(2) || armorTypes.includes(3)
}

function getEquippedArmorItems(inventory: ItemContainer[]): Item[] {
    return inventory.map((container) => container.contents).flat()
        .filter((item) => item.equipped && item.definition.filterType === 'Armor')
}

function getEquippedArmorItemsAc(items: Item[]): number {
    return items.reduce((total: number, item: any) => total + item.definition.armorClass, 0)
}

function getAbilityModifier(shortName: string, abilities: Ability[]): number {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

import { Modifier } from "../../ddb-data.types"
import { Ability, ItemContainer, Item } from "../../dm-tools-data.types"
import { Logger } from '../../logger/Logger'

const logger = new Logger('[characterSheetProcessor][armourClass]')

const baseAC = 10

export default function armourClass(abilities: Ability[], inventory: ItemContainer[], modifiers: Modifier[]): number {
    logger.debug('Calculating armour class')
    const dexModifier = getAbilityModifier('DEX', abilities)
    const equippedArmorItems = getEquippedArmorItems(inventory)
    const equippedArmorItemsAc = getEquippedArmorItemsAc(equippedArmorItems)
    const armorTypeModifier = getArmorTypeModifier(equippedArmorItems, dexModifier)
    const unarmoredModifier = getUnarmoredModifier(modifiers, abilities)
    const armoredModifier = getArmoredModifier(modifiers)
    const armorIsEquipped = isWearingArmor(equippedArmorItems)
    const bonusModifier = getBonusModifier(modifiers)

    if (armorIsEquipped) {
        return equippedArmorItemsAc + armorTypeModifier + armoredModifier + bonusModifier
    } else {
        return baseAC + dexModifier + unarmoredModifier + equippedArmorItemsAc + bonusModifier
    }
}

function getBonusModifier(modifiers: Modifier[]): number {
    return modifiers.filter((modifier) => modifier.subType === 'armor-class' && modifier.type === 'bonus')
        .reduce((total: number, mod: Modifier) => total + mod.fixedValue, 0)
}

function getArmorTypeModifier(items: Item[], dexModifier: number): number {
    const armorTypes = items.filter((item) => (item.definition.armorTypeId < 4))
        .map((armor) => armor.definition.armorTypeId)
    const armorType = Math.max(...armorTypes)

    if (armorType === 1) {
        return dexModifier
    } else if (armorType === 2) {
        return dexModifier < 2 ? dexModifier : 2
    } else return 0
}

function isWearingArmor(items: Item[]): boolean {
    const armorItems = items.map((armor) => armor.definition.armorTypeId)
    return armorItems.includes(1) || armorItems.includes(2) || armorItems.includes(3)
}

function getEquippedArmorItems(inventory: ItemContainer[]): Item[] {
    return inventory.map((container) => container.contents).flat()
        .filter((item) => item.equipped && item.definition.filterType === 'Armor')
}

function getEquippedArmorAc(items: Item[]): number {
    const armorAcs = items.filter((item) => item.definition.armorTypeId < 4)
        .map((armor) => armor.definition.armorClass)
    return getHighestAc(armorAcs)
}

function getEquippedShieldAc(items: Item[]): number {
    const shieldAcs = items.filter((item) => item.definition.armorTypeId === 4)
        .map((shield) => shield.definition.armorClass)
    return getHighestAc(shieldAcs)
}

function getHighestAc(acValues: number[]): number {
    return acValues.length > 0 ? Math.max(...acValues) : 0
}

function getEquippedItemsAc(items: Item[]): number {
    return items.filter((item) => item.definition.armorTypeId > 4)
        .reduce((total: number, item: any) => total + item.definition.armorClass, 0)
}

function getEquippedArmorItemsAc(items: Item[]): number {
    return getEquippedArmorAc(items) + getEquippedShieldAc(items) + getEquippedItemsAc(items)
}

function getUnarmoredModifier(modifiers: Modifier[], abilities: Ability[]): number {
    const unarmoredMod = modifiers.filter((modifier) => modifier.subType === 'unarmored-armor-class')[0]
    return unarmoredMod ? abilities[unarmoredMod.statId - 1].modifier : 0
}

function getArmoredModifier(modifiers: Modifier[]): number {
    return modifiers.filter((modifier) => modifier.subType === 'armored-armor-class')
        .reduce((total: number, item: any) => total + item.fixedValue, 0)
}

function getAbilityModifier(shortName: string, abilities: Ability[]): number {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

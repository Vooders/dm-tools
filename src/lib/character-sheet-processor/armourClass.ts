import { Modifiers, Ability, ItemContainer } from "../CharacterSheetProcessor"

const baseAC = 10

export default function armourClass(abilities: Ability[], modifiers: Modifiers, inventory: ItemContainer[]): number {
    const dexModifier = getAbilityModifier('DEX', abilities)
    const unarmoredModifier = getUnarmoredModifier(abilities, modifiers)
    const armoredAc = getAcFromItems(inventory)

    if(armoredAc) {
        return armoredAc
    } else {
        return baseAC + dexModifier + unarmoredModifier
    }
}

function getAcFromItems(inventory: ItemContainer[]) {
    return inventory.map((container) => container.contents).flat()
        .filter((item) => item.equipped && item.definition.filterType === 'Armor')
        .reduce((total: number, item: any) =>  total + item.definition.armorClass, 0)
}

function getUnarmoredModifier(abilities: Ability[], modifiers: Modifiers): number {
    const modifier = modifiers.class.filter((modifier) => modifier.subType === 'unarmored-armor-class')[0]
    return modifier ? abilities[modifier.statId - 1].modifier : 0
}

function getAbilityModifier(shortName: string, abilities: Ability[]) {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

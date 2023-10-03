import { Modifiers, Ability } from "../CharacterSheetProcessor"

const baseAC = 10

export default function armourClass(abilities: Ability[], modifiers: Modifiers): number {
    const dexMod = getAbilityModifier('DEX', abilities)
    const unarmoredModifier = getUnarmoredModifier(abilities, modifiers)

    return baseAC + dexMod + unarmoredModifier
}

function getUnarmoredModifier(abilities: Ability[], modifiers: Modifiers): number {
    const modifier = modifiers.class.filter((modifier) => modifier.subType === 'unarmored-armor-class')[0]
    return modifier ? abilities[modifier.statId - 1].modifier : 0
}

function getAbilityModifier(shortName: string, abilities: Ability[]) {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

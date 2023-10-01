import { Ability, CharacterProfile } from "../CharacterSheetProcessor"

const baseAC = 10

export default function armourClass(abilities: Ability[], profile: CharacterProfile): number {
    const dexMod = getModifier('DEX', abilities)

    if (profile.classes === 'Barbarian') {
        return baseAC + dexMod + getModifier('CON', abilities)
    } else if (profile.classes === 'Monk') {
        return baseAC + dexMod + getModifier('WIS', abilities)
    } else {
        return baseAC + dexMod
    }
}

function getModifier(shortName: string, abilities: Ability[]) {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

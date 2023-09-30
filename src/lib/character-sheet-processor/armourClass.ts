import { Ability } from "../CharacterSheetProcessor"

const baseAC = 10

export default function armourClass(abilities: Ability[]): number {
    const dexMod = getModifier('DEX', abilities)
    return baseAC + dexMod
}

function getModifier(shortName: string, abilities: Ability[]) {
    return abilities.filter((ability) => ability.shortName === shortName)[0].modifier
}

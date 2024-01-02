import { CharacterClass } from "../CharacterSheetProcessor"

export function calculate(classes: CharacterClass[]): HitDice[] {

    return classes.map((clazz) => {
        return {
            dice: `d${clazz.definition.hitDice}`,
            max: clazz.level,
            used: clazz.hitDiceUsed
        }
    })
}

export type HitDice = {
    dice: string
    max: number
    used: number
}
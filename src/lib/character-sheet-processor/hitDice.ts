import { CharacterClass } from "../CharacterSheetProcessor"

export function calculate(classes: CharacterClass[]): HitDice[] {

    const combined = classes.reduce((obj: any, clazz) => {
        obj[clazz.definition.hitDice] = {
            max: clazz.level + (obj.max | 0),
            used: clazz.hitDiceUsed + (obj.used | 0)
        }
        return obj
    }, {})

    return Object.keys(combined).map((dice) => {
        return {
            dice: `d${dice}`,
            max: combined[dice].max,
            used: combined[dice].used
        }
    })
}

export type HitDice = {
    dice: string
    max: number
    used: number
}

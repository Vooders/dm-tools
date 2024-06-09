import { CharacterClass } from "../../ddb-data.types"
import { HitDice } from "../../dm-tools-data.types"

export function calculate(classes: CharacterClass[]): HitDice[] {
    const combined = classes.reduce((obj: combined, clazz) => {
        const dice = clazz.definition.hitDice

        if (obj[dice]) {
            obj[dice].max += clazz.level
            obj[dice].used += clazz.hitDiceUsed
        } else {
            obj[dice] = {
                max: clazz.level,
                used: clazz.hitDiceUsed
            }
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

type combined = {
    [key: string]: {
        max: number,
        used: number
    }
}

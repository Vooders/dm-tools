import { CharacterClass } from "../CharacterSheetProcessor"


export function calculate(classes: CharacterClass[]): HitDice[] {
    return [{
        dice: 'd6',
        max: 1,
        used: 1
    }]
}

export type HitDice = {
    dice: 'd6' | 'd8' | 'd10' | 'd12'
    max: number
    used: number
}
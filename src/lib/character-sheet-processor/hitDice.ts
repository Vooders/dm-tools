

export function calculate (level: number, hitDiceUsed: number) {
    return {
        total: level,
        used: hitDiceUsed
    }
}

export type HitDice = {
    total: number
    used: number
}
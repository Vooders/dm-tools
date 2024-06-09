import { CharacterClass } from "../../src/ddb-data.types"

export default class ClassBuilder {
    constructor(
        private level: number = 1,
        private hitDice: number = 6,
        private hitDiceUsed: number = 0
    ) { }

    public withLevel(level: number): ClassBuilder {
        this.level = level
        return this
    }

    public withHitDice(hitDice: 6 | 8 | 10 | 12) {
        this.hitDice = hitDice
        return this
    }

    public withHitDiceUsed(hitDiceUsed: number) {
        this.hitDiceUsed = hitDiceUsed
        return this
    }

    public build(): CharacterClass {
        return {
            level: this.level,
            definition: {
                hitDice: this.hitDice
            },
            hitDiceUsed: this.hitDiceUsed
        }
    }
}

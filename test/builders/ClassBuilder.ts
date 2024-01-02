import { CharacterClass } from "../../src/lib/CharacterSheetProcessor"

export default class ClassBuilder {
    constructor (
        private level: number = 1,
        private hitDice: number = 6
    ){}

    public withLevel(level: number): ClassBuilder {
        this.level = level
        return this
    }

    public withHitDice(hitDice: 6 | 8 | 10 | 12) {
        this.hitDice = hitDice
        return this
    }

    public build(): CharacterClass {
        return {
            level: this.level,
            definition: {
                hitDice: this.hitDice
            }
        }
    }
}
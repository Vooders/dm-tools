import { CharacterClass } from "../../src/lib/CharacterSheetProcessor"

export default class ClassBuilder {
    constructor (
        private level: number = 1
    ){}

    public withLevel(level: number): ClassBuilder {
        this.level = level
        return this
    }

    public build(): CharacterClass {
        return {
            level: this.level
        }
    }
}
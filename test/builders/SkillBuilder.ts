import { Skill } from "../../src/dm-tools-data.types"

export default class SkillBuilder {
    constructor(
        private name: string = '',
        private mod: string = '',
        private bonus: number = 0,
        private proficient: boolean = false,
        private expertise: boolean = false
    ){}

    public withName(name: string) {
        this.name = name
        return this
    }

    public withMod(mod: string) {
        this.mod = mod
        return this
    }
    public withBonus(bonus: number) {
        this.bonus = bonus
        return this
    }

    public withProficient(proficient: boolean) {
        this.proficient = proficient
        return this
    }

    public withExpertise(expertise: boolean) {
        this.expertise = expertise
        return this
    }

    public build(): Skill {
        return {
            name: this.name,
            mod: this.mod,
            bonus: this.bonus,
            proficient: this.proficient,
            expertise: this.expertise
        }
    }
}

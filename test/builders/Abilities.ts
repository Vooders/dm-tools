import { Ability } from "../../src/lib/CharacterSheetProcessor"

type abilityNames = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'

export default class Abilities {
    private static ids = {
        strength: 1,
        dexterity: 2,
        constitution: 3,
        intelligence: 4,
        wisdom: 5,
        charisma: 6
    }

    private constructor (
        private strength: number = 10,
        private dexterity: number = 10,
        private constitution: number = 10,
        private intelligence: number = 10,
        private wisdom: number = 10,
        private charisma: number = 10
    ){}

    public static id(name: abilityNames) {
        return this.ids[name]
    }

    public static builder() {
        return new this()
    }

    public withStrength(strength: number) {
        this.strength = strength
        return this
    }

    public withDexterity(dexterity: number) {
        this.dexterity = dexterity
        return this
    }

    public withConstitution(constitution: number) {
        this.constitution = constitution
        return this
    }

    public withIntelligence(intelligence: number) {
        this.intelligence = intelligence
        return this
    }

    public withWisdom(wisdom: number) {
        this.wisdom = wisdom
        return this
    }

    public withCharisma(charisma: number) {
        this.charisma = charisma
        return this
    }

    public build(): Ability[] {
        return [
            this.buildAbility('Strength', this.strength),
            this.buildAbility('Dexterity', this.dexterity),
            this.buildAbility('Constitution', this.constitution),
            this.buildAbility('Intelligence', this.intelligence),
            this.buildAbility('Wisdom', this.wisdom),
            this.buildAbility('Charisma', this.charisma)
        ]
    }

    private buildAbility(name: string, value: number): Ability {
        return {
            name: name,
            value,
            modifier: Math.floor((value - 10) / 2),
            shortName: name.slice(0, 3).toUpperCase()
        }
    }
}

import { CustomProficiency } from "../../src/lib/CharacterSheetProcessor";

export default class CustomProficiencyBuilder {
    constructor(
        private id: number = 0,
        private name: string = '',
        private type: number = 0,
        private statId: number = 0,
        private proficiencyLevel: number = 0,
        private notes: string = '',
        private description: string = '',
        private override: number = 0,
        private magicBonus: number = 0,
        private miscBonus: number = 0
    ){}

    public withId(id: number) {
        this.id = id
        return this
    }

    public withName(name: string) {
        this.name = name
        return this
    }

    public withType(type: number) {
        this.type = type
        return this
    }

    public withStatId(statId: number) {
        this.statId = statId
        return this
    }

    public withProficiencyLevel(proficiencyLevel: number) {
        this.proficiencyLevel = proficiencyLevel
        return this
    }

    public withNotes(notes: string) {
        this.notes = notes
        return this
    }

    public withDescription(description: string) {
        this.description = description
        return this
    }

    public withOverride(override: number) {
        this.override = override
        return this
    }

    public withMagicBonus(magicBonus: number) {
        this.magicBonus = magicBonus
        return this
    }

    public withMiscBonus(miscBonus: number) {
        this.miscBonus = miscBonus
        return this
    }

    public build(): CustomProficiency {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            statId: this.statId,
            proficiencyLevel: this.proficiencyLevel,
            notes: this.notes,
            description: this.description,
            override: this.override,
            magicBonus: this.magicBonus,
            miscBonus: this.miscBonus
        }
    }
}
import { Ability, CharacterProfile, CharacterProfileHp, DmToolsData, Modifier, Save, Skill, Stat } from "./CharacterSheetProcessor";
import { Npc } from "./saveNpc";
import abilities from './character-sheet-processor/abilities'
import skills from './character-sheet-processor/skills'
import saves from "./character-sheet-processor/saves";
import ModifierBuilder from "../../test/builders/ModifierBuilder";

export default class NpcProcessor {

    private npcData: Npc

    constructor(npcData: Npc) {
        this.npcData = npcData
    }

    public toDmToolsData(): DmToolsData {
        return {
            id: this.npcData.id,
            avatarPath: null,
            abilities: this.buildAbilities(),
            profile: this.buildProfile(),
            hp: this.buildHp(),
            proficiency: this.npcData.proficiencyBonus,
            saves: this.buildSaves(),
            skills: this.buildSkills(),
            passiveSkills: [],
            proficiencyView: [],
            spellSlots: [],
            actions: [],
            spells: [],
            currencies: null,
            inventory: [],
            weightData: null,
            deathSaves: null,
            ac: this.npcData.ac,
            wealth: null,
            hitDice: [],
            healthPotions: null,
            creatures: [],
            inspiration: null,
            milestoneProgression: null,
        }
    }


    private buildSkills(): Skill[] {
        const abilities = this.buildAbilities()
        const proficiencyArray: string[] = this.npcData.proficiencies
        const expertiseArray: string[] = this.npcData.expertise
        const proficiencyBonus = this.npcData.proficiencyBonus

        const proficiencies = proficiencyArray.map((name) => {
            return new ModifierBuilder()
                .withFriendlySubTypeName(name)
                .build()
        })
        const expertise = expertiseArray.map((name) => {
            return new ModifierBuilder()
                .withFriendlySubTypeName(name)
                .build()
        })

        return skills(abilities, [], proficiencies, expertise, proficiencyBonus)
    }

    private buildSaves(): Save[] {
        const abilities = this.buildAbilities()
        const proficiencyArray: string[] = this.npcData.saveProficiencies

        const proficiencies = proficiencyArray.map((name) => {
            return new ModifierBuilder()
                .withFriendlySubTypeName(name)
                .withSubType('saving-throws')
                .build()
        })

        return saves(0, proficiencies, abilities, false, this.npcData.proficiencyBonus)
    }

    private buildHp(): CharacterProfileHp {
        return {
            constitutionBonus: 0,
            base: this.npcData.hp,
            bonus: 0,
            override: 0,
            removed: 0,
            temporary: 0,
        }
    }

    private buildProfile(): CharacterProfile {
        return {
            name: this.npcData.name,
            race: this.npcData.race,
            level: null,
            classes: null,
            background: null,
            alignment: null,
            appearance: {
                size: null,
                gender: this.npcData.gender,
                faith: null,
                age: null,
                hair: null,
                eyes: null,
                skin: null,
                height: null,
                weight: null
            },
            xp: null
        }
    }

    private buildAbilities(): Ability[] {
        return abilities([
            {
                "id": 1,
                "name": null,
                "value": this.npcData.abilities.strength
            },
            {
                "id": 2,
                "name": null,
                "value": this.npcData.abilities.dexterity
            },
            {
                "id": 3,
                "name": null,
                "value": this.npcData.abilities.constitution
            },
            {
                "id": 4,
                "name": null,
                "value": this.npcData.abilities.intelligence
            },
            {
                "id": 5,
                "name": null,
                "value": this.npcData.abilities.wisdom
            },
            {
                "id": 6,
                "name": null,
                "value": this.npcData.abilities.charisma
            }
        ], [])
    }
}
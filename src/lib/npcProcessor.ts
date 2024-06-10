import { Npc } from "./saveNpc";
import abilities from './character-sheet-processor/abilities'
import {
    Ability,
    DmToolsData,
    Skill,
    Save,
    CharacterProfileHp,
    CharacterProfile
} from "../dm-tools-data.types";

export default class NpcProcessor {

    private npcData: Npc
    private abilities: Ability[]

    constructor(npcData: Npc) {
        this.npcData = npcData
    }

    public toDmToolsData(): DmToolsData {
        this.abilities = this.buildAbilities()

        return {
            id: this.npcData.id,
            avatarPath: null,
            abilities: this.abilities,
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

    private abilityModifierByShortName(shortName: string): number {
        return this.abilities.find(ability => ability.shortName === shortName).modifier
    }

    private buildSkills(): Skill[] {
        return this.npcData.skills.map((skill) => {
            const baseModifier = this.abilityModifierByShortName(skill.mod)
            let abilityModifier = baseModifier
            if (skill.expertise) {
                abilityModifier += (this.npcData.proficiencyBonus * 2)
            } else if (skill.proficient) {
                abilityModifier += this.npcData.proficiencyBonus
            }
            return {
                ...skill,
                bonus: abilityModifier
            }
        })
    }

    private buildSaves(): Save[] {
        return this.npcData.saves.map((save) => {
            const shortName = save.name.slice(0, 3).toUpperCase()
            const baseModifier = this.abilityModifierByShortName(shortName)
            let modifier = baseModifier
            if (save.proficient) {
                modifier += this.npcData.proficiencyBonus
            }
            return {
                ...save,
                modifier,
                shortName,
            }
        })
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

import { Ability, CharacterProfile, CharacterProfileHp, DmToolsData, Stat } from "./CharacterSheetProcessor";
import { Npc } from "./saveNpc";
import abilities from './character-sheet-processor/abilities'

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
            proficiency: null,
            saves: [],
            skills: [],
            passiveSkills: [],
            proficiencyView: [],
            spellSlots: [],
            actions: [],
            spells: [],
            currencies: null,
            inventory: [],
            weightData: null,
            deathSaves: null,
            ac: null,
            wealth: null,
            hitDice: [],
            healthPotions: null,
            creatures: [],
            inspiration: null,
            milestoneProgression: null,
        }
    }

    private buildHp(): CharacterProfileHp {
        return {
            constitutionBonus: 0,
            base: 10,
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
        ],[])
    }
}
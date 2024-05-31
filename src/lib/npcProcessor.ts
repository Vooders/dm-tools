import { Ability, CharacterProfile, DmToolsData, Stat } from "./CharacterSheetProcessor";
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
            hp: null,
            proficiency: null,
            saves: null,
            skills: null,
            passiveSkills: null,
            proficiencyView: null,
            spellSlots: null,
            actions: null,
            spells: null,
            currencies: null,
            inventory: null,
            weightData: null,
            deathSaves: null,
            ac: null,
            wealth: null,
            hitDice: null,
            healthPotions: null,
            creatures: null,
            inspiration: null,
            milestoneProgression: null,
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
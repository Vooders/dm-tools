import { Ability, CharacterProfile, CharacterProfileHp, DmToolsData, Modifier, Skill, Stat } from "./CharacterSheetProcessor";
import { Npc } from "./saveNpc";
import abilities from './character-sheet-processor/abilities'
import skills from './character-sheet-processor/skills'

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
            saves: [],
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
        const profArray: string[] = this.npcData.proficiencies
        const expArray: string[] = this.npcData.expertise
        const proficiencyBonus = this.npcData.proficiencyBonus

        const proficiencies = profArray.map((prof) => {
            return this.buildModifier(prof)
        })
        const expertise = expArray.map((prof) => {
            return this.buildModifier(prof)
        })

        return skills(abilities, [], proficiencies, expertise, proficiencyBonus)
    }

    private buildModifier(friendlySubtypeName: string): Modifier {
        return {
            fixedValue: null,
            id: null,
            entityId: null,
            entityTypeId: null,
            type: null,
            subType: null,
            dice: null,
            restriction: null,
            statId: null,
            requiresAttunement: null,
            duration: null,
            friendlyTypeName: null,
            friendlySubtypeName,
            isGranted: null,
            bonusTypes: [],
            value: null,
            availableToMulticlass: null,
            modifierTypeId: null,
            modifierSubTypeId: null,
            componentId: null,
            componentTypeId: null
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
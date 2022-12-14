
export default class CharacterSheetProcessor {
    private modifiers: Modifiers
    private stats: Stat[]
    private abilityNames = [
        'Strength',
        'Dexterity',
        'Constitution',
        'Intelligence',
        'Wisdom',
        'Charisma'
    ]

    private abilities: Ability[]
    private level: number
    private proficiency: number
    private isMultiClass: boolean
    private skills: Skill[]

    constructor(private dndBeyondJson: any) {
        this.modifiers = dndBeyondJson.data.modifiers
        this.stats = dndBeyondJson.data.stats
        this.level = dndBeyondJson.data.classes.reduce((total: number, clas: any) => {
            return total + clas.level
        }, 0)
        this.isMultiClass = dndBeyondJson.data.classes.length > 1
    }

    public process(): any {
        this.proficiency = this.calculateProficiency()
        this.buildAbilities()
        this.skills = this.buildSkills()
console.log('bob')
        return {
            ...this.dndBeyondJson,
            dmTools: this.dmTools()
        }
    }

    private dmTools(): DmToolsData {
        return {
            id: this.dndBeyondJson.data.id,
            abilities: this.abilities,
            profile: this.buildProfile(),
            hp: this.buildHp(),
            proficiency: this.proficiency,
            saves: this.buildSaves(),
            skills: this.skills,
            passiveSkills: this.buildPassiveSkills(),
            proficiencyView: this.buildProficienciesView()
        }
    }

    private buildProficienciesView(): ProficiencyView[] {
        const entityId = {
            tools: 2103445194,
            martialWeapons: 1782728300,
            simpleWeapons: 660121713,
            armour: 174869515
        }
        const customProficiencies = this.dndBeyondJson.data.customProficiencies.map((customProficiency: any) => customProficiency.name)
        const skillNames = this.skills.map(skill => skill.name)
        const proficiencies = this.filterModifiersByType('proficiency')
            .filter(proficiency => !proficiency.subType.includes('saving-throws'))
            .filter(proficiency => !skillNames.includes(proficiency.friendlySubtypeName) || customProficiencies.includes(proficiency.friendlySubtypeName))

        const languages = this.filterModifiersByType('language')
            .map(language => language.subType)
            .join(', ')

        return [
            {
                type: 'armour',
                value: this.getSubTypeNamesByEntityId(proficiencies, entityId.armour)
            },
            {
                type: 'Weapons',
                value: this.getSubTypeNamesByEntityId(proficiencies, entityId.martialWeapons)
                    .concat(', ', this.getSubTypeNamesByEntityId(proficiencies, entityId.simpleWeapons))
            },
            {
                type: 'tools',
                value: this.getSubTypeNamesByEntityId(proficiencies, entityId.tools)
            },
            {
                type: 'Languages',
                value: languages
            }
        ]
    }

    private getSubTypeNamesByEntityId(proficiencies: Modifier[], entityId: number): string {
        const names =  proficiencies.filter(proficiency => proficiency.entityTypeId === entityId)
            .map(proficiency => proficiency.friendlySubtypeName)
        
        return [...new Set(names)].join(', ')
    }

    private buildPassiveSkills(): PassiveSkill[] {
        const passiveBonuses = this.filterModifiersByType('bonus')
            .filter((bonus) => bonus.subType.includes('passive'))

        return [
            { mod: 'WIS', name: 'Perception', score: 10},
            { mod: 'INT', name: 'Investigation', score: 10},
            { mod: 'WIS', name: 'Insight', score: 10}
        ].map(passiveSkill => {
            const modifier = this.skillModifier(passiveSkill.name)
            const bonus = passiveBonuses
                .filter(passiveBonus => passiveBonus.friendlySubtypeName.includes(passiveSkill.name))
                .reduce((total: number, passiveBonus) => total += passiveBonus.fixedValue ,0)

            return {
                ...passiveSkill,
                score: passiveSkill.score + modifier + bonus
            }
        })
    }

    private buildSkills(): Skill[] {
        const base = [
            { mod: 'DEX', name: 'Acrobatics'},
            { mod: 'WIS', name: 'Animal Handling'},
            { mod: 'INT', name: 'Arcana'},
            { mod: 'STR', name: 'Athletics'},
            { mod: 'CHA', name: 'Deception'},
            { mod: 'INT', name: 'History'},
            { mod: 'WIS', name: 'Insight'},
            { mod: 'CHA', name: 'Intimidation'},
            { mod: 'INT', name: 'Investigation'},
            { mod: 'WIS', name: 'Medicine'},
            { mod: 'INT', name: 'Nature'},
            { mod: 'WIS', name: 'Perception'},
            { mod: 'CHA', name: 'Performance'},
            { mod: 'CHA', name: 'Persuasion'},
            { mod: 'INT', name: 'Religion'},
            { mod: 'DEX', name: 'Sleight of Hand'},
            { mod: 'DEX', name: 'Stealth'},
            { mod: 'WIS', name: 'Survival'}
        ].concat(this.dndBeyondJson.data.customProficiencies.map((customProficiency: any) => {
            return {
                mod: this.abilityNames[customProficiency.statId -1].slice(0, 3).toUpperCase(),
                name: customProficiency.name
            }
        }))

        const skillNames = base.map(skill => skill.name)
        const skillProficiencies = this.filterModifiersByType('proficiency')
            .filter(proficiency => skillNames.includes(proficiency.friendlySubtypeName))
            .map(proficiency => proficiency.friendlySubtypeName)

        const skillExpertise = this.filterModifiersByType('expertise')
            .filter(proficiency => skillNames.includes(proficiency.friendlySubtypeName))
            .map(proficiency => proficiency.friendlySubtypeName)

        return base.map(skill => {
            const proficient = skillProficiencies.includes(skill.name)
            const expertise = skillExpertise.includes(skill.name)

            const baseModifier = this.abilityModifierByShortName(skill.mod)
            let abilityModifier = baseModifier
            if (expertise) {
                abilityModifier += (this.proficiency * 2)
            } else if (proficient) {
                abilityModifier += this.proficiency
            }

            return {
                ...skill,
                bonus: abilityModifier,
                proficient,
                expertise
            }
        })
    }

    private buildSaves(): Save[] {
        let bannedIds: number[] = []
        if (this.isMultiClass) {
            const multiClasses = this.dndBeyondJson.data.classes.slice(1)
            bannedIds = multiClasses.map((clas: any) => {
                const multiClassProficiency = clas.definition.classFeatures.find((feature: any) => feature.name === 'Proficiencies')
                if (multiClassProficiency) {
                    return multiClassProficiency.id
                }
            })

            console.log(bannedIds)
        }

        const saveProficiencies = this.filterModifiersByType('proficiency')
            .filter(proficiency => proficiency.subType.includes('saving-throws'))
            .filter(proficiency => !bannedIds.includes(proficiency.componentId))
            .map(proficientSave => proficientSave.friendlySubtypeName.split(' ')[0])

        return this.abilities.map(ability => {
            return {
                name: ability.name,
                modifier: saveProficiencies.includes(ability.name) ? ability.modifier + this.proficiency : ability.modifier,
                shortName: ability.name.slice(0, 3).toUpperCase()
            }
        })
    }

    private calculateProficiency() :number {
        if (this.level < 5) {
            return 2
        }
        if (this.level < 9) {
            return 3
        }
        if (this.level < 13) {
            return 4
        }
        if (this.level < 17) {
            return 5
        }
        return 6
    }

    private buildHp(): CharacterProfileHp {
        const hpPerLevelBonus = this.filterModifiersBySubType("hit-points-per-level")
            .reduce((total: number, modifier: Modifier) => total + modifier.fixedValue ,0) * this.level

        const constitutionModifier = this.abilities.filter(ability => ability.name === 'Constitution')[0].modifier
        return {
            constitutionBonus: this.level * constitutionModifier,
            base: this.dndBeyondJson.data.baseHitPoints + hpPerLevelBonus,
            bonus: this.dndBeyondJson.data.bonusHitPoints,
            override: this.dndBeyondJson.data.bonusHitPoints,
            removed: this.dndBeyondJson.data.removedHitPoints,
            temporary: this.dndBeyondJson.data.temporaryHitPoints
        }
    }

    private buildProfile(): CharacterProfile {
        console.log('background', this.dndBeyondJson.data.background)
        return {
            name: this.dndBeyondJson.data.name,
            race: this.dndBeyondJson.data.race.fullName,
            level: this.level,
            classes: this.dndBeyondJson.data.classes.map((clas: any) => `${clas.definition.name} ${clas.level}`).join(' / '),
            background: this.dndBeyondJson.data.background.definition.name,
            alignment: '',
            appearance: {
                size: '',
                gender: this.dndBeyondJson.data.gender,
                faith: this.dndBeyondJson.data.faith,
                age: this.dndBeyondJson.data.age,
                hair: this.dndBeyondJson.data.hair,
                eyes: this.dndBeyondJson.data.eyes,
                skin: this.dndBeyondJson.data.skin,
                height: this.dndBeyondJson.data.height,
                weight: this.dndBeyondJson.data.weight
            },
            xp: this.dndBeyondJson.data.currentXp
        }
    }

    private buildAbilities() {
        const stats = [...this.stats]
        const bonusModifiers = this.filterModifiers((modifier) => {
            return modifier.type === "bonus" && modifier.entityId !== null
        })
        stats.forEach(stat => {
            bonusModifiers.forEach(modifier => {
                if (stat.id === modifier.entityId) {
                    stat.value = stat.value + modifier.fixedValue
                }
            })
        })

        this.abilities = stats.map(stat => {
            return {
                name: this.abilityNames[stat.id - 1],
                value: stat.value,
                modifier: Math.floor((stat.value - 10) / 2),
                shortName: this.abilityNames[stat.id - 1].slice(0, 3).toUpperCase()
            }
        })
    }

    private abilityModifierByShortName(shortName: string): number {
        return this.abilities.find(ability => ability.shortName === shortName).modifier
    }

    private skillModifier(name: string): number {
        return this.skills.find(skill => skill.name === name).bonus
    }

    private filterModifiersByType(type: string): Modifier[] {
        return this.filterModifiers((modifier) => modifier.type === type)
    }

    private filterModifiersBySubType(subType: string): Modifier[] {
        return this.filterModifiers((modifier) => modifier.subType === subType)
    }

    private filterModifiers(filterFunction: ModifierFilterFunction): Modifier[] {        
        const keys = Object.keys(this.modifiers) as ModifierKeys[]
        return keys.map(modifierKey => {
            return this.modifiers[modifierKey].filter(filterFunction)
        }).flat()
    }
}

export type DmToolsData = {
    id: number
    avatarPath?: string
    profile: CharacterProfile
    abilities: Ability[]
    hp: CharacterProfileHp
    proficiency: number
    saves: Save[]
    skills: Skill[]
    passiveSkills: PassiveSkill[]
    proficiencyView: ProficiencyView[]
}

export type ProficiencyView ={
    type: string,
    value: string
}

export type PassiveSkill = {
    mod: string
    name: string,
    score: number
}

export type Skill = {
    name: string
    mod: string
    bonus: number
    proficient: boolean
    expertise: boolean
}

type ModifierFilterFunction = (arg0: Modifier) => boolean

type CharacterProfile = {
    name: string
    race: string
    level: number
    classes: string
    background: string
    alignment: string
    appearance: {
        size: string
        gender: string
        faith: string
        age: number
        hair: string
        eyes: string
        skin: string
        height: string
        weight: number
    }
    xp: number
}

export type Save = {
    name: string
    modifier: number
    shortName:string
}

export type Saves = {
    str: number
    int: number
    dex: number
    wis: number
    con: number
    cha: number
}

export type CharacterProfileHp = {
    constitutionBonus: number
    base: number
    bonus: number
    override: number
    removed: number
    temporary: number
}

export type Ability = {
    name: string
    modifier: number
    value: number
    shortName: string
}

type Stat = {
    id: number,
    name: string,
    value: number
}

type Modifiers = {
    race: Modifier[]
    class: Modifier[]
    background: Modifier[]
    item: Modifier[]
    feat: Modifier[]
    condition: Modifier[]
}

type ModifierKeys = keyof Modifiers

type Modifier = {
    fixedValue: number,
    id: number,
    entityId: number,
    entityTypeId: number,
    type: string,
    subType: string,
    dice: null,
    restriction: string,
    statId: null,
    requiresAttunement: boolean,
    duration: null,
    friendlyTypeName: string,
    friendlySubtypeName: string,
    isGranted: boolean,
    bonusTypes: [],
    value: number,
    availableToMulticlass: boolean,
    modifierTypeId: number,
    modifierSubTypeId: number,
    componentId: number,
    componentTypeId: number
}

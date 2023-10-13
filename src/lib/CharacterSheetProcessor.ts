import { app } from 'electron'
import path from 'path'
import armourClass from './character-sheet-processor/armourClass'
import abilities from './character-sheet-processor/abilities'
import spells from './character-sheet-processor/spells'
import inventory from './character-sheet-processor/inventory'
import weight from './character-sheet-processor/weight'

export default class CharacterSheetProcessor {
    private modifiers: Modifiers
    private stats: Stat[]
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
        this.abilities = this.buildAbilities()
        this.skills = this.buildSkills()
        return {
            ...this.dndBeyondJson,
            dmTools: this.dmTools()
        }
    }

    private dmTools(): DmToolsData {
        return {
            id: this.dndBeyondJson.data.id,
            avatarPath: path.join(app.getPath('userData'), 'avatars', this.dndBeyondJson.data.id + '.jpeg'),
            abilities: this.abilities,
            profile: this.buildProfile(),
            hp: this.buildHp(),
            proficiency: this.proficiency,
            saves: this.buildSaves(),
            skills: this.skills,
            passiveSkills: this.buildPassiveSkills(),
            proficiencyView: this.buildProficienciesView(),
            spellSlots: this.buildSpellSlots(),
            actions: this.buildActions(),
            spells: this.buildSpells(),
            currencies: this.buildCurrencies(),
            inventory: this.buildInventory(),
            weightData: this.buildWeightData(),
            deathSaves: this.dndBeyondJson.data.deathSaves,
            ac: this.buildArmour()
        }
    }

    private buildInventory(): ItemContainer[] {
        const items = this.dndBeyondJson.data.inventory
        const customItems = this.dndBeyondJson.data.customItems
        const carryCapacity = this.dndBeyondJson.data.stats[0].value * 15
        const characterValues = this.dndBeyondJson.data.characterValues
        const id = this.dndBeyondJson.data.id
        return inventory(items, customItems, carryCapacity, characterValues, id)
    }

    private buildAbilities(): Ability[] {
        const stats = this.stats
        const modifiers = this.filterModifiersByType('bonus')
        return abilities(stats, modifiers)
    }

    private buildArmour(): number {
        const abilities = this.abilities
        const inventory = this.buildInventory()
        const modifiers = this.filterModifiersBySubType('armored-armor-class')
            .concat(this.filterModifiersBySubType('unarmored-armor-class'))
        return armourClass(abilities, inventory, modifiers)
    }

    private buildWeightData() {
        const items = this.dndBeyondJson.data.inventory
        const currencies = this.dndBeyondJson.data.currencies
        const customItems = this.dndBeyondJson.data.customItems
        const id = this.dndBeyondJson.data.id
        return weight(items, customItems, currencies, id)
    }

    private buildSpells() {
        return spells(this.dndBeyondJson.data.classSpells)
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
        const names = proficiencies.filter(proficiency => proficiency.entityTypeId === entityId)
            .map(proficiency => proficiency.friendlySubtypeName)

        return [...new Set(names)].join(', ')
    }

    private buildPassiveSkills(): PassiveSkill[] {
        const passiveBonuses = this.filterModifiersByType('bonus')
            .filter((bonus) => bonus.subType.includes('passive'))

        return [
            { mod: 'WIS', name: 'Perception', score: 10 },
            { mod: 'INT', name: 'Investigation', score: 10 },
            { mod: 'WIS', name: 'Insight', score: 10 }
        ].map(passiveSkill => {
            const modifier = this.skillModifier(passiveSkill.name)
            const bonus = passiveBonuses
                .filter(passiveBonus => passiveBonus.friendlySubtypeName.includes(passiveSkill.name))
                .reduce((total: number, passiveBonus) => total += passiveBonus.fixedValue, 0)

            return {
                ...passiveSkill,
                score: passiveSkill.score + modifier + bonus
            }
        })
    }

    private buildSkills(): Skill[] {
        const abilityNames = this.buildAbilities().map(ability => ability.name)
        const base = [
            { mod: 'DEX', name: 'Acrobatics' },
            { mod: 'WIS', name: 'Animal Handling' },
            { mod: 'INT', name: 'Arcana' },
            { mod: 'STR', name: 'Athletics' },
            { mod: 'CHA', name: 'Deception' },
            { mod: 'INT', name: 'History' },
            { mod: 'WIS', name: 'Insight' },
            { mod: 'CHA', name: 'Intimidation' },
            { mod: 'INT', name: 'Investigation' },
            { mod: 'WIS', name: 'Medicine' },
            { mod: 'INT', name: 'Nature' },
            { mod: 'WIS', name: 'Perception' },
            { mod: 'CHA', name: 'Performance' },
            { mod: 'CHA', name: 'Persuasion' },
            { mod: 'INT', name: 'Religion' },
            { mod: 'DEX', name: 'Sleight of Hand' },
            { mod: 'DEX', name: 'Stealth' },
            { mod: 'WIS', name: 'Survival' }
        ].concat(this.dndBeyondJson.data.customProficiencies.map((customProficiency: any) => {
            return {
                mod: abilityNames[customProficiency.statId - 1].slice(0, 3).toUpperCase(),
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

    private calculateProficiency(): number {
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
            .reduce((total: number, modifier: Modifier) => total + modifier.fixedValue, 0) * this.level

        const constitutionModifier = this.abilities.filter(ability => ability.name === 'Constitution')[0].modifier
        return {
            constitutionBonus: this.level * constitutionModifier,
            base: this.dndBeyondJson.data.baseHitPoints + hpPerLevelBonus,
            bonus: this.dndBeyondJson.data.bonusHitPoints,
            override: this.dndBeyondJson.data.overrideHitPoints,
            removed: this.dndBeyondJson.data.removedHitPoints,
            temporary: this.dndBeyondJson.data.temporaryHitPoints
        }
    }

    private buildProfile(): CharacterProfile {
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

    private buildSpellSlots(): SpellSlot[] {
        const isCaster = this.dndBeyondJson.data.classes[0].definition.spellCastingAbilityId != null
        const levelSpellSlots = this.dndBeyondJson.data.classes[0].definition.spellRules.levelSpellSlots
        return levelSpellSlots[this.level].map((maxSlots: number, index: number) => {
            return {
                level: index + 1,
                max: (isCaster) ? maxSlots : 0,
                used: this.dndBeyondJson.data.spellSlots[index].used
            }
        }).filter((
            spellSlot: SpellSlot) => {
            return spellSlot.max > 0
        })
    }

    private buildActions(): Action[] {
        const actions = this.dndBeyondJson.data.actions
        return [...actions.race, ...actions.class, ...actions.feat].map(action => {
            return {
                name: action.name,
                description: action.description,
                snippet: action.snippet,
                limitedUse: {
                    maxUses: this.getMaxUses(action),
                    numberUsed: (action.limitedUse) ? action.limitedUse.numberUsed : 0
                }
            }
        })
    }

    private getMaxUses(action: any) {
        if (action.limitedUse) {
            if (action.limitedUse.useProficiencyBonus) {
                return this.proficiency
            }
            return action.limitedUse.maxUses
        }
        return 0
    }


    private buildCurrencies(): Currencies {
        const currencies = this.dndBeyondJson.data.currencies
        return {
            cp: currencies.cp,
            sp: currencies.sp,
            gp: currencies.gp,
            ep: currencies.ep,
            pp: currencies.pp,
            total: this.totalGold(currencies)
        }
    }

    private totalGold(currencies: any): number {
        const copper = currencies.cp / 100
        const silver = currencies.sp / 10
        const gold = currencies.gp
        const electrum = currencies.ep / 2
        const platinum = currencies.pp * 10
        return copper + silver + gold + electrum + platinum
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
    spellSlots: SpellSlot[]
    actions: Action[]
    spells: Spells[]
    currencies: Currencies
    inventory: ItemContainer[]
    weightData: WeightData
    deathSaves: DeathSaves
    ac: number
}

export type ItemContainer = {
    name: string
    equipped: boolean
    capacity: number
    contents: Item[]
}

export type WeightData = {
    carriedItemsWeight: number
    customItemsWeight: number
    coinWeight: number
    totalCarriedWeight: number
}

export type Item = {
    id: number
    definition: {
        id: string
        avatarUrl: string
        name: string
        weight: number
        rarity: string
        filterType: string
        isContainer: boolean
        cost: number
        bundleSize: number
        description?: string
        notes: string
        capacity: number
        armorClass: number
        armorTypeId: number
    },
    containerId: number
    equipped: boolean
    quantity: number
}

export type CustomItem = {
    id: number
    name: string
    description: string
    weight: number
    cost: number
    quantity: number
    notes: string
}

export type DeathSaves = {
    failCount: number
    successCount: number
    isStabilized: boolean
}

export type Currencies = {
    cp: number
    sp: number
    gp: number
    pp: number
    ep: number
    total: number
}

export type Spells = {
    level: number
    spells: SpellType[]
}

export type SpellType = {
    name: string
    level: number
    school: string
    duration: {
        durationInterval: number
        durationUnit: string
        durationType: string
    }
    range: {
        origin: string
        rangeValue: number
        aoeType: string
        aoeValue: number
    }
    description: string
    components: string
    tags: string[]
    prepared: boolean
    alwaysPrepared: boolean
    castingTime: CastingTime
}

export type CastingTime = 'action' | 'bonus' | 'reaction' | 'minutes'

export type Action = {
    name: string
    description: string
    snippet: string
    limitedUse: {
        maxUses: number
        numberUsed: number
    }
}

export type ProficiencyView = {
    type: string
    value: string
}

export type PassiveSkill = {
    mod: string
    name: string
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

export type CharacterProfile = {
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
    shortName: string
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

export type SpellSlot = {
    level: number
    max: number
    used: number
}

export type Stat = {
    id: number
    name: string
    value: number
}

export type Modifiers = {
    race: Modifier[]
    class: Modifier[]
    background: Modifier[]
    item: Modifier[]
    feat: Modifier[]
    condition: Modifier[]
}

type ModifierKeys = keyof Modifiers

export type Modifier = {
    fixedValue: number
    id: number
    entityId: number
    entityTypeId: number
    type: string
    subType: string
    dice: null
    restriction: string
    statId: number
    requiresAttunement: boolean
    duration: null
    friendlyTypeName: string
    friendlySubtypeName: string
    isGranted: boolean
    bonusTypes: []
    value: number
    availableToMulticlass: boolean
    modifierTypeId: number
    modifierSubTypeId: number
    componentId: number
    componentTypeId: number
}

export type CharacterValues = {
    typeId: number,
    value: string,
    valueId: string
}

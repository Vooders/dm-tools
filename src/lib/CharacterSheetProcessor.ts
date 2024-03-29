import { app } from 'electron'
import path from 'path'
import armourClass from './character-sheet-processor/armourClass'
import abilities from './character-sheet-processor/abilities'
import spells from './character-sheet-processor/spells'
import inventory from './character-sheet-processor/inventory'
import weight from './character-sheet-processor/weight'
import proficienciesView from './character-sheet-processor/proficienciesView'
import skills from './character-sheet-processor/skills'
import passiveSkills from './character-sheet-processor/passiveSkills'
import saves from './character-sheet-processor/saves'
import wealth from './character-sheet-processor/wealth'
import * as hitDice from './character-sheet-processor/hitDice'
import action from './character-sheet-processor/actions'
import healthPotions, { HealthPotionsType } from './character-sheet-processor/healthPotions'
import creatures, { Creature } from './character-sheet-processor/creatures'

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
            ac: this.buildArmour(),
            wealth: this.buildWealth(),
            hitDice: this.buildHitDice(),
            healthPotions: this.buildHealthPotions(),
            creatures: this.buildCreatures(),
            inspiration: this.dndBeyondJson.data.inspiration,
            milestoneProgression: this.dndBeyondJson.data.preferences.progressionType === 2
        }
    }

    private buildCreatures() {
        return creatures(this.dndBeyondJson.data.creatures).map((playerCreature: Creature) => {
            if (playerCreature.name === 'Homunculus Servant') {
                playerCreature.hp.max = 1 + this.getModifier('INT') + this.level
            }

            return playerCreature
        })
    }

    private buildHealthPotions() {
        return healthPotions(this.dndBeyondJson.data.inventory)
    }

    private buildHitDice() {
        return hitDice.calculate(this.dndBeyondJson.data.classes)
    }

    private buildWealth(): Wealth {
        const inventory = this.buildInventory()
        const totalCurrency = this.buildCurrencies().total
        return wealth(inventory, totalCurrency)
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

    private buildWeightData(): WeightData {
        const inventory = this.buildInventory()
        const currencies = this.buildCurrencies()
        const ignoreCoinWeight = this.dndBeyondJson.data.preferences.ignoreCoinWeight
        return weight(inventory, currencies, ignoreCoinWeight)
    }

    private buildSpells(): Spells[] {
        return spells(this.dndBeyondJson.data.classSpells)
    }

    private buildProficienciesView(): ProficiencyView[] {
        const customProficiencies = this.dndBeyondJson.data.customProficiencies
        const skills = this.skills
        const languages = this.filterModifiersByType('language')
        const proficiencies = this.filterModifiersByType('proficiency')
        return proficienciesView(customProficiencies, skills, proficiencies, languages)
    }

    private buildSkills(): Skill[] {
        const abilities = this.abilities
        const customProficiencies = this.dndBeyondJson.data.customProficiencies
        const proficiencies = this.filterModifiersByType('proficiency')
        const expertise = this.filterModifiersByType('expertise')
        const proficiency = this.proficiency
        return skills(abilities, customProficiencies, proficiencies, expertise, proficiency)
    }

    private buildPassiveSkills(): PassiveSkill[] {
        const passiveBonuses = this.filterModifiersByType('bonus')
        const skills = this.skills
        return passiveSkills(skills, passiveBonuses)
    }

    private buildSaves(): Save[] {
        const classes = this.dndBeyondJson.data.classes
        const proficiencies = this.filterModifiersByType('proficiency')
        const abilities = this.abilities
        const isMultiClass = this.isMultiClass
        const proficiency = this.proficiency
        return saves(classes, proficiencies, abilities, isMultiClass, proficiency)
    }

    private buildActions(): Action[] {
        const actions = this.dndBeyondJson.data.actions
        const feats = this.dndBeyondJson.data.spells.feat
        const inventory = this.dndBeyondJson.data.inventory
        return action(actions, feats, inventory, this.proficiency)
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

    private getModifier(shortName:'CON'|'STR'|'DEX'|'INT'|'CHA'|'WIS' ): number {
        return this.abilities.filter(ability => ability.shortName === shortName)[0].modifier
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
        const classes = this.dndBeyondJson.data.classes[0]
        const canCastSpells = this.canCastSpells(classes)
        const levelSpellSlots = classes.definition.spellRules.levelSpellSlots
        return levelSpellSlots[this.level].map((maxSlots: number, index: number) => {
            return {
                level: index + 1,
                max: (canCastSpells) ? maxSlots : 0,
                used: this.dndBeyondJson.data.spellSlots[index].used
            }
        }).filter((
            spellSlot: SpellSlot) => {
            return spellSlot.max > 0
        })
    }

    private canCastSpells(classes: any): boolean {
        if (classes.definition.canCastSpells) {
            return true
        }
        if (classes.subclassDefinition != undefined) {
            return classes.subclassDefinition.canCastSpells
        }
        return false
    }

    private buildCurrencies(): CurrenciesType {
        const currencies = this.dndBeyondJson.data.currencies
        return {
            cp: currencies.cp,
            sp: currencies.sp,
            gp: currencies.gp,
            ep: currencies.ep,
            pp: currencies.pp,
            total: Math.round(this.totalGold(currencies) * 100)/100
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
    currencies: CurrenciesType
    inventory: ItemContainer[]
    weightData: WeightData
    deathSaves: DeathSaves
    ac: number
    wealth: Wealth
    hitDice: hitDice.HitDice[]
    healthPotions: HealthPotionsType
    creatures: Creature[]
    inspiration: boolean
    milestoneProgression: boolean
}

export type ItemContainer = {
    name: string
    equipped: boolean
    weight: number
    capacity: number
    contents: Item[]
    contentsWeight: number
}

export type WeightData = {
    carriedItemsWeight: number
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
        snippet?: string
        canEquip?: boolean
    },
    containerId: number
    equipped: boolean
    quantity: number
    limitedUse: {
        maxUses?: number
        numberUsed?: number
        useProficiencyBonus?: boolean
    }
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

export type CurrenciesType = {
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
    typeId: number
    value: string
    valueId: string
}

export type Wealth = {
    containers: ContainerWealth[]
    totalContainerWealth: number
    totalWealth: number
}

export type ContainerWealth = {
    name: string
    value: number
}

export type CustomProficiency = {
    id: number
    name: string
    type: number
    statId: number
    proficiencyLevel: number
    notes: string
    description: string
    override: number
    magicBonus: number
    miscBonus: number
}

export type CharacterClass = {
    level: number
    definition: {
        hitDice: number
    }
    hitDiceUsed: number
}

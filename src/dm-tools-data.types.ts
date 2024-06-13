export type DmToolsData = {
    id: string
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
    spells: SpellsType[]
    currencies: CurrenciesType
    inventory: ItemContainer[]
    weightData: WeightData
    deathSaves: DeathSaves
    ac: number
    wealth: Wealth
    hitDice: HitDice[]
    healthPotions: HealthPotionsType
    creatures: CreatureType[]
    inspiration: boolean
    milestoneProgression: boolean
}

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

export type Ability = {
    name: string
    modifier: number
    value: number
    shortName: string
}

export type CharacterProfileHp = {
    constitutionBonus: number
    base: number
    bonus: number
    override: number
    removed: number
    temporary: number
}

export type Save = {
    name: string
    modifier: number
    shortName: string
    proficient: boolean
    expertise: boolean
}

export type Skill = {
    name: string
    mod: string
    bonus: number
    proficient: boolean
    expertise: boolean
}

export type PassiveSkill = {
    mod: string
    name: string
    score: number
}

export type ProficiencyView = {
    name: string
    value: string[]
}

export type SpellSlot = {
    level: number
    max: number
    used: number
}

export type Action = {
    name: string
    description: string
    snippet: string
    limitedUse: {
        maxUses: number
        numberUsed: number
    }
}

export type SpellsType = {
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

export type CurrenciesType = {
    cp: number
    sp: number
    gp: number
    pp: number
    ep: number
    total: number
}

export type ItemContainer = {
    name: string
    equipped: boolean
    weight: number
    capacity: number
    contents: Item[]
    contentsWeight: number
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

export type WeightData = {
    carriedItemsWeight: number
    coinWeight: number
    totalCarriedWeight: number
}

export type DeathSaves = {
    failCount: number
    successCount: number
    isStabilized: boolean
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

export type HitDice = {
    dice: string
    max: number
    used: number
}

export type HealthPotionsType = {
    normal: number
    greater: number
    superior: number
    supreme: number
}

export type CreatureType = {
    customName: string
    name: string
    ac: number
    hp: {
        max: number
        removed: number
    }
}

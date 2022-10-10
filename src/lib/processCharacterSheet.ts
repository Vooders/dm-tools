
export default function processCharacterSheet(dndBeyondJson: any) {
    return {
        ...dndBeyondJson,
        dmTools: {
            id: dndBeyondJson.data.id,
            profile: buildProfile(dndBeyondJson),
            abilities: buildAbilities(dndBeyondJson.data.stats, dndBeyondJson.data.modifiers)
        }
    }
}

const buildAbilities = (stats: Stat[], modifiers: Modifiers): Ability[] => {
    return calculateBonuses(stats, modifiers)
        .map(stat => {
            return {
                name: abilityNames[stat.id - 1],
                value: stat.value,
                modifier: modifier(stat.value)
            }
        })
}

const calculateBonuses = (stats: Stat[], modifiers: Modifiers): Stat[] => {
    type Keys = keyof typeof modifiers
    const keys = Object.keys(modifiers) as Keys[]
    const bonusModifiers = keys.map(modifierKey => {
        return modifiers[modifierKey].filter(modifier => modifier.type === "bonus" && modifier.entityId)
    }).flat()
    stats.forEach(stat => {
        bonusModifiers.forEach(modifier => {
            if (stat.id === modifier.entityId) {
                stat.value = stat.value + modifier.fixedValue
            }
        })
    })
    return stats
}



const modifier = (value: number): number => {
    return Math.floor((value - 10) / 2)
}

const abilityNames = [
    'Strength',
    'Dexterity',
    'Constitution',
    'Intelligence',
    'Wisdom',
    'Charisma'
]

export type DmToolsData = {
    id: number
    avatarPath?: string
    profile: CharacterProfile
    abilities: Ability[]
}

const calculateLevel = (classes: any): number => {
    return classes.reduce((total: number, clas: any) => {
        return total + clas.level
    }, 0)
}

const buildProfile = (dndBeyondJson: any): CharacterProfile => {
    return {
        name: dndBeyondJson.data.name,
        race: dndBeyondJson.data.race.fullName,
        level: calculateLevel(dndBeyondJson.data.classes),
        classes: dndBeyondJson.data.classes.map((clas: any) => `${clas.definition.name} ${clas.level}`).join(' / '),
        background: dndBeyondJson.data.background.definition.name,
        alignment: '',
        appearance: {
            size: '',
            gender: dndBeyondJson.data.gender,
            faith: dndBeyondJson.data.faith,
            age: dndBeyondJson.data.age,
            hair: dndBeyondJson.data.hair,
            eyes: dndBeyondJson.data.eyes,
            skin: dndBeyondJson.data.skin,
            height: dndBeyondJson.data.height,
            weight: dndBeyondJson.data.weight
        },
        hp: {
            base: dndBeyondJson.data.baseHitPoints,
            bonus: dndBeyondJson.data.bonusHitPoints,
            override: dndBeyondJson.data.bonusHitPoints,
            removed: dndBeyondJson.data.removedHitPoints,
            temporary: dndBeyondJson.data.temporaryHitPoints
        },
        xp: dndBeyondJson.data.currentXp
    }
}

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
    hp: CharacterProfileHp
    xp: number
}

export type CharacterProfileHp = {
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

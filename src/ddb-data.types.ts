export type CustomItem = {
    id: number
    name: string
    description: string
    weight: number
    cost: number
    quantity: number
    notes: string
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

export type ModifierKeys = keyof Modifiers

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

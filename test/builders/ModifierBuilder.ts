import { Modifier } from "../../src/lib/CharacterSheetProcessor"

export default class ModifierBuilder {
    constructor(
        private fixedValue: number = 0,
        private id: number = 0,
        private entityId: number = 0,
        private entityTypeId: number = 0,
        private type: string = '',
        private subType: string = '',
        private dice: null = null,
        private restriction: string = '',
        private statId: number = 0,
        private requiresAttunement: boolean = false,
        private duration: null = null,
        private friendlyTypeName: string = '',
        private friendlySubtypeName: string = '',
        private isGranted: boolean = false,
        private bonusTypes: [] = [],
        private value: number = 0,
        private availableToMulticlass: boolean = false,
        private modifierTypeId: number = 0,
        private modifierSubTypeId: number = 0,
        private componentId: number = 0,
        private componentTypeId: number = 0
    ){}

    public withFixedValue(fixedValue: number) {
        this.fixedValue = fixedValue
        return this
    }

    public withId(id: number) {
        this.id = id
        return this
    }

    public withEntityId(entityId: number) {
        this.entityId = entityId
        return this
    }

    public withEntityTypeId(entityTypeId: number) {
        this.entityTypeId = entityTypeId
        return this
    }

    public withType(type: string) {
        this.type = type
        return this
    }

    public withSubType(subType: string) {
        this.subType = subType
        return this
    }

    public withDice(dice: null) {
        this.dice = dice
        return this
    }

    public withRestriction(restriction: string) {
        this.restriction = restriction
        return this
    }

    public withStat(stat: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma') {
        if (stat == 'strength') {
            this.statId = 1
        } else if (stat == 'dexterity') {
            this.statId = 2
        } else if (stat == 'constitution') {
            this.statId = 3
        } else if (stat == 'intelligence') {
            this.statId = 4
        } else if (stat == 'wisdom') {
            this.statId = 5
        } else if (stat == 'charisma') {
            this.statId = 6
        }
        return this
    }

    public withStatId(statId: number) {
        this.statId = statId
        return this
    }

    public withRequiresAttunement(requiresAttunement: boolean) {
        this.requiresAttunement = requiresAttunement
        return this
    }

    public withDuration(duration: null) {
        this.duration = duration
        return this
    }

    public withFriendlyTypeName(friendlyTypeName: string) {
        this.friendlyTypeName = friendlyTypeName
        return this
    }

    public withFriendlySubTypeName(friendlySubtypeName: string) {
        this.friendlySubtypeName = friendlySubtypeName
        return this
    }

    public withIsGranted(isGranted: boolean) {
        this.isGranted = isGranted
        return this
    }

    public withBonusTypes(bonusTypes: []) {
        this.bonusTypes = bonusTypes
        return this
    }

    public withValue(value: number) {
        this.value = value
        return this
    }

    public withAvailableToMulticlass(availableToMulticlass: boolean) {
        this.availableToMulticlass = availableToMulticlass
        return this
    }

    public withModifierTypeId(modifierTypeId: number) {
        this.modifierTypeId = modifierTypeId
        return this
    }

    public withModifierSubTypeId(modifierSubTypeId: number) {
        this.modifierSubTypeId = modifierSubTypeId
        return this
    }

    public withComponentId(componentId: number) {
        this.componentId = componentId
        return this
    }

    public withComponentTypeId(componentTypeId: number) {
        this.componentTypeId = componentTypeId
        return this
    }

    public build(): Modifier {
        return {
            fixedValue: this.fixedValue,
            id: this.id,
            entityId: this.entityId,
            entityTypeId: this.entityTypeId,
            type: this.type,
            subType: this.subType,
            dice: this.dice,
            restriction: this.restriction,
            statId: this.statId,
            requiresAttunement: this.requiresAttunement,
            duration: this.duration,
            friendlyTypeName: this.friendlyTypeName,
            friendlySubtypeName: this.friendlySubtypeName,
            isGranted: this.isGranted,
            bonusTypes: this.bonusTypes,
            value: this.value,
            availableToMulticlass: this.availableToMulticlass,
            modifierTypeId: this.modifierTypeId,
            modifierSubTypeId: this.modifierSubTypeId,
            componentId: this.componentId,
            componentTypeId: this.componentTypeId
        }
    }
}

import { Item } from "../../src/dm-tools-data.types"

export default class ItemBuilder {
    constructor(
        private id: number = 0,
        private definitionId: string = '',
        private avatarUrl: string = '',
        private name: string = '',
        private weight: number = 0,
        private rarity: string = '',
        private filterType: string = '',
        private isContainer: boolean = false,
        private cost: number = 0,
        private bundleSize: number = 1,
        private description: string = '',
        private notes: string = '',
        private capacity: number = 0,
        private armorClass: number = 0,
        private armorTypeId: number = 0,
        private containerId: number = 0,
        private equipped: boolean = false,
        private quantity: number = 1,
        private snippet: string = '',
        private canEquip: boolean = false,
        private maxUses: number = 0,
        private numberUsed: number = 0,
        private useProficiencyBonus: boolean = false
    ) { }

    public withId(id: number) {
        this.id = id
        return this
    }

    public withDefinitionId(definitionId: string) {
        this.definitionId = definitionId
        return this
    }

    public withAvatarUrl(avatarUrl: string) {
        this.avatarUrl = avatarUrl
        return this
    }

    public withName(name: string) {
        this.name = name
        return this
    }

    public withWeight(weight: number) {
        this.weight = weight
        return this
    }

    public withRarity(rarity: string) {
        this.rarity = rarity
        return this
    }

    public withFilterType(filterType: string) {
        this.filterType = filterType
        return this
    }

    public withIsContainer(isContainer: boolean) {
        this.isContainer = isContainer
        return this
    }

    public withCost(cost: number) {
        this.cost = cost
        return this
    }

    public withBundleSize(bundleSize: number) {
        this.bundleSize = bundleSize
        return this
    }

    public withDescription(description: string) {
        this.description = description
        return this
    }

    public withNotes(notes: string) {
        this.notes = notes
        return this
    }

    public withCapacity(capacity: number) {
        this.capacity = capacity
        return this
    }

    public withArmorClass(armorClass: number) {
        this.armorClass = armorClass
        return this
    }

    public withArmorType(armorType: 'light' | 'medium' | 'heavy' | 'shield') {
        if (armorType === 'shield') {
            this.armorTypeId = 4
        } else if (armorType === 'heavy') {
            this.armorTypeId = 3
        } else if (armorType === 'medium') {
            this.armorTypeId = 2
        } else if (armorType === 'light') {
            this.armorTypeId = 1
        }
        return this
    }

    public withArmorTypeId(armorTypeId: number) {
        this.armorTypeId = armorTypeId
        return this
    }

    public withContainerId(containerId: number) {
        this.containerId = containerId
        return this
    }

    public withEquipped(equipped: boolean) {
        this.equipped = equipped
        return this
    }

    public withQuantity(quantity: number) {
        this.quantity = quantity
        return this
    }

    public withSnippet(snippet: string) {
        this.snippet = snippet
        return this
    }

    public withCanEquip(canEquip: boolean) {
        this.canEquip = canEquip
        return this
    }

    public withMaxUses(maxUses: number) {
        this.maxUses = maxUses
        return this
    }

    public withNumberUsed(numberUsed: number) {
        this.numberUsed = numberUsed
        return this
    }

    public withUseProficiencyBonus(useProficiencyBonus: boolean) {
        this.useProficiencyBonus = useProficiencyBonus
        return this
    }
    public build(): Item {
        return {
            id: this.id,
            definition: {
                id: this.definitionId,
                avatarUrl: this.avatarUrl,
                name: this.name,
                weight: this.weight,
                rarity: this.rarity,
                filterType: this.filterType,
                isContainer: this.isContainer,
                cost: this.cost,
                bundleSize: this.bundleSize,
                description: this.description,
                notes: this.notes,
                capacity: this.capacity,
                armorClass: this.armorClass,
                armorTypeId: this.armorTypeId,
                snippet: this.snippet,
                canEquip: this.canEquip
            },
            containerId: this.containerId,
            equipped: this.equipped,
            quantity: this.quantity,
            limitedUse: {
                maxUses: this.maxUses,
                numberUsed: this.numberUsed,
                useProficiencyBonus: this.useProficiencyBonus
            }
        }
    }
}

import { CharacterValues } from "../../ddb-data.types"
import { ItemContainer, Item } from "../../dm-tools-data.types"

export default function inventory(inventory: any, customItemInventory: any, carryCapacity: number, characterValues: CharacterValues[], id: number): ItemContainer[] {
    const items = inventory.map((item: any): Item => {
        const newItem = {
            id: item.id,
            definition: {
                id: item.definition.id,
                avatarUrl: item.definition.avatarUrl,
                name: item.definition.name,
                weight: item.definition.weight,
                rarity: item.definition.rarity,
                filterType: item.definition.filterType,
                isContainer: item.definition.isContainer,
                cost: item.definition.cost,
                bundleSize: item.definition.bundleSize > 0 ? item.definition.bundleSize : 1,
                notes: item.definition.notes,
                capacity: item.definition.capacityWeight,
                armorClass: item.definition.armorClass,
                armorTypeId: item.definition.armorTypeId,
            },
            containerId: item.containerEntityId,
            equipped: item.equipped,
            quantity: item.quantity,
            limitedUse: {},
            modifiers: item.definition.grantedModifiers
        }
        return addCustomValues(newItem)
    })

    const customItems = customItemInventory.map((item: any): Item => {
        return {
            id: item.id,
            definition: {
                id: null,
                avatarUrl: null,
                name: item.name,
                weight: item.weight,
                rarity: null,
                filterType: null,
                isContainer: false,
                cost: item.cost,
                bundleSize: 1,
                description: item.description,
                notes: item.notes,
                capacity: null,
                armorClass: null,
                armorTypeId: null
            },
            containerId: null,
            equipped: false,
            quantity: item.quantity,
            limitedUse: {},
            modifiers: {}
        }
    })

    const containers = findContainers(items)
    const equipmentItems = removeContainers(fillBag(id, items))

    return [
        {
            name: 'Equipment',
            equipped: true,
            weight: 0,
            capacity: carryCapacity,
            contents: equipmentItems,
            contentsWeight: totalItemsWeight(equipmentItems)
        },
        ...containers.map((container: any) => {
            const containerItems = fillBag(container.id, items)
            return {
                name: container.definition.name,
                equipped: container.equipped,
                weight: container.definition.weight,
                capacity: container.definition.capacity,
                contents: containerItems,
                contentsWeight: totalItemsWeight(containerItems)
            }
        }),
        {
            name: 'Custom Items',
            equipped: true,
            weight: 0,
            capacity: null,
            contents: customItems,
            contentsWeight: totalItemsWeight(customItems)
        },
    ]

    function findContainers(items: Item[]): Item[] {
        return items.filter(item => item.definition.isContainer)
    }

    function fillBag(id: number, items: Item[]): Item[] {
        return items.filter(item => item.containerId === id)
    }

    function totalItemsWeight(items: Item[]): number {
        return Math.round((items.reduce((acc, item) =>
            acc + (item.definition.weight / item.definition.bundleSize) * item.quantity, 0)) * 100) / 100
    }

    function addCustomValues(item: Item): Item {
        const valueType = {
            name: 8,
            notes: 9,
            cost: 19,
            weight: 22,
            capacity: 50
        }
        characterValues.forEach((value: CharacterValues) => {
            if (value.valueId === item.id.toString()) {
                switch (value.typeId) {
                    case valueType.name:
                        item.definition.name = value.value
                        break
                    case valueType.notes:
                        item.definition.notes = value.value
                        break
                    case valueType.cost:
                        item.definition.cost = parseInt(value.value)
                        break
                    case valueType.weight:
                        item.definition.weight = parseInt(value.value)
                        break
                    case valueType.capacity:
                        item.definition.capacity = parseInt(value.value)
                }
            }
        })
        return item
    }

    function removeContainers(items: Item[]): Item[] {
        return items.filter(item => !item.definition.isContainer)
    }
}

import { CharacterValues, ItemType, ItemContainer } from "../CharacterSheetProcessor"

export default function inventory(inventory: any, customItemInventory: any, carryCapacity: number, characterValues: CharacterValues[], id: number): ItemContainer[] {
    const items = inventory.map((item: any): ItemType => {
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
                bundleSize: item.definition.bundleSize,
                notes: item.definition.notes,
                capacity: item.definition.capacityWeight,
                armorClass: item.definition.armorClass,
                armorTypeId: item.definition.armorTypeId
            },
            containerId: item.containerEntityId,
            equipped: item.equipped,
            quantity: item.quantity
        }
        return addCustomValues(newItem)
    })

    const customItems = customItemInventory.map((item: any): ItemType => {
        return {
            id: item.id,
            definition: {
                id: null,
                avatarUrl: null,
                name: item.name,
                weight: item.weight,
                rarity: null,
                filterType: null,
                isContainer: null,
                cost: item.cost,
                bundleSize: 1,
                description: item.description,
                notes: item.notes,
                capacity: null,
                armorClass: null,
                armorTypeId: null

            },
            containerId: null,
            equipped: item.equipped,
            quantity: item.quantity
        }
    })

    const containers = findContainers(items)

    return [
        {
            name: 'Equipment',
            equipped: true,
            capacity: carryCapacity,
            contents: fillBag(id, items)
        },
        ...containers.map((container: any) => {
            return {
                name: container.definition.name,
                equipped: container.equipped,
                capacity: container.definition.capacity,
                contents: fillBag(container.id, items)
            }
        }),
        {
            name: 'Custom Items',
            equipped: true,
            capacity: null,
            contents: customItems
        },
    ]

    function findContainers(items: ItemType[]): ItemType[] {
        return items.filter(item => item.definition.isContainer)
    }

    function fillBag(id: number, items: ItemType[]): ItemType[] {
        return items.filter(item => item.containerId === id)
    }

    function addCustomValues(item: ItemType): ItemType {
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
}

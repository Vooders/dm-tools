import { Currencies, Item, WeightData } from "../CharacterSheetProcessor"

export default function weight(inventory: any, customItems: any, currencies: Currencies, id: number): WeightData {
    const carriedItemsWeight = totalCarriedItemsWeight()
    const customItemsWeight = totalCustomItemsWeight()
    const coinWeight = totalCoinWeight()
    const totalCarriedWeight = Math.round((carriedItemsWeight + coinWeight + customItemsWeight) * 100) / 100
    return {
        carriedItemsWeight,
        customItemsWeight,
        coinWeight,
        totalCarriedWeight
    }

    function totalCoinWeight(): number {
        const totalCoins = currencies.cp + currencies.sp + currencies.gp + currencies.ep + currencies.pp
        return totalCoins * 0.02
    }

    function totalItemsWeight(inventory: any): number {
        return inventory.reduce((acc: number, item: any) =>
            acc + (item.definition.weight / item.definition.bundleSize) * item.quantity, 0)
    }

    function removeUnequippedContainers(inventory: any): any[] {
        return inventory.filter((item: any) =>
            (item.definition.isContainer && !item.equipped) === false
        )
    }

    function totalCarriedItemsWeight(): number {
        const equippedContainerIds = findEquippedContainerIds(inventory)

        let carriedItems: any = []
        equippedContainerIds.forEach((id: number) => {
            carriedItems.push(inventory.filter((item: any) =>
                item.containerEntityId === id
            ))
        })
        const filteredCarriedItems = removeUnequippedContainers(carriedItems.flat())
        return Math.round((totalItemsWeight(filteredCarriedItems)) * 100) / 100
    }
    function totalCustomItemsWeight() {
        return customItems.reduce((acc: number, item: any) =>
            acc + (item.weight * item.quantity), 0)
    }

    function findEquippedContainerIds(items: Item[]): any {
        return items.filter(item => item.definition.isContainer && item.equipped)
            .map((container: any) => container.id).concat(id)
    }
}

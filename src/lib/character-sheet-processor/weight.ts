import { Currencies, ItemContainer, WeightData } from "../CharacterSheetProcessor"

export default function weight(inventory: ItemContainer[], currencies: Currencies, ignoreCoinWeight: boolean): WeightData {
    const carriedItemsWeight = totalCarriedItemsWeight()
    const customItemsWeight = totalCustomItemsWeight()
    const coinWeight = ignoreCoinWeight ? 0 : totalCoinWeight()
    const totalCarriedWeight = Math.round((carriedItemsWeight + customItemsWeight + coinWeight) * 100) / 100

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

    function totalItemsWeight(items: any): number {
        return items.reduce((acc: number, item: any) =>
            acc + (item.definition.weight / item.definition.bundleSize) * item.quantity, 0)
    }

    function removeUnequippedContainers(items: any): any[] {
        return items.filter((item: any) =>
            (item.definition.isContainer && !item.equipped) === false
        )
    }

    function totalCarriedItemsWeight(): number {
        const items = getEquippedContainers(inventory).map((container) => container.contents).flat()
        const equippedItems = removeUnequippedContainers(items)
        return Math.round((totalItemsWeight(equippedItems)) * 100) / 100
    }

    function totalCustomItemsWeight() {
        const customItems = getCustomItemContainer(inventory).map((container) => container.contents).flat()
        return Math.round((totalItemsWeight(customItems)) * 100) / 100

    }

    function getEquippedContainers(inventory: ItemContainer[]) {
        return inventory.filter(container => container.equipped)
    }

    function getCustomItemContainer(inventory: ItemContainer[]) {
        return inventory.filter(container => container.name === 'Custom Items')

    }
}

import { ContainerWeight, Currencies, Item, ItemContainer, WeightData } from "../CharacterSheetProcessor"

export default function weight(inventory: ItemContainer[], currencies: Currencies, ignoreCoinWeight: boolean): WeightData {
    const carriedItemsWeight = totalCarriedItemsWeight()
    const coinWeight = ignoreCoinWeight ? 0 : totalCoinWeight()
    const containerWeights = buildContainerWeights()
    const totalCarriedWeight = Math.round((carriedItemsWeight + coinWeight) * 100) / 100
    console.log(carriedItemsWeight)
    console.log(coinWeight)
    console.log(containerWeights)
    console.log(totalCarriedWeight)
    return {
        carriedItemsWeight,
        coinWeight,
        containerWeights,
        totalCarriedWeight
    }

    function totalCoinWeight(): number {
        const totalCoins = currencies.cp + currencies.sp + currencies.gp + currencies.ep + currencies.pp
        return totalCoins * 0.02
    }

    function totalItemsWeight(items: Item[]): number {
        return Math.round((items.reduce((acc, item) =>
            acc + (item.definition.weight / item.definition.bundleSize) * item.quantity, 0)) * 100) / 100
    }

    function removeUnequippedContainers(items: Item[]): Item[] {
        return items.filter(item => (item.definition.isContainer && !item.equipped) === false)
    }

    function totalCarriedItemsWeight(): number {
        const equippedItems = getEquippedContainers(inventory).map((container) => container.contents).flat()
        const filteredEquippedItems = removeUnequippedContainers(equippedItems)
        return totalItemsWeight(filteredEquippedItems)
    }

    function getEquippedContainers(inventory: ItemContainer[]) {
        return inventory.filter(container => container.equipped)
    }

    function buildContainerWeights(): ContainerWeight[] {
        return inventory.map((container) => {
            if (container.name === 'Equipment') container.contents = removeUnequippedContainers(container.contents)
            return {
                name: container.name,
                weight: totalItemsWeight(container.contents)
            }
        })
    }
}

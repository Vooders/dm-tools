import { ContainerWeight, Currencies, Item, ItemContainer, WeightData } from "../CharacterSheetProcessor"

export default function weight(inventory: ItemContainer[], currencies: Currencies, ignoreCoinWeight: boolean): WeightData {
    const carriedItemsWeight = totalCarriedItemsWeight()
    const coinWeight = ignoreCoinWeight ? 0 : totalCoinWeight()
    const containers = buildContainers()
    const totalCarriedWeight = Math.round((carriedItemsWeight + coinWeight) * 100) / 100
    console.log(carriedItemsWeight)
    console.log(coinWeight)
    console.log(containers)
    console.log(totalCarriedWeight)
    return {
        carriedItemsWeight,
        coinWeight,
        containers,
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

    function removeContainerItems(items: Item[]): Item[] {
        return items.filter(item => !item.definition.isContainer)
    }

    function totalCarriedItemsWeight(): number {
        return buildContainers().filter(container => container.equipped)
            .reduce((acc, container) => acc + (container.contentsWeight + container.weight), 0)
    }

    function buildContainers(): ContainerWeight[] {
        return inventory.map((container) => {
            if (container.name === 'Equipment') container.contents = removeContainerItems(container.contents)
            return {
                name: container.name,
                equipped: container.equipped,
                weight: container.weight,
                contentsWeight: totalItemsWeight(container.contents)
            }
        })
    }
}

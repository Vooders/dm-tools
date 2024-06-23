import { ItemContainer, CurrenciesType, WeightData } from "../../dm-tools-data.types"
import { Logger } from '../../logger/Logger'

const logger = new Logger('[characterSheetProcessor][weight]')

export default function weight(inventory: ItemContainer[], currencies: CurrenciesType, ignoreCoinWeight: boolean): WeightData {
    logger.debug('Calculating weight')
    const carriedItemsWeight = totalCarriedItemsWeight()
    const coinWeight = ignoreCoinWeight ? 0 : totalCoinWeight()
    const totalCarriedWeight = Math.round((carriedItemsWeight + coinWeight) * 100) / 100

    return {
        carriedItemsWeight,
        coinWeight,
        totalCarriedWeight
    }

    function totalCoinWeight(): number {
        const totalCoins = currencies.cp + currencies.sp + currencies.gp + currencies.ep + currencies.pp
        return totalCoins * 0.02
    }

    function totalCarriedItemsWeight(): number {
        return inventory.filter(container => container.equipped)
            .reduce((acc, container) => acc + (container.contentsWeight + container.weight), 0)
    }
}

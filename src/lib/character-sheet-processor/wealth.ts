import { ItemContainer, ContainerWealth, Item } from "../../dm-tools-data.types"
import { Logger } from '../../logger/Logger'

const logger = new Logger('[characterSheetProcessor][wealth]')

export default function wealth(inventory: ItemContainer[], totalCurrency: number): Wealth {
    logger.debug('Calculating wealth')
    function reduceAndRound<T>(someArray: T[], reduceFunc: (acc: number, item: T) => number): number {
        const result = someArray.reduce(reduceFunc, 0)
        return Math.round(result * 100) / 100
    }

    function buildContainers(itemContainers: ItemContainer[]): ContainerWealth[] {
        return itemContainers.map((inventory) => {
            return {
                name: inventory.name,
                value: reduceAndRound<Item>(inventory.contents, (total, item) => {
                    return total + (item.definition.cost / item.definition.bundleSize) * item.quantity
                })
            }
        })
    }

    const containers = buildContainers(inventory)
    const totalContainerWealth = reduceAndRound<ContainerWealth>(containers, (total, container) => total + container.value)
    const totalWealth = Math.round(totalContainerWealth + (totalCurrency * 100) / 100)

    return {
        containers,
        totalContainerWealth,
        totalWealth
    }
}

type Wealth = {
    containers: ContainerWealth[]
    totalContainerWealth: number
    totalWealth: number
}

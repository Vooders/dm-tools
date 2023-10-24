import { Item, ItemContainer } from '../../../src/lib/CharacterSheetProcessor'
import wealth from '../../../src/lib/character-sheet-processor/wealth'
import ItemBuilder from '../../builders/ItemBuilder'

describe('Wealth', () => {
    it('should add the total currency to totalWealth', () => {
        const totalCurrency = 1000
        const totalWealth = wealth([], totalCurrency).totalWealth

        totalWealth.should.equal(1000)
    })

    it('should calculate the gold totals of the items in each container', () => {
        const containers = [
            buildItemContainer([]),
            buildItemContainer([
                new ItemBuilder()
                    .withCost(100)
                    .build(),
                new ItemBuilder()
                    .withCost(100)
                    .build()
            ])
        ]
        const total = wealth(containers, 0).containers[1].value

        total.should.equal(200)
    })

    it('should give each container a name', () => {
        const containers = [
            buildItemContainer([
                new ItemBuilder()
                    .build()
            ], 'Equipment')
        ]
        const name = wealth(containers, 0).containers[0].name

        name.should.equal('Equipment')
    })

    it('should calculate the total gold value of all containers', () => {
        const containers = [
            buildItemContainer([
                new ItemBuilder()
                    .withCost(100)
                    .build()
            ]),
            buildItemContainer([
                new ItemBuilder()
                    .withCost(200)
                    .build()
            ])
        ]
        const totalContainerWealth = wealth(containers, 0).totalContainerWealth

        totalContainerWealth.should.equal(300)
    })

    it('should add the total gold value of all containers to totalWealth', () => {
        const containers = [
            buildItemContainer([
                new ItemBuilder()
                    .withCost(500)
                    .build()
            ])
        ]
        const totalWealth = wealth(containers, 0).totalWealth

        totalWealth.should.equal(500)
    })
})

function buildItemContainer(items: Item[], name: string = ''): ItemContainer {
    return {
        name,
        equipped: true,
        capacity: 0,
        contents: items
    }
}
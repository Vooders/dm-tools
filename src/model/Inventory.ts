import Item from "./Item"

export default class Inventory {
    constructor(
        private inventory: ItemType[]
    ) {}

    public getInventory(): any {
        return this.inventory
    }

    public getContainers(): any {
        return this.inventory.filter(item => item.definition.isContainer)
    }

    public findByName(name: string): Item[] {
        return this.inventory
            .filter(item => item.definition.name.includes(name))
            .map(item => new Item(item))
    }
}

export type ItemType = {
    definition: {
        name: string,
        isContainer: boolean
    }
}
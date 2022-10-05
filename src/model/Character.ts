import Inventory from "./Inventory";

export default class Character {

    private constructor(
        public inventory: Inventory
    ) {}

    static build(data: any): Character {
        return new this(new Inventory(data.inventory))
    }

    public getInventory(): Inventory {
        return this.inventory
    }
}

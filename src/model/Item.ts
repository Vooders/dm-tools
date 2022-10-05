export default class Item {
    constructor(
        private itemData: any
    ) {}

    public getDescription(): string {
        return this.itemData.definition.description
    }
}
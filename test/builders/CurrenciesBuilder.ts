import { CurrenciesType } from "../../src/dm-tools-data.types"

export default class CurrenciesBuilder {
    constructor(
        private copper: number = 10,
        private silver: number = 10,
        private electrum: number = 10,
        private gold: number = 10,
        private platinum: number = 10,
    ) { }

    public withCopper(copper: number) {
        this.copper = copper
        return this
    }

    public withSilver(silver: number) {
        this.silver = silver
        return this
    }

    public withElectrum(electrum: number) {
        this.electrum = electrum
        return this
    }

    public withGold(gold: number) {
        this.gold = gold
        return this
    }

    public withPlatinum(platinum: number) {
        this.platinum = platinum
        return this
    }

    private totalGold(): number {
        const copper = this.copper / 100
        const silver = this.silver / 10
        const gold = this.gold
        const electrum = this.electrum / 2
        const platinum = this.platinum * 10
        return copper + silver + gold + electrum + platinum
    }

    public build(): CurrenciesType {
        return {
            cp: this.copper,
            sp: this.silver,
            gp: this.gold,
            pp: this.platinum,
            ep: this.electrum,
            total: this.totalGold(),
        }
    }

}

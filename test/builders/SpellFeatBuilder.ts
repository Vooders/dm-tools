export default class SpellFeatBuilder {
    constructor(
        private name: string = '',
        private description: string = '',
        private snippet: string = '',
        private maxUses: number = 0,
        private numberUsed: number = 0,
        private useProficiencyBonus: boolean = false
    ){}

    public withName(name: string) {
        this.name = name
        return this
    }

    public withDescription(description: string) {
        this.description = description
        return this
    }

    public withSnippet(snippet: string) {
        this.snippet = snippet
        return this
    }

    public withMaxUses(maxUses: number) {
        this.maxUses = maxUses
        return this
    }

    public withNumberUsed(numberUsed: number) {
        this.numberUsed = numberUsed
        return this
    }

    public withUseProficiencyBonus(useProficiencyBonus: boolean) {
        this.useProficiencyBonus = useProficiencyBonus
        return this
    }

    public build() {
        return {
            definition: {
                name: this.name,
                description: this.description,
                snippet: this.snippet
            },
            limitedUse: {
                maxUses: this.maxUses,
                numberUsed: this.numberUsed,
                useProficiencyBonus: this.useProficiencyBonus
            }
        }
    }
}
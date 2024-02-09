import { Action } from '../../src/lib/CharacterSheetProcessor'

export default class ActionsBuilder {
    constructor(
        private race: Action[] = [],
        private clas: Action[] = [],
        private feat: Action[] = []
    ){}

    public withRace(race: Action[]) {
        this.race = race
        return this
    }

    public withClass(clas: Action[]) {
        this.clas = clas
        return this
    }

    public withFeat(feat: Action[]) {
        this.feat = feat
        return this
    }

    public build() {
        return {
            race: this.race,
            class: this.clas,
            feat: this.feat

        }
    }
}
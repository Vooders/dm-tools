import ActionBuilder from "../../../test/builders/ActionBuilder";
import ActionsBuilder from "../../../test/builders/ActionsBuilder";
import actions from '../../../src/lib/character-sheet-processor/actions'

describe('actions', () => {
    describe('maxUses', () => {
        it('should use proficiency bonus if race useProficiencyBonus is true', () => {
            const race = new ActionBuilder()
                .withUseProficiencyBonus(true)
                .build()

            const Actions = new ActionsBuilder()
                .withRace([race])
                .build()

            const maxUses = actions(Actions, [], [], 3)[0].limitedUse.maxUses

            maxUses.should.equal(3)
        })

        it('should use proficiency bonus if class useProficiencyBonus is true', () => {
            const clas = new ActionBuilder()
                .withUseProficiencyBonus(true)
                .build()

            const Actions = new ActionsBuilder()
                .withClass([clas])
                .build()

            const maxUses = actions(Actions, [], [], 5)[0].limitedUse.maxUses

            maxUses.should.equal(5)
        })

        it('should use proficiency bonus if feat useProficiencyBonus is true', () => {
            const feat = new ActionBuilder()
                .withUseProficiencyBonus(true)
                .build()

            const Actions = new ActionsBuilder()
                .withFeat([feat])
                .build()

            const maxUses = actions(Actions, [], [], 10)[0].limitedUse.maxUses

            maxUses.should.equal(10)
        })
    })
})

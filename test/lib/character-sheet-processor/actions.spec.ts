import ActionBuilder from "../../../test/builders/ActionBuilder";
import ActionsBuilder from "../../../test/builders/ActionsBuilder";
import actions from '../../../src/lib/character-sheet-processor/actions'
import FeatBuilder from "../../../test/builders/FeatBuilder";

describe('Actions', () => {
    describe('with an actions array', () => {
        it('should get the correct maxUses', () => {
            const race = new ActionBuilder()
                .withMaxUses(8)
                .build()

            const actionsArray = new ActionsBuilder()
                .withRace([race])
                .build()

            const maxUses = actions(actionsArray, [], [], 3)[0].limitedUse.maxUses

            maxUses.should.equal(8)
        })

        it('should use proficiency bonus for maxUses if useProficiencyBonus is true', () => {
            const clas = new ActionBuilder()
                .withUseProficiencyBonus(true)
                .build()

            const actionsArray = new ActionsBuilder()
                .withClass([clas])
                .build()

            const maxUses = actions(actionsArray, [], [], 5)[0].limitedUse.maxUses

            maxUses.should.equal(5)
        })

        it('should get the correct numberUsed', () => {
            const feat = new ActionBuilder()
                .withNumberUsed(10)
                .build()

            const actionsArray = new ActionsBuilder()
                .withFeat([feat])
                .build()

            const numberUsed = actions(actionsArray, [], [], 10)[0].limitedUse.numberUsed

            numberUsed.should.equal(10)
        })
    })

    describe('with a feats array', () => {
        it('should get the correct maxUses', () => {
            const actionsArray = new ActionsBuilder()
                .build()

            const feat = new FeatBuilder()
                .withMaxUses(9)
                .build()

            const maxUses = actions(actionsArray, [feat], [], 3)[0].limitedUse.maxUses

            maxUses.should.equal(9)
        })

        it('should use proficiency bonus for maxUses if useProficiencyBonus is true', () => {
            const actionsArray = new ActionsBuilder()
                .build()

            const feat = new FeatBuilder()
                .withUseProficiencyBonus(true)
                .build()

            const maxUses = actions(actionsArray, [feat], [], 6)[0].limitedUse.maxUses

            maxUses.should.equal(6)
        })

        it('should get the correct numberUsed', () => {
            const actionsArray = new ActionsBuilder()
                .build()

            const feat = new FeatBuilder()
                .withNumberUsed(2)
                .build()

            const maxUses = actions(actionsArray, [feat], [], 3)[0].limitedUse.numberUsed

            maxUses.should.equal(2)
        })
    })
})

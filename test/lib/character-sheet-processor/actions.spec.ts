import ActionBuilder from "../../../test/builders/ActionBuilder"
import ActionsBuilder from "../../../test/builders/ActionsBuilder"
import actions from '../../../src/lib/character-sheet-processor/actions'
import SpellFeatBuilder from "../../../test/builders/SpellFeatBuilder"
import ItemBuilder from "../../../test/builders/ItemBuilder"

describe('Actions', () => {
    describe('with an actions array', () => {
        it('should return the correct maxUses', () => {
            const race = new ActionBuilder()
                .withMaxUses(8)
                .build()

            const actionsArray = new ActionsBuilder()
                .withRace([race])
                .build()

            const maxUses = actions(actionsArray, [], [], 3)[0].limitedUse.maxUses

            maxUses.should.equal(8)
        })

        it('should return the correct numberUsed', () => {
            const feat = new ActionBuilder()
                .withNumberUsed(10)
                .build()

            const actionsArray = new ActionsBuilder()
                .withFeat([feat])
                .build()

            const numberUsed = actions(actionsArray, [], [], 10)[0].limitedUse.numberUsed

            numberUsed.should.equal(10)
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
    })

    describe('with a spell feats array', () => {
        it('should return the correct maxUses', () => {
            const emptyActionsArray = new ActionsBuilder()
                .build()

            const feat = new SpellFeatBuilder()
                .withMaxUses(9)
                .build()

            const maxUses = actions(emptyActionsArray, [feat], [], 3)[0].limitedUse.maxUses

            maxUses.should.equal(9)
        })

        it('should return the correct numberUsed', () => {
            const emptyActionsArray = new ActionsBuilder()
                .build()

            const feat = new SpellFeatBuilder()
                .withNumberUsed(2)
                .build()

            const maxUses = actions(emptyActionsArray, [feat], [], 3)[0].limitedUse.numberUsed

            maxUses.should.equal(2)
        })

        it('should use proficiency bonus for maxUses if useProficiencyBonus is true', () => {
            const emptyActionsArray = new ActionsBuilder()
                .build()

            const feat = new SpellFeatBuilder()
                .withUseProficiencyBonus(true)
                .build()

            const maxUses = actions(emptyActionsArray, [feat], [], 6)[0].limitedUse.maxUses

            maxUses.should.equal(6)
        })
    })

    describe('with an item array', () => {
        it('should return the correct maxUses', () => {
            const emptyActionsArray = new ActionsBuilder()
                .build()

            const item = new ItemBuilder()
                .withCanEquip(true)
                .withMaxUses(4)
                .build()

            const maxUses = actions(emptyActionsArray, [], [item], 3)[0].limitedUse.maxUses

            maxUses.should.equal(4)
        })

        it('should return the correct numberUsed', () => {
            const emptyActionsArray = new ActionsBuilder()
                .build()

            const item = new ItemBuilder()
                .withCanEquip(true)
                .withNumberUsed(2)
                .build()

            const maxUses = actions(emptyActionsArray, [], [item], 3)[0].limitedUse.numberUsed

            maxUses.should.equal(2)
        })

        it('should use proficiency bonus for maxUses if useProficiencyBonus is true', () => {
            const emptyActionsArray = new ActionsBuilder()
                .build()

            const item = new ItemBuilder()
                .withCanEquip(true)
                .withUseProficiencyBonus(true)
                .build()

            const maxUses = actions(emptyActionsArray, [], [item], 6)[0].limitedUse.maxUses

            maxUses.should.equal(6)
        })

    })
})

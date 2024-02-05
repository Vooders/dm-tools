import { Action } from "../CharacterSheetProcessor"

export default function action(actions: any, feats: any, inventory: any, proficiency: number): Action[] {

    const items = inventory.filter((item: any) => {
        return item.definition.canEquip === true
    })

    return [...actions.race, ...actions.class, ...actions.feat].map(action => {
        return {
            name: action.name,
            description: action.description,
            snippet: action.snippet,
            limitedUse: {
                maxUses: getMaxUses(action),
                numberUsed: (action.limitedUse) ? action.limitedUse.numberUsed : 0
            }
        }
    }).concat(feats.map((feat: any) => {
        return {
            name: feat.definition.name,
            description: feat.definition.description,
            snippet: feat.definition.snippet,
            limitedUse: {
                maxUses: getMaxUses(feat),
                numberUsed: (feat.limitedUse) ? feat.limitedUse.numberUsed : 0
            }
        }
    })).concat(items.map((item: any) => {
        return {
            name: item.definition.name,
            description: item.definition.description,
            snippet: item.definition.snippet,
            limitedUse: {
                maxUses: getMaxUses(item),
                numberUsed: (item.limitedUse) ? item.limitedUse.numberUsed : 0
            }
        }
    }))

    function getMaxUses(action: any): number {
        if (action.limitedUse) {
            if (action.limitedUse.useProficiencyBonus) {
                return proficiency
            }
            return action.limitedUse.maxUses
        }
        return 0
    }
}
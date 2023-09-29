
export default function armor(dndBeyondJson: any) {
    const getModifier = (stat: number) => Math.floor(((dndBeyondJson.data.stats[stat].value) - 10) / 2)
    const dexMod = getModifier(1)
    const conMod = getModifier(2)
    const wisMod = getModifier(3)
    const className = dndBeyondJson.data.classes[0].definition.name

    const equippedItems = dndBeyondJson.data.inventory.filter((item: any) => {
        return item.definition.armorClass && item.equipped
    })
    const acFromItems = equippedItems.reduce((total: number, item: any) => {
        return total + item.definition.armorClass
    }, 0)
    const armorTypeIds = equippedItems.map((item: any) => {
        return item.definition.armorTypeId
    })

    let ac = acFromItems
    if (acFromItems > 10) {
        if (armorTypeIds.includes(1)) {
            ac += dexMod
        }
        if (armorTypeIds.includes(2)) {
            ac += dexMod < 2 ? dexMod : 2
        }
    }
    if (acFromItems < 11) {
        if (className === 'Barbarian') {
            ac += dexMod + conMod + 10
        } else if (className === 'Monk') {
            ac += dexMod + wisMod + 10
        } else {
            ac += dexMod + 10
        }
    }
    return ac
}

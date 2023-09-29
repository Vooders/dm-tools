
export default function armor(dndBeyondJson: any) {
    const getModifier = (stat: number) => Math.floor(((dndBeyondJson.data.stats[stat].value) - 10) / 2)
    const dexMod = getModifier(1)
    const conMod = getModifier(2)
    const wisMod = getModifier(3)
    const className = dndBeyondJson.data.classes[0].definition.name

    const equippedArmor = dndBeyondJson.data.inventory.filter((item: any) => {
        return item.definition.armorClass && item.equipped
    })
    const acFromArmor = equippedArmor.reduce((total: number, item: any) => {
        return total + item.definition.armorClass
    }, 0)

    if (acFromArmor > 0) {
        return acFromArmor + dexMod
    }
    if (className === 'Barbarian') {
        return dexMod + conMod + 10
    }
    if (className === 'Monk') {
        return dexMod + wisMod + 10
    }
    return dexMod + 10
}

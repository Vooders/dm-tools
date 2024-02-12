import { HealthPotions } from "../CharacterSheetProcessor"

export default function healthPotions(inventory: any): HealthPotions {

    const normal = inventory.filter((item: any) => item.definition.name === 'Potion of Healing')
        .reduce((acc: any, item: any) => acc + item.quantity, 0)

    const greater = inventory.filter((item: any) => item.definition.name === 'Potion of Healing (Greater)')
        .reduce((acc: any, item: any) => acc + item.quantity, 0)

    return {
        normal: normal,
        greater: greater
    }
}
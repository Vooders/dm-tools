import { HealthPotions } from "../CharacterSheetProcessor"

export default function healthPotions(inventory: any): HealthPotions {

    const calculateAmount = (potionName: string) => {
        return inventory.filter((item: any) => item.definition.name === potionName)
            .reduce((acc: any, item: any) => acc + item.quantity, 0)
    }

    return {
        normal: calculateAmount('Potion of Healing'),
        greater: calculateAmount('Potion of Healing (Greater)')
    }
}
import { HealthPotions } from "../CharacterSheetProcessor"

export default function healthPotions(inventory: any): HealthPotions {

    const potionAmount = (potionName: string) => {
        return inventory.filter((item: any) => item.definition.name === potionName)
            .reduce((acc: any, item: any) => acc + item.quantity, 0)
    }

    return {
        normal: potionAmount('Potion of Healing'),
        greater: potionAmount('Potion of Healing (Greater)')
    }
}
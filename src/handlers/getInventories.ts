import { app } from 'electron';
import { readFile } from 'fs/promises';
import path from 'path'
import getSummaryData from '../lib/getSummary';

const directory = 'characters'
const userDataPath = app.getPath('userData');

export default async () => {
    const summary = await getSummaryData()
    const characterIds = Object.keys(summary)
    const invertories = await Promise.all(characterIds.map(async characterId => {
        const character = await getCharacter(characterId)
        return {
            name: character.data.name,
            inventory: addCustomNames(character.data.inventory, character.data.characterValues)
        }
    }))
    return invertories
}

const getCharacter = async (characterId: string) => {
    try {
        const filePath = path.join(userDataPath, directory, characterId + '.json')
        const fileBuffer = await readFile(filePath)
        return JSON.parse(fileBuffer.toString())
    } catch (error) {

    }
}

const addCustomNames = (inventory: Item[], characterValues: CharacterValues[]): Item[] => {
    const renames = characterValues.filter(characterValue => characterValue.typeId === 8)
    return inventory.map(item => {
        renames.forEach(value => {
            if (value.valueId === item.id.toString()) {
                item.definition.name = value.value
            }
        })
        return item
    })
}

export type Item = {
    id: number,
    definition: {
        id: string,
        avatarUrl: string,
        name: string,
        weight: number,
        rarity: string,
        filterType: string,
        isContainer: boolean
    },
    equipped: boolean,
    quantity: number
}

export type CharacterValues = {
    typeId: number,
    value: string,
    valueId: string
}

import { app } from 'electron';
import { writeFile } from 'fs/promises';
import path from 'path'
import getSummaryData from './getSummary';
import fetch from 'electron-fetch'
import CharacterSheetProcessor from '../lib/CharacterSheetProcessor';
import saveMetrics from './saveMetrics';

const directory = 'characters'
const userDataPath = app.getPath('userData');
const avatarPath = path.join(userDataPath, 'avatars')
const summaryPath = path.join(userDataPath, directory, 'summary.json');

export default async (character: any) => {
    console.log(`saving character ${character.data.id}`)
    const filename = character.data.id
    const filePath = path.join(userDataPath, directory, filename + '.json');
    console.log(filePath)
    try {
        const characterSheetProcessor = new CharacterSheetProcessor(character)
        const processedCharacter = characterSheetProcessor.process()
        await writeFile(filePath, JSON.stringify(processedCharacter));
        console.log(`saved ${filename}`)
        await updateSummary(character.data)
        await downloadAvatar(character.data)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

const downloadAvatar = async (characterData: any) => {
    const id = characterData.id
    const url = characterData.avatarUrl
    const image = await fetch(url)
    const a = await image.arrayBuffer()
    const b = new DataView(a)
    const filePath = path.join(avatarPath, id + '.jpeg')

    await writeFile(filePath, b)
}

const updateSummary = async (characterData: any) => {
    console.log('updating summary')
    const characterSummary = buildCharacterSummary(characterData)
    const summaryData = await getSummaryData()

    summaryData[characterSummary.id] = characterSummary

    await writeFile(summaryPath, JSON.stringify(summaryData))
    return summaryData
}

const buildCharacterSummary = (characterData: any) => {
    return {
        id: characterData.id,
        name: characterData.name,
        race: characterData.race.fullName,
        avatarPath: path.join(avatarPath, characterData.id + '.jpeg'),
        classes: characterData.classes.map((clas: any) => `${clas.definition.name} ${clas.level}`)
    }
}

export type Summary = {
    [id: string]: CharacterSummary
}

export type CharacterSummary = {
    id: number,
    name: string,
    race: string,
    avatarPath: string,
    classes: string[]
}

import { app } from 'electron';
import path from 'path'
import { writeFile, readFile, open } from 'fs/promises';
import * as fs from 'fs'

const directory = 'characters'
const userDataPath = app.getPath('userData');
const summaryPath = path.join(userDataPath, directory, 'summary.json');

export default async (_: Electron.IpcMainInvokeEvent, character: any) => {
    const filename = character.data.id
    const filePath = path.join(userDataPath, directory, filename + '.json');
    console.log(filePath)
    try {
        await writeFile(filePath, JSON.stringify(character));
        console.log(`saved ${filename}`)
        await updateSummary(character.data)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}

const updateSummary = async (characterData: any) => {
    console.log('getting summary')
    const characterSummary = buildCharacterSummary(characterData)
    const summaryData = await getSummaryData()

    summaryData[characterSummary.id] = characterSummary

    await writeFile(summaryPath, JSON.stringify(summaryData))
}

const buildCharacterSummary = (characterData: any) => {
    return {
        id: characterData.id,
        name: characterData.name,
        race: characterData.race.fullName,
        classes: characterData.classes.map((clas: any) => `${clas.definition.name} ${clas.level}`)
    }
}

const getSummaryData = async () => {
    // Create summary.json if it does not exist
    const fileHandle = await open(summaryPath, 'a+')
    await fileHandle.close()

    const fileBuffer = await readFile(summaryPath)
    let file = fileBuffer.toString()
    if (file === '') {
        file = '{}'
    }
    return JSON.parse(file)
}
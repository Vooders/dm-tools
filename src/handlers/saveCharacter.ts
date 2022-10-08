import { app, BrowserWindow } from 'electron';
import { writeFile } from 'fs/promises';
import path from 'path'
import getSummaryData from './getSummary';

const directory = 'characters'
const userDataPath = app.getPath('userData');
const summaryPath = path.join(userDataPath, directory, 'summary.json');

export default (mainWindow: BrowserWindow) => {
    return async (_: Electron.IpcMainInvokeEvent, character: any) => {
        const filename = character.data.id
        const filePath = path.join(userDataPath, directory, filename + '.json');
        console.log(filePath)
        try {
            await writeFile(filePath, JSON.stringify(character));
            console.log(`saved ${filename}`)
            const summary = await updateSummary(character.data)
            mainWindow.webContents.send('character:summaryUpdate', summary)
            return true
        } catch(error) {
            console.log(error)
            return false
        }
    }
}

const updateSummary = async (characterData: any) => {
    console.log('getting summary')
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
    classes: string[]
}

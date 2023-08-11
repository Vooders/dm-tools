import { app } from 'electron';
import { readFile, open } from 'fs/promises';
import path from 'path'

const directory = 'characters'
const userDataPath = app.getPath('userData');
const summaryPath = path.join(userDataPath, directory, 'summary.json');

export default async () => {
    // Create summary.json if it does not exist

    console.log(userDataPath)
    const fileHandle = await open(summaryPath, 'a+')
    await fileHandle.close()

    const fileBuffer = await readFile(summaryPath)
    let file = fileBuffer.toString()
    if (file === '') {
        file = '{}'
    }
    return JSON.parse(file)
}
import { app } from 'electron'
import path from 'path'
import { writeFile } from 'fs/promises';
import getFile from './getFile';
import { v4 as uuidv4 } from 'uuid'

const userDataPath = app.getPath('userData');
const npcsDirectory = path.join(userDataPath, 'npcs');
const summaryPath = path.join(npcsDirectory, 'summary.json')

export default async function saveNpc(npc: any) {
    const id = uuidv4()
    const filename = `${id}.json`
    try {
        const summary = await getSummary()
        summary.push({
            name: npc.name,
            id,
            filename
        })
        const npcPath = path.join(npcsDirectory, filename)
        await writeFile(npcPath, JSON.stringify(npc))
        await writeFile(summaryPath, JSON.stringify(summary))
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

async function getSummary () {
    const summary = await getFile(summaryPath)
    if(JSON.stringify(summary) === '{}') {
        return []
    }
    return summary
}

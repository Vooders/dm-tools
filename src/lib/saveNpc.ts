import { app } from 'electron'
import path from 'path'
import { writeFile } from 'fs/promises';
import getFile from './getFile';

const userDataPath = app.getPath('userData');
const npcsDirectory = path.join(userDataPath, 'npcs');
const summaryPath = path.join(npcsDirectory, 'summary.json')

export default async function saveNpc(npc: Npc) {
    const filename = `${npc.id}.json`
    try {
        const summary = await getSummary()
        summary.push({
            name: npc.name,
            id: npc.id,
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

async function getSummary() {
    const summary = await getFile(summaryPath)
    if (JSON.stringify(summary) === '{}') {
        return []
    }
    return summary
}

export type Npc = {
    name: string
    id: string
    filename?: string
    race?: string
    gender?: string
    notes?: string
    abilities?: NpcAbilities
}

export type NpcAbilities = {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
}

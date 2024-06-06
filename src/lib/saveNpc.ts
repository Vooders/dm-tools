import { app } from 'electron'
import path from 'path'
import { writeFile } from 'fs/promises';
import getFile from './getFile';
import NpcProcessor from './npcProcessor';

const userDataPath = app.getPath('userData');
const npcsDirectory = path.join(userDataPath, 'npcs');
const summaryPath = path.join(npcsDirectory, 'summary.json')

export default async function saveNpc(npc: Npc) {
    const filename = `${npc.id}.json`
    const npcPath = path.join(npcsDirectory, filename)
    try {
        await updateSummary(npc)
        const npcProcessor = new NpcProcessor(npc)
        await writeFile(npcPath, JSON.stringify(npcProcessor.toDmToolsData()))
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

async function updateSummary(npc: Npc) {
    const summary = await getSummary()
    const filename = `${npc.id}.json`

    if (!summary.some((npcSummary: NpcSummary) => npcSummary.id === npc.id)) {
        summary.push({
            name: npc.name,
            id: npc.id,
            filename
        })
        await writeFile(summaryPath, JSON.stringify(summary))
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
    proficiencyBonus: number
    ac: number
    proficiencies: string[]
    expertise: string[]
}

export type NpcAbilities = {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
}

export type NpcSummary = {
    name: string
    id: string
    filename: string
}

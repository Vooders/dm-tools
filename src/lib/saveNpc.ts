import { app } from 'electron'
import path from 'path'
import { writeFile } from 'fs/promises'
import getFile from './getFile'
import NpcProcessor from './npcProcessor'
import { Ability, ProficiencyView, Save, Skill } from '../dm-tools-data.types'
import { Logger } from '../logger/Logger'

const logger = new Logger('[lib][saveNpc]')

const userDataPath = app.getPath('userData')
const npcsDirectory = path.join(userDataPath, 'npcs')
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
        logger.info(`${error}`)
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
    filename: string
    race: string
    gender: string
    notes: string
    abilities: Ability[]
    proficiencyBonus: number
    ac: number
    hp: number
    skills: Skill[]
    saves: Save[]
    proficiencyView: ProficiencyView[]
}

export type NpcSummary = {
    name: string
    id: string
    filename: string
}

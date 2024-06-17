import { DmToolsData } from '../dm-tools-data.types'
import { Summary } from '../lib/saveCharacter'
import { ImportResponse } from '../lib/importCharacter'

export async function importCharacter(id: string): Promise<ImportResponse> {
    return await window.electron.invoke('character:import', id) as ImportResponse
}

export async function save(ddbData: any): Promise<boolean> {
    return await window.electron.invoke('character:save', ddbData)
}

export async function updateAll(): Promise<void> {
    await window.electron.invoke('character:updateAll')
}

export async function get(id: string): Promise<DmToolsData> {
    return await window.electron.invoke('character:get', id) as DmToolsData
}

export async function getSummary(): Promise<Summary> {
    return await window.electron.invoke('summary:get') as Summary
}

export async function deleteCharacter(id: string): Promise<boolean> {
    return await window.electron.invoke('character:delete', id)
}

export function onUpdate(func: Function): Function {
    return window.electron.receive('character:updated', func)
}

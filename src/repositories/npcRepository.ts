import { Npc } from "../lib/saveNpc"
import { DmToolsData } from "../dm-tools-data.types"

export async function get(id: string): Promise<DmToolsData> {
    return await window.electron.invoke('npc:get', id) as DmToolsData
}

export async function getAll(): Promise<DmToolsData[]> {
    return await window.electron.invoke('npcs:get')
}

export async function save(npc: Npc): Promise<boolean> {
    return await window.electron.invoke('npc:save', npc)
}

export async function deleteNpc(id: string): Promise<boolean> {
    return await window.electron.invoke('npc:delete', id)
}

export function onUpdate(func: Function): Function {
    return window.electron.receive('npc:updated', func)
}

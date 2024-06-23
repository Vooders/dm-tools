import getNpcSummaryData from "../../src/lib/getNpcSummary"
import { Npc } from "../../src/lib/saveNpc"
import getNpc from "./getNpc"
import { Logger } from '../logger/Logger'

const logger = new Logger('[handler][getNpcs]')

export default async (_: Electron.IpcMainInvokeEvent): Promise<Npc[]> => {
    logger.info('Getting all NPCs')
    const summary = await getNpcSummaryData()
    const npcIds = summary.map((npc: any) => {
        return npc.id
    })

    return await Promise.all(npcIds.map(async (id: string) => {
        const npc = await getNpc(null, id)
        logger.debug(`Got data for NPC ${npc.profile.name}`)
        return npc
    }))
}

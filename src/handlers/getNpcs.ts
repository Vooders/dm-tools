import getNpcSummaryData from "../../src/lib/getNpcSummary";
import { Npc } from "../../src/lib/saveNpc";
import getNpc from "./getNpc";

export default async (_: Electron.IpcMainInvokeEvent): Promise<Npc[]> => {
  const summary = await getNpcSummaryData()
  const npcIds = summary.map((npc: any) => {
    return npc.id
  })

  return await Promise.all(npcIds.map(async (id: string) => {
    return await getNpc(id)
  }))
}
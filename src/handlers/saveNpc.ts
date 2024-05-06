import saveNpc from "../lib/saveNpc"

    export default async (_: Electron.IpcMainInvokeEvent, npc: any): Promise<boolean> => {
        return await saveNpc(npc)
    }

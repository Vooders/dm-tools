import saveEditedNpc from "../lib/saveEditedNpc"

    export default async (_: Electron.IpcMainInvokeEvent, npc: any): Promise<boolean> => {
        return await saveEditedNpc(npc)
    }

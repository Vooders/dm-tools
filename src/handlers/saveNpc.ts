import saveNpc from "../lib/saveNpc"

    export default async (_: Electron.IpcMainInvokeEvent, name: string): Promise<boolean> => {
        console.log('handling name', name)
        return await saveNpc(name)
    }

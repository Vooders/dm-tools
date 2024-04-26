import saveNpc from "../lib/saveNpc"

export default () => {
    return async (_: Electron.IpcMainInvokeEvent): Promise<boolean> => {
        return await saveNpc()
    }
}
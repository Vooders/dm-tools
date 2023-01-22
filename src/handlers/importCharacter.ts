import importCharacter, { ImportResponse } from "../lib/importCharacter"

export default async (_: Electron.IpcMainInvokeEvent, id: string): Promise<ImportResponse> => {
    return await importCharacter(id)
}

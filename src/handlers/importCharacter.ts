import fetch from 'electron-fetch'

export default async (_: Electron.IpcMainInvokeEvent, id: number): Promise<ImportResponse> => {
    const response: any = await fetch(`https://character-service.dndbeyond.com/character/v3/character/${id}`);
    if (response.ok) {
        const character = await response.json()
        if (character.message === 'Character successfully received.') {
            return success(character)
        }
    } else if (response.status === 404) {
        return error(`Character ${id} not found`)
    } else {
        return error(response)
    }
}


const respond = (status: string, value: string): ImportResponse => {
    const response = { status, value }
    console.log(response)
    return response
}

const success = (value: string): ImportResponse => {
    return respond('success', value)
}
const error = (value: string): ImportResponse => {
    return respond('error', value)
}

export type ImportResponse = {
    status: string,
    value: any
}

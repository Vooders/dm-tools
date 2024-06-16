import fetch from 'electron-fetch'
import { decode } from 'js-base64'

export default async (id: string): Promise<ImportResponse> => {
    console.log(`[lib][importCharacter] importing ${id}`)
    const response: any = await fetch(`${decode('aHR0cHM6Ly9jaGFyYWN0ZXItc2VydmljZS5kbmRiZXlvbmQuY29tL2NoYXJhY3Rlci92My9jaGFyYWN0ZXIv')}${id}`);
    if (response.ok) {
        const character = await response.json()
        if (character.message === 'Character successfully received.') {
            return success(character)
        }
    } else if (response.status === 404) {
        return error(`Character ${id} not found`)
    } else if (response.status === 403) {
        return error(`Character ${id} is set to be private`)
    } else {
        const errorResponse = await response.json()
        return error(`${errorResponse.message}: ${errorResponse.data.serverMessage}`)
    }
}

const respond = (status: string, value: string): ImportResponse => {
    const response = { status, value }
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

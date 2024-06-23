import { readFile, open } from 'fs/promises'

export default async (path: string) => {
    // Create file if it does not exist
    const fileHandle = await open(path, 'a+')
    await fileHandle.close()

    const fileBuffer = await readFile(path)
    let file = fileBuffer.toString()
    if (file === '') {
        file = '{}'
    }
    return JSON.parse(file)
}

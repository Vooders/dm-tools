import { app } from 'electron'
import path from 'path'
import getFile from './getFile'

const directory = 'characters'
const userDataPath = app.getPath('userData')
const summaryPath = path.join(userDataPath, directory, 'summary.json')

export default async () => {
    return await getFile(summaryPath)
}

import { app } from "electron"
import path from "path"
import getFile from "./getFile"
import { Logger } from '../logger/Logger'

const logger = new Logger('[lib][getNpcSummary]')

const userDataPath = app.getPath('userData');
const summaryPath = path.join(userDataPath, 'npcs', 'summary.json')

export default async () => {
  logger.info('Getting NPC Summary')
  return await getFile(summaryPath)
}

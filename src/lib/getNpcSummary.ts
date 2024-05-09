import { app } from "electron"
import path from "path"
import getFile from "./getFile"

const userDataPath = app.getPath('userData');
const summaryPath = path.join(userDataPath, 'npcs', 'summary.json')

export default async () => {
  return await getFile(summaryPath)
}
import { app } from 'electron'
import path from 'path'
import { writeFile } from 'fs/promises';
import { Npc } from './saveNpc';

const userDataPath = app.getPath('userData');
const npcsDirectory = path.join(userDataPath, 'npcs');

export default async function saveEditedNpc(npc: Npc) {
  const filename = `${npc.id}.json`
  const npcPath = path.join(npcsDirectory, filename)
  try {
    await writeFile(npcPath, JSON.stringify(npc))
    return true
  } catch (error) {
      console.log(error)
      return false
  }
}
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  save: () => {
    ipcRenderer.send('save')
  },
  importCharacter: async (characterId) => {
    return await ipcRenderer.invoke('character:import', characterId)
  },
  importAllCharacters: async () => {
    return await ipcRenderer.invoke('character:updateAll')
  },
  saveCharacter: async (characterData) => {
    return await ipcRenderer.invoke('character:save', characterData)
  },
  getCharacter: async (characterId) => {
    return await ipcRenderer.invoke('character:get', characterId)
  },
  getSummary: async () => {
    return await ipcRenderer.invoke('character:getSummary')
  },
  deleteCharacter: async (characterId) => {
    return await ipcRenderer.invoke('character:delete', characterId)
  },
  getInventories: async () => {
    return await ipcRenderer.invoke('inventory:get')
  },
  getLanguages: async () => {
    return await ipcRenderer.invoke('languages:get')
  },
  getSenses: async () => {
    return await ipcRenderer.invoke('senses:get')
  },
  getSkills: async () => {
    return await ipcRenderer.invoke('skills:get')
  },
  getHealth: async () => {
    return await ipcRenderer.invoke('health:get')
  },
  getMetrics: async (timeRange) => {
    return await ipcRenderer.invoke('metrics:get', timeRange)
  },
  getWealth: async () => {
    return await ipcRenderer.invoke('wealth:get')
  },
  characterUpdated: async (callback) => {
    return await ipcRenderer.on('character:updated', callback)
  },
  summaryUpdate: async (callback) => {
    return ipcRenderer.on('character:summaryUpdate', callback)
  },
  saveNpc: async (npc) => {
    return await ipcRenderer.invoke('npc:save', npc)
  },
  getNpcs: async () => {
    return await ipcRenderer.invoke('npcs:get')
  }
})

console.log('preload ran')


// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    console.log(`contextBridge: sending channel:${channel} data:${data}`)
    ipcRenderer.send(channel, data)
  },
  receive: (channel, func) => {
    console.log(`contextBridge: receiving channel:${channel}`)
    const subscription = (event, ...args) => func(...args);
    ipcRenderer.on(channel, subscription);
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    }
  },
  receiveOnce: (channel, func) => {
    ipcRenderer.once(channel, (event, ...args) => func(...args))
  },
  removeAllListeners: (channel, func) => {
    console.log(`contextBridge: Removing all listeners`)
    ipcRenderer.removeAllListeners(channel)
  },





  save: () => {
    console.log('sending "save"')
    ipcRenderer.send('save')
  },
  importCharacter: async (characterId) => {
    console.log(`Invoking "character:import" with ${characterId}`)
    return await ipcRenderer.invoke('character:import', characterId)
  },
  importAllCharacters: async () => {
    console.log(`Invoking "character:updateAll"`)
    return await ipcRenderer.invoke('character:updateAll')
  },
  saveCharacter: async (characterData) => {
    console.log(`Invoking "character:save" with ${characterData}`)
    return await ipcRenderer.invoke('character:save', characterData)
  },
  getCharacter: async (characterId) => {
    console.log(`Invoking "character:get" with ${characterId}`)
    return await ipcRenderer.invoke('character:get', characterId)
  },
  getSummary: async () => {
    console.log(`Invoking "character:getSummary"`)
    return await ipcRenderer.invoke('character:getSummary')
  },
  deleteCharacter: async (characterId) => {
    console.log(`Invoking "character:delete" with ${characterId}`)
    return await ipcRenderer.invoke('character:delete', characterId)
  },
  getInventories: async () => {
    console.log(`Invoking "inventory:get"`)
    return await ipcRenderer.invoke('inventory:get')
  },
  getLanguages: async () => {
    console.log(`Invoking "languages:get"`)
    return await ipcRenderer.invoke('languages:get')
  },
  getSenses: async () => {
    console.log(`Invoking "senses:get"`)
    return await ipcRenderer.invoke('senses:get')
  },
  getSkills: async () => {
    console.log(`Invoking "skills:get"`)
    return await ipcRenderer.invoke('skills:get')
  },
  getHealth: async () => {
    console.log(`Invoking "health:get"`)
    return await ipcRenderer.invoke('health:get')
  },
  getMetrics: async (timeRange) => {
    console.log(`Invoking "metrics:get" with ${timeRange}`)
    return await ipcRenderer.invoke('metrics:get', timeRange)
  },
  getWealth: async () => {
    console.log(`Invoking "wealth:get"`)
    return await ipcRenderer.invoke('wealth:get')
  },
  summaryUpdate: async (callback) => {
    console.log(`On "character:summaryUpdate"`)
    return ipcRenderer.on('character:summaryUpdate', callback)
  },
  saveNpc: async (npc) => {
    console.log(`Invoking "npc:save" with ${npc}`)
    return await ipcRenderer.invoke('npc:save', npc)
  },
  getNpc: async (npcId) => {
    console.log(`Invoking "npc:get" with ${npcId}`)
    return await ipcRenderer.invoke('npc:get', npcId)
  },
  getNpcs: async () => {
    console.log(`Invoking "npcs:get"`)
    return await ipcRenderer.invoke('npcs:get')
  },
  deleteNpc: async (id) => {
    console.log(`Invoking "npc:delete"`)
    return await ipcRenderer.invoke('npc:delete', id)
  },
  npcUpdated: async (callback) => {
    console.log(`On "npc:updated"`)
    return await ipcRenderer.on('npc:updated', callback)
  },
})

console.log('preload ran')


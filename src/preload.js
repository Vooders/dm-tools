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
  saveCharacter: async (characterData) => {
    return await ipcRenderer.invoke('character:save', characterData)
  }
})

console.log('preload ran')

// 55412987
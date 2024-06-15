// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    console.log(`[contextBridge] sending channel: "${channel}" data in next line`)
    console.log(data)
    ipcRenderer.send(channel, data)
  },
  invoke: async (channel, data) => {
    console.log(`[contextBridge] invoking channel: "${channel}" data in next line`)
    console.log(data)
    const response = await ipcRenderer.invoke(channel, data)
    console.log(`[contextBridge] response for channel: "${channel}" response in next line`)
    console.log(response)
    return response
  },
  receive: (channel, func) => {
    console.log(`[contextBridge] creating listener on "${channel}"`)
    const subscription = (event, ...args) => func(...args);
    ipcRenderer.on(channel, subscription);
    return () => {
      console.log(`[contextBridge] removing listener on "${channel}"`)
      ipcRenderer.removeListener(channel, subscription);
    }
  },
  receiveOnce: (channel, func) => {
    ipcRenderer.once(channel, (event, ...args) => func(...args))
  },
  removeAllListeners: (channel, func) => {
    console.log(`[contextBridge] Removing all listeners`)
    ipcRenderer.removeAllListeners(channel)
  },
})

console.log('preload ran')


// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => {
    if (data) {
      console.log(`[contextBridge] sending channel: "${channel}" data on next line`)
      console.log(data)
    } else {
      console.log(`[contextBridge] sending channel: "${channel}" (no data)`)
    }
    ipcRenderer.send(channel, data)
  },
  invoke: async (channel, data) => {
    if (data) {
      console.log(`[contextBridge] invoking channel: "${channel}" data on next line`)
      console.log(data)
    } else {
      console.log(`[contextBridge] invoking channel: "${channel}" (no data)`)
    }
    const response = await ipcRenderer.invoke(channel, data)
    if (response) {
      console.log(`[contextBridge] got response from channel: "${channel}" response on next line`)
      console.log(response)
    }
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

console.log('[preload] loaded')


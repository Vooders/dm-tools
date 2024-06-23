// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, data: any) => {
    if (data) {
      console.log(`[contextBridge] sending channel: "${channel}" data on next line`)
      console.log(data)
    } else {
      console.log(`[contextBridge] sending channel: "${channel}" (no data)`)
    }
    ipcRenderer.send(channel, data)
  },
  invoke: async (channel: string, data: any) => {
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
  receive: (channel: string, func: Function) => {
    console.log(`[contextBridge] creating listener on "${channel}"`)
    const subscription = (event: any, ...args: any[]) => func(...args);
    ipcRenderer.on(channel, subscription);
    return () => {
      console.log(`[contextBridge] removing listener on "${channel}"`)
      ipcRenderer.removeListener(channel, subscription);
    }
  },
  receiveOnce: (channel: string, func: Function) => {
    ipcRenderer.once(channel, (event, ...args) => func(...args))
  },
  removeAllListeners: (channel: string, func: Function) => {
    console.log(`[contextBridge] Removing all listeners`)
    ipcRenderer.removeAllListeners(channel)
  },
})

console.log('[preload] loaded')


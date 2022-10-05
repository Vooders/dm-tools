// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge } = require('electron')
const store = require('./lib/Store')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
})

contextBridge.exposeInMainWorld('store', store)

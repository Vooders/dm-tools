// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

const prefix = '[contextBridge]'

function log(level: string, line: any) {
    if (typeof line === 'object') {
        console.log(line)
    } else {
        console.log(`${prefix} ${line}`)
        ipcRenderer.send(`log:${level}`, `${prefix}${line}`)
    }
}

contextBridge.exposeInMainWorld('electron', {
    log: log,
    send: (channel: string, data: any) => {
        if (data) {
            log('info', `sending channel: "${channel}" data on next line`)
            log('info', data)
        } else {
            log('info', `sending channel: "${channel}" (no data)`)
        }
        ipcRenderer.send(channel, data)
    },
    invoke: async (channel: string, data: any) => {
        if (data) {
            log('info', `invoking channel: "${channel}" data on next line`)
            log('info', data)
        } else {
            log('info', `invoking channel: "${channel}" (no data)`)
        }
        const response = await ipcRenderer.invoke(channel, data)
        if (response) {
            log('info', `got response from channel: "${channel}" response on next line`)
            log('info', response)
        }
        return response
    },
    receive: (channel: string, func: Function) => {
        log('info', `creating listener on "${channel}"`)
        const subscription = (event: any, ...args: any[]) => func(...args);
        ipcRenderer.on(channel, subscription);
        return () => {
            log('info', `removing listener on "${channel}"`)
            ipcRenderer.removeListener(channel, subscription);
        }
    },
    receiveOnce: (channel: string, func: Function) => {
        ipcRenderer.once(channel, (event, ...args) => func(...args))
    },
    removeAllListeners: (channel: string, func: Function) => {
        log('info', `Removing all listeners`)
        ipcRenderer.removeAllListeners(channel)
    },
})

log('info', '[preload] loaded')


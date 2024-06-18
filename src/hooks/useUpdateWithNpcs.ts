import { useEffect, useState } from 'react'

export default function useUpdateWithNpcs<T>(handler: string, logId: string, initialState: T, data?: any): T {
    const [characters, setCharacters] = useState<T>(initialState)

    useEffect(() => {
        (async () => {
            console.log(`${logId} Initial load of ${handler} data`)
            setCharacters(await window.electron.invoke(`${handler}:get`, data))
        })()

        console.log(`${logId} Creating ${handler} listener`)
        const removeListener = window.electron.receive('npc:updated', async () => {
            console.log(`${logId} NPCs updated: reloading ${handler} data`)
            setCharacters(await window.electron.invoke(`${handler}:get`, data))
        })

        return () => {
            if(removeListener) {
                console.log(`${logId} Removing ${handler} listener`)
                removeListener()
            }
        }
    }, [data])

    return characters
}

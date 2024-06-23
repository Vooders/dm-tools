import { useEffect, useState } from 'react'
import { RendererLogger } from '../logger/RendererLogger'

export default function useUpdateWithCharacters<T>(handler: string, logger: RendererLogger, initialState: T, data?: any): T {
    const [characters, setCharacters] = useState<T>(initialState)

    useEffect(() => {
        (async () => {
            logger.info(`Initial load of ${handler} data`)
            setCharacters(await window.electron.invoke(`${handler}:get`, data))
        })()

        logger.info(`Creating ${handler} listener`)
        const removeListener = window.electron.receive('character:updated', async () => {
            logger.info(`Characters updated: reloading ${handler} data`)
            setCharacters(await window.electron.invoke(`${handler}:get`, data))
        })

        return () => {
            if(removeListener) {
                logger.info(`Removing ${handler} listener`)
                removeListener()
            }
        }
    }, [data])

    return characters
}

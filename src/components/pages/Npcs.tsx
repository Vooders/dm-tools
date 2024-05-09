import React, { useEffect, useState } from "react"
import {Npc} from '../../lib/saveNpc'
import { Box } from "@mui/material"

export default function Npcs() {
    const [npcs, setNpcs] = useState<Npc[]>([])

    const setNpcData = async () => {
        console.log('getting Npcs')
        setNpcs( await window.electron.getNpcs() )
    }

    useEffect(() => {
        setNpcData()
            .catch(console.error)
    }, [])

    const style = {
        display: 'flex'
    }

    return (
        <React.Fragment>
            {npcs.map(npc => {
                return (
                    <Box sx={style}>
                    {npc.name}, 
                    {npc.race}, 
                    {npc.gender}
                    </Box>
                )
            })}
        </React.Fragment>
    )
}

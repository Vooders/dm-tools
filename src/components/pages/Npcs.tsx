import React, { useEffect, useState } from "react"
import { Npc } from '../../lib/saveNpc'
import { Box, Card, CardContent, Typography } from "@mui/material"
import Title from "../Title"

export default function Npcs() {
    const [npcs, setNpcs] = useState<Npc[]>([])

    const setNpcData = async () => {
        console.log('getting Npcs')
        setNpcs(await window.electron.getNpcs())
    }

    useEffect(() => {
        setNpcData()
            .catch(console.error)
    }, [])

    return (
        <React.Fragment>
            <Title>Npc's</Title>
            {npcs.map(npc => {
                return (
                    <Card variant='outlined'>
                        <Box display='flex'flexDirection='row'>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {npc.name}
                            </Typography>
                            <Typography variant='h6' >
                                {npc.race}
                            </Typography>
                            <Typography variant='h6'>
                                {npc.gender}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography>
                                {npc.notes}
                            </Typography>
                        </CardContent>
                        </Box>
                    </Card>
                )
            })}
        </React.Fragment>
    )
}

import React, { useEffect, useState } from "react"
import Title from "../components/Title"
import { Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import { DmToolsData } from "../dm-tools-data.types"

import * as npcRepository from '../repositories/npcRepository'

export default function Npcs() {
    const [npcs, setNpcs] = useState<DmToolsData[]>([])

    const setNpcData = async () => {
        console.log('[page][Npcs] getting Npcs')
        setNpcs(await npcRepository.getAll())
    }

    useEffect(() => {
        setNpcData()
            .catch(console.error)

        const deleteListener = npcRepository.onUpdate(async () => {
            console.log('[page][Npcs] npc updated')
            await setNpcData()
        })

        return ()  => {
            if (deleteListener) deleteListener()
        }
    }, [])

    const handleDelete = async (id: string) => {
        const result = await npcRepository.deleteNpc(id)
        console.log(`[page][Npcs] Delete ${id} - ${result}`)
    }

    const style = {
        buttons: {
            display: 'flex',
            marginLeft: 'auto'
        }
    }

    return (
        <React.Fragment>
            <Title>Npcs</Title>
            {npcs.map(npc => {
                return (
                    <Card variant='outlined' key={npc.id}>
                        <Box display='flex' flexDirection='row'>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {npc.profile.name}
                                </Typography>
                                <Typography variant='h6' >
                                    {npc.profile.race}
                                </Typography>
                            </CardContent>
                            <Box sx={style.buttons}>
                                <Link to={`/npcSheet/${npc.id}`}>
                                    <Tooltip title="View">
                                        <IconButton aria-label="view" >
                                            <RemoveRedEyeIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                                <Link to={`/createNpc/${npc.id}`}>
                                    <Tooltip title="Edit">
                                        <IconButton aria-label="edit" >
                                            <EditOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Link>
                                <Tooltip title="Delete">
                                    <IconButton aria-label="delete" onClick={() => handleDelete(npc.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Card >
                )
            })}
        </React.Fragment>
    )
}

import React, { useEffect, useState } from "react"
import Title from "../components/Title"
import { DmToolsData } from "../lib/CharacterSheetProcessor"
import { Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Npcs() {
    const [npcs, setNpcs] = useState<DmToolsData[]>([])

    const setNpcData = async () => {
        console.log('getting Npcs')
        setNpcs(await window.electron.getNpcs())
    }

    useEffect(() => {
        setNpcData()
            .catch(console.error)

        window.electron.npcUpdated(async () => {
            console.log('npc updated')
            await setNpcData()
        })
    }, [])

    const handleDelete = async (id: string) => {
        const result = await window.electron.deleteNpc(id)
        console.log(`Delete ${id} - ${result}`)
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
                    <Card variant='outlined'>
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

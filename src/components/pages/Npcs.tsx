import React, { useEffect, useState } from "react"
import { Npc } from '../../lib/saveNpc'
import { Box, Card, CardContent, IconButton, Tooltip, Typography } from "@mui/material"
import Title from "../Title"
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditNpc from "./EditNpc";

const style = {
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttons: {
        display: 'flex',
        marginLeft: 'auto'
    }
}

export default function Npcs() {
    const [npcs, setNpcs] = useState<Npc[]>([])
    const [showEditor, setShowEditor] = useState(false)

    const setNpcData = async () => {
        console.log('getting Npcs')
        setNpcs(await window.electron.getNpcs())
    }

    useEffect(() => {
        setNpcData()
            .catch(console.error)
    }, [])

    const handleDelete = async (id: string) => {
        const result = await window.electron.deleteNpc(id)
        console.log(`Delete ${id} - ${result}`)
    }

    function toggleEditor() {
        setShowEditor((showEditor) => !showEditor)
    }

    return (
        <React.Fragment>
            <Box sx={style.title}>
                <Title>Npc's</Title>
                <Tooltip title="Edit">
                    <IconButton aria-label="edit" onClick={() => toggleEditor()}>
                        <EditOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            {npcs.map(npc => {
                return (
                    <Card variant='outlined'>
                        {!showEditor &&
                            <Box display='flex' flexDirection='row'>
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
                                <Box sx={style.buttons}>
                                    <Tooltip title="Delete">
                                        <IconButton aria-label="delete" onClick={() => handleDelete(npc.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        }
                        {showEditor &&
                            <EditNpc
                                name={npc.name}
                                race={npc.race}
                                gender={npc.gender}
                                id={npc.id}
                            />
                        }
                    </Card>
                )
            })}
        </React.Fragment>
    )
}

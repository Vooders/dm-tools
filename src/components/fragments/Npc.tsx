import React, { useState } from "react";
import { Npc } from '../../lib/saveNpc'
import { Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import EditNpc from "../pages/EditNpc";
import { EditOutlined, Delete, CancelOutlined } from '@mui/icons-material';


export default function Npc(npc: Npc) {
  const [showEditor, setShowEditor] = useState(false)

  const handleDelete = async (id: string) => {
    const result = await window.electron.deleteNpc(id)
    console.log(`Delete ${id} - ${result}`)
  }

  function toggleEditor() {
    setShowEditor((showEditor) => !showEditor)
  }

  const style = {
    buttons: {
      display: 'flex',
      marginLeft: 'auto'
    }
  }

  return (
    <React.Fragment>
      <Card variant='outlined'>
        {
          !showEditor &&
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
              <Tooltip title="Edit">
                <IconButton aria-label="edit" onClick={() => toggleEditor()}>
                  <EditOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={() => handleDelete(npc.id)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        }
      {
        showEditor &&
        <Box>
          <Box display='flex' flexDirection='row'>
            <Box sx={style.buttons}>
              <Tooltip title="Cancel">
                <IconButton aria-label="cancel" onClick={() => toggleEditor()}>
                  <CancelOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <EditNpc
            name={npc.name}
            race={npc.race}
            gender={npc.gender}
            notes={npc.notes}
            id={npc.id}
          />
        </Box>
      }
      </Card >
    </React.Fragment >
  )
}
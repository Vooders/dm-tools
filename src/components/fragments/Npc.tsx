import React from "react";
import { Npc } from '../../lib/saveNpc'
import { Card, CardContent, Typography, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { EditOutlined, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function Npc(npc: Npc) {

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
      <Card variant='outlined'>
        
          <Box>
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
              <Link to={`/createNpc/${npc.id}`}>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit" >
                    <EditOutlined />
                  </IconButton>
                </Tooltip>
              </Link>
              <Link to={`/npcSheet/${npc.id}`}>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit" >
                    <RemoveRedEyeIcon />
                  </IconButton>
                </Tooltip>
              </Link>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" onClick={() => handleDelete(npc.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            <Box display='flex' flexDirection='row'>
              <Card>
                <Typography>
                  Strength
                </Typography>
                {npc.abilities.strength}
              </Card>
              <Card>
                <Typography>
                  Dexterity
                </Typography>
                {npc.abilities.dexterity}
              </Card>
              <Card>
                <Typography>
                  Constitution
                </Typography>
                {npc.abilities.constitution}
              </Card>
              <Card>
                <Typography>
                  Intelligence
                </Typography>
                {npc.abilities.intelligence}
              </Card>
              <Card>
                <Typography>
                  Wisdom
                </Typography>
                {npc.abilities.wisdom}
              </Card>
              <Card>
                <Typography>
                  Charisma
                </Typography>
                {npc.abilities.charisma}
              </Card>
            </Box>
          </Box>
      </Card >
    </React.Fragment >
  )
}
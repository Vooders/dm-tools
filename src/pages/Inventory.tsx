import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Title from '../components/Title';
import { Card, CardContent, Grid } from '@mui/material';
import { Item, ItemContainer } from '../dm-tools-data.types';

import * as characterRepository from '../repositories/characterRepository'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function Inventory() {
  const [fullInventory, setFullInventory] = useState([])
  const [inventory, setInventory] = useState([])

  useEffect(() => {
      (async () => {
        console.log('Initial load of inventory data')
        await getInventory()
      })()

      const removeListener = characterRepository.onUpdate(async () => {
        console.log('Characters updated: reloading inventory data')
        await getInventory()
      })

      return () => {
        if(removeListener) removeListener()
    }
  }, [])

  const getInventory = async () => {
    console.log('getting inventory')
    const inv = await window.electron.invoke('inventory:get')
    setInventory(inv)
    setFullInventory(inv)
  }

  function search(name: string) {
    console.log('searching', fullInventory)
    const results = fullInventory
      .map((character: any) => {
        return {
          ...character,
          inventory: character.inventory.map((container: ItemContainer) => {
            return {
              name: container.name,
              contents: container.contents.filter((item: any) => item.definition.name.toLowerCase().includes(name.toLowerCase()))
            }
          })
        }
      })
    setInventory(results)
  }

  return (
    <React.Fragment>
      <Title>Inventory</Title>
      <FormGroup>
        <TextField id="standard-basic" label="Search" variant="standard" onChange={(e) => search(e.target.value)} />
      </FormGroup>
      <Stack spacing={2} mt={2}>
        {inventory.map(character => {
          return (
            <React.Fragment key={`${character.name}`}>
              <Title>{character.name}</Title>
              {character.inventory.map((container: ItemContainer, index: number) => {
                return (

                  <Card variant="outlined" key={`characterInventory${index}`}>
                    <CardContent>
                      <Grid container direction="row" spacing={2}>
                        <Grid item>{container.equipped ? '✔️ ' : '❌ '}{container.name}</Grid>
                        <Grid item>{container.capacity}{container.capacity ? 'lb capacity' : ''}</Grid>
                      </Grid>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Equipped</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Rarity</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Notes</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {container.contents.map((item: Item, index: number) => (
                            <TableRow key={`${item.id}-${index}`}>
                              <TableCell>{item.equipped ? '✔️' : '❌'}</TableCell>
                              <TableCell>{item.definition.name}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.definition.weight} lbs</TableCell>
                              <TableCell>{item.definition.rarity}</TableCell>
                              <TableCell>{item.definition.filterType}</TableCell>
                              <TableCell>{item.definition.description}</TableCell>
                              <TableCell>{item.definition.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )
              })}
            </React.Fragment>
          )
        })}
      </Stack>
    </React.Fragment>
  );
}

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
import Title from '../Title';
import { ItemContainer } from '../../lib/CharacterSheetProcessor';
import { Card, CardContent } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function Inventory() {
  const [fullInventory, setFullInventory] = useState([])
  const [inventory, setInventory] = useState([])

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

  const getInventory = async () => {
    console.log('getting inventory')
    const inv = await window.electron.getInventories()
    setInventory(inv)
    setFullInventory(inv)
  }

  useEffect(() => {
    getInventory()
      .catch(console.error)

    window.electron.characterUpdated(async () => {
      console.log('character updated')
      await getInventory()
    })
  }, [])

  return (
    <React.Fragment>
      <Title>Inventory</Title>
      <FormGroup>
        <TextField id="standard-basic" label="Search" variant="standard" onChange={(e) => search(e.target.value)} />
      </FormGroup>
      <Stack spacing={2}>
        {inventory.map(character => {
          return (
            <>
              <Title>{character.name}</Title>
              {character.inventory.map((container: ItemContainer) => {
                return (
                  <Card variant="outlined">
                    <CardContent>
                      {container.name}

                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Equipped</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Rarity</TableCell>
                            <TableCell>Type</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {container.contents.map((item: any) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.equipped ? '✔️' : '❌'}</TableCell>
                              <TableCell>{item.definition.name}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.definition.weight} lbs</TableCell>
                              <TableCell>{item.definition.rarity}</TableCell>
                              <TableCell>{item.definition.filterType}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )
              })}

            </>
          )
        })}
      </Stack>
    </React.Fragment>
  );
}

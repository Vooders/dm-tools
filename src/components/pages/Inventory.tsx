import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Title from '../Title';

export declare interface InventoryProps {
  inventory: Item[],
  characterValues: CharacterValues[]
}

export type Item = {
  id: number,
  definition: {
    id: string,
    avatarUrl: string,
    name: string,
    weight: number,
    rarity: string,
    filterType: string,
    isContainer: boolean
  },
  equipped: boolean,
  quantity: number
}

export type CharacterValues = {
  typeId: number,
  value: string,
  valueId: string
}

type InventoryView = {
  container: Item,
  items: Item[]
}

function addCustomNames(inventory: Item[], characterValues: CharacterValues[]): Item[] {
  const renames = characterValues.filter(characterValue => characterValue.typeId === 8)
  return inventory.map(item => {
    renames.forEach(value => {
      if (value.valueId === item.id.toString()) {
        item.definition.name = value.value
      }
    })
    return item
  })
}

function getConatiners(inventory: Item[]): InventoryView[] {
  return inventory.filter(item => item.definition.isContainer)
    .map(container => {
      return {
        container,
        items: [] as Item[]
      }
    })
}

function shapeData(inventory: Item[], characterValues: CharacterValues[]) {
  return addCustomNames(inventory, characterValues)
}

export default function Inventory({ inventory, characterValues }: InventoryProps) {
  const bob = shapeData(inventory, characterValues)

  const [filteredInventory, setInventory ] = useState(bob)

  function search(name: string) {
      const results = bob
        .filter((item: any) => item.definition.name.toLowerCase().includes(name.toLowerCase()))
      setInventory(results)
  }

  return (
    <React.Fragment>
      <Title>Inventory</Title>
      <FormGroup>
        <TextField id="standard-basic" label="Search" variant="standard" onChange={(e) => search(e.target.value)}/>
      </FormGroup>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Equipped</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Rarity</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredInventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell><img src={item.definition.avatarUrl} /></TableCell>
              <TableCell>{item.equipped ? '✔️' : '❌' }</TableCell>
              <TableCell>{item.definition.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.definition.weight} lbs</TableCell>
              <TableCell>{item.definition.rarity}</TableCell>
              <TableCell>{item.definition.filterType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

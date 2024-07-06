import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Title from '../components/Title'
import { Card, CardContent, Grid } from '@mui/material'
import { Item, ItemContainer } from '../dm-tools-data.types'

import useUpdateWithCharacters from '../hooks/useUpdateWithCharacters'
import { InventoryData } from '../handlers/getInventories'
import { RendererLogger } from '../logger/RendererLogger'
import Currencies from '../components/Currencies'

const logger = new RendererLogger('[page][Inventory]', window)

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}))

export default function Inventory() {
    const fullInventory = useUpdateWithCharacters<InventoryData[]>('inventory', logger, [])
    const [inventory, setInventory] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        console.log('[page][Inventory] searching', searchQuery)
        const results = fullInventory
            .map((character: any) => {
                return {
                    ...character,
                    inventory: character.inventory.map((container: ItemContainer) => {
                        return {
                            name: container.name,
                            equipped: container.equipped,
                            currency: container.currency,
                            contents: container.contents.filter((item: any) => item.definition.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        }
                    })
                }
            })
        setInventory(results)
    }, [searchQuery, fullInventory])

    function Container({ container }: { container: ItemContainer }) {
        if (container.contents.length === 0) {
            return null
        }
        return (
            <Card variant="outlined">
                <CardContent>
                    <Grid container direction="row" justifyContent='space-between' spacing={2}>
                        <Grid item>{container.equipped ? '✔️ ' : '❌ '}{container.name}</Grid>
                        <Grid item>{container.currency && <Currencies currencies={container.currency} showZeroes={false} align='right'/>}</Grid>
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
    }

    return (
        <React.Fragment>
            <Title>Inventory</Title>
            <FormGroup>
                <TextField id="standard-basic" label="Search" variant="standard" onChange={(e) => setSearchQuery(e.target.value)} />
            </FormGroup>
            <Stack spacing={2} mt={2}>
                {inventory.map(character => {
                    return (
                        <React.Fragment key={`${character.name}`}>
                            <Title>{character.name}</Title>
                            {character.inventory.map((container: ItemContainer, index: number) => {
                                return (
                                    <Container container={container} key={`characterInventory${index}`} />
                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </Stack>
        </React.Fragment>
    )
}

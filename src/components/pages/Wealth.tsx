import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { Typography, Card, CardContent } from '@mui/material'
import { WealthData } from '../../handlers/getWealth'
import Currencies from '../fragments/Currencies'
import Currency from '../fragments/Currency'
import { InventoryData } from '../../handlers/getInventories'

export default function Wealth() {
    const [wealth, setWealth] = useState<WealthData[]>([])
    const [inventories, setInventory] = useState<InventoryData[]>([])

    const getWealth = async () => {
        setWealth(await window.electron.getWealth())
    }

    const getInventory = async () => {
        console.log('getting inventory')
        const inv = await window.electron.getInventories()
        setInventory(inv)
    }

    useEffect(() => {
        getWealth()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            await getWealth()
        })
    }, [])

    useEffect(() => {
        getInventory()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            console.log('character updated')
            await getInventory()
        })
    }, [])

    const reduceContainer  = async (): Promise<number> => {
        const total = inventories[0].inventory[0].contents.reduce((acc: any, item: any) => acc + (item.definition.cost * item.quantity), 0)

        console.log(inventories)
        console.log('name: ', inventories[0].name)
        console.log('container: ', inventories[0].inventory[0].name)
        console.log('total: ', total)

        return total
    }
    reduceContainer()

    return (
        <React.Fragment>
            <Title>Wealth</Title>

            {wealth.map(character => {
                return (
                    <Card variant="outlined">
                        <CardContent>
                            <Typography component="div" variant="h5">
                                {character.name}
                            </Typography>
                            <Currency size='large' amount={character.currencies.total} icon='gold' />
                            <Currencies align='left' currencies={character.currencies} />
                        </CardContent>
                    </Card>
                )
            })}
        </React.Fragment>
    )

}

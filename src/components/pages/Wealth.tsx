import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { Typography, Card, CardContent } from '@mui/material'
import { WealthData } from '../../handlers/getWealth'
import Currencies from '../fragments/Currencies'
import Currency from '../fragments/Currency'

export default function Wealth() {
    const [wealth, setWealth] = useState<WealthData[]>([])

    const getWealth = async () => {
        setWealth(await window.electron.getWealth())
    }

    useEffect(() => {
        getWealth()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            await getWealth()
        })
    }, [])

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
                            <Currencies align='left' currencies={character.currencies} />
                            Currencies Total:
                            <Currency size='large' amount={character.currencies.total} icon='gold' />
                            {character.containers.map(container => {
                                return <>
                                    <Typography >
                                        {container.name}
                                    </Typography>
                                    <Currency amount={container.value} icon='gold' />
                                </>
                            })}
                            Containers Total:
                            <Currency size="large" amount={character.totalContainerWealth} icon='gold' />
                        </CardContent>
                    </Card>
                )
            })}
        </React.Fragment>
    )

}

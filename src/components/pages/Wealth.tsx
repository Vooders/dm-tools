import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { Typography, Card, CardContent, Grid } from '@mui/material'
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

            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
            >
                {wealth.map(character => {
                    return (
                        <Grid item >
                            <Card variant="outlined" >
                                <CardContent>
                                    <Typography component="div" variant="h5" >
                                        {character.name}
                                    </Typography>
                                    <Typography component="div" variant="h5" >
                                        Total Wealth {character.totalWealth}
                                    </Typography>
                                    <Currencies align='left' currencies={character.currencies} />
                                    <Grid item display="flex">
                                        <Typography component="div" variant="h6" >
                                            Total Currency:
                                        </Typography>
                                        <Currency size='large' amount={character.currencies.total} icon='gold' />
                                    </Grid>
                                    {character.containers.map(container => {
                                        return <Grid item display="flex" >
                                            <Typography >
                                                {container.name}:
                                            </Typography>
                                            <Currency amount={container.value} icon='gold' />
                                        </Grid>
                                    })}
                                    <Grid item display="flex">
                                        <Typography component="div" variant="h6">
                                            Containers Total:
                                        </Typography>
                                        <Currency size="large" amount={character.totalContainerWealth} icon='gold' />
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </React.Fragment>
    )
}

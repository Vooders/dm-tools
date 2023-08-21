import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { Typography, Card, CardContent, Grid, Divider } from '@mui/material'
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

    const cardStyling = {
        display: 'flex',
        padding: '5px',
        variant: "outlined",
        boxShadow: 5,
        borderRadius: 2,
        margin: 0.5,
        backgroundColor: 'rgb(10, 35, 57)'
    }

    return (
        <React.Fragment>
            <Title>Wealth</Title>

            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={0.5}
            >
                {wealth.map(character => {
                    return (
                        <Grid item >
                            <Card variant="outlined" sx={cardStyling}>
                                <CardContent>
                                    <Typography component="div" variant="h5" sx={{ m: '.2rem' }}>
                                        {character.name}
                                    </Typography>
                                    <Divider />
                                    <Grid item display="flex" sx={{ margin: '.2rem' }}>
                                        <Typography component="div" variant="h6" sx={{ mr: '.2rem' }}>
                                            Total Wealth:
                                        </Typography >
                                        <Currency size="large" amount={character.totalWealth} icon='gold' />
                                    </Grid>
                                    <Divider />
                                    <Grid item sx={{ mx: '.2rem' }}>
                                        <Currencies showZeroes={true} align='left' currencies={character.currencies} />
                                        <Grid item display="flex" >
                                            <Typography component="div" variant="h6" sx={{ mr: '.2rem' }}>
                                                Currency:
                                            </Typography>
                                            <Currency size='large' amount={character.currencies.total} icon='gold' />
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid container sx={{ margin: '.2rem' }}></Grid>
                                    {character.containers.map(container => {
                                        return <>
                                            <Grid item display="flex">
                                                <Typography sx={{ fontSize: '14px', mx: '.2rem' }}>
                                                    {container.name}: {container.value}
                                                </Typography>
                                            </Grid>
                                        </>
                                    })}
                                    <Grid item display="flex">
                                        <Typography component="div" variant="h6" sx={{ mx: '.2rem' }}>
                                            Containers:
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

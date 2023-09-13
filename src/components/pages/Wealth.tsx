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

    function reduceAndRound<T>(someArray: T[], reduceFunc: (acc: number, item: T) => number): number {
        const result = someArray.reduce(reduceFunc, 0)
        return Math.round(result * 100) / 100
    }

    const totalWealth = () => {
        return reduceAndRound<WealthData>(wealth, (total, wealthData) => total += wealthData.totalWealth)
    }
    const totalCurrency = () => {
        return reduceAndRound<WealthData>(wealth, (total, wealthData) => total += wealthData.currencies.total)
    }

    const cardStyling = {
        padding: '.3rem',
        variant: "outlined",
        boxShadow: 5,
        borderRadius: 2,
        margin: 0.5,
        backgroundColor: 'rgb(10, 35, 57)',
    }

    return (
        <React.Fragment>
            <Title>Wealth</Title>
            <Card variant="outlined" sx={cardStyling}>
                <CardContent>
                    <Grid container >
                        <Grid item display="flex" xs={6} >
                            <Typography component="div" variant="h6" mx='.5rem' >
                                Total Currency:
                            </Typography>
                            <Currency size='large' amount={totalCurrency()} icon='gold' />
                        </Grid>
                        <Grid item display="flex" xs={6}>
                            <Typography component="div" variant="h6" mx='.5rem'>
                                Total Wealth:
                            </Typography>
                            <Currency size='large' amount={totalWealth()} icon='gold' />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
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
                                    <Typography component="div" variant="h5" m='.2rem'>
                                        {character.name}
                                    </Typography>
                                    <Divider />
                                    <Grid item display="flex" m='.2rem'>
                                        <Typography component="div" variant="h6" mr='.2rem'>
                                            Total Wealth:
                                        </Typography >
                                        <Currency size="large" amount={character.totalWealth} icon='gold'/>
                                    </Grid>
                                    <Divider />
                                    <Grid item mx='.2rem'>
                                        <Currencies showZeroes={true} align='left' currencies={character.currencies}/>
                                        <Grid item display="flex" >
                                            <Typography component="div" variant="h6" mr='.2rem'>
                                                Currency:
                                            </Typography>
                                            <Currency size='large' amount={character.currencies.total} icon='gold'/>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid container m='.2rem'></Grid>
                                    {character.containers.map(container => {
                                        return <>
                                            <Grid item display="flex">
                                                <Typography mx='.2rem' fontSize='0.9rem'>
                                                    {container.name}: {container.value}
                                                </Typography>
                                            </Grid>
                                        </>
                                    })}
                                    <Grid item display="flex">
                                        <Typography component="div" variant="h6" mx= '.2rem'>
                                            Items:
                                        </Typography>
                                        <Currency size="large" amount={character.totalContainerWealth} icon='gold'/>
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

import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { Typography } from '@mui/material'
import { WealthData } from '../../handlers/getWealth'
import Currency from '../fragments/Currency'
 
export default function Wealth () {
    const [wealth, setWealth] = useState<WealthData[]>([])

    const getWealth = async () => {
        console.log('getting Wealth')
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
            
            <p>{wealth[0].name}</p>
            <Currency amount={wealth[0].currencies.total} icon='gold'/>
        <Typography>
        Test
        </Typography> 
        </React.Fragment>
    )
    
}

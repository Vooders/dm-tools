import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { Typography } from '@mui/material'
import { WealthData } from '../../handlers/getWealth'
 
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
        <Typography>
        Test
        </Typography> 
        </React.Fragment>
    )
    
}

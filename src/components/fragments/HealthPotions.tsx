import { Grid } from '@mui/material'
import React from 'react'
import HealthPotion from './HealthPotion'
import { HealthPotions } from '../../lib/CharacterSheetProcessor'

export default function HealthPotions(healthPotions: HealthPotions) {

    return (
    <Grid container >
        {(healthPotions.normal > 0) &&
            <Grid item>
                <HealthPotion type='normal' amount={healthPotions.normal} />
            </Grid>
        }
        {(healthPotions.greater > 0) &&
            <Grid item>
                <HealthPotion type='greater' amount={healthPotions.greater}/>
            </Grid>
        }
    </Grid>
    )
}

import { Box, Grid, Typography } from "@mui/material"
import React from "react"


export default function HealthPotion(props: HealthPotionData) {
    const height = props.type === 'greater' ? '25px' : '20px'
    const width = props.type === 'greater' ? '35px' : '20px'

    return (
        <Grid container>
            <Grid item >
                <Typography> {props.amount} </Typography>
            </Grid>
            <Grid item >
                <Box sx={{ paddingRight: 1.5, paddingLeft: 0.3 }}>
                    <img
                        src={`../../../../img/red-potion.png`}
                        alt={props.type}
                        height={height}
                        width={width}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export type HealthPotionData = {
    type: string
    amount: number
}

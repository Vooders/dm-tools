import { Typography, Divider, Grid } from '@mui/material'
import React from 'react'
import { Currencies } from '../../lib/CharacterSheetProcessor'
import Currency from './Currency'


export default function Currencies(props: CurrenciesProps) {
  
  return (
    <>
      <Grid xs={12} container spacing={0} padding={0} direction='row-reverse' justifyContent= "flex-start" columnSpacing={1}>
        <Grid item>
          <Currency  amount={props.currencies.cp} icon='copper'/>         
        </Grid>
        <Grid item>
          <Currency  amount={props.currencies.sp} icon='silver'/>  
        </Grid>
        <Grid item>
          <Currency  amount={props.currencies.ep} icon='electrum'/>
        </Grid>
        <Grid item>
          <Currency  amount={props.currencies.gp} icon='gold'/>
        </Grid>
        <Grid item>
          <Currency  amount={props.currencies.pp} icon='platinum'/>
        </Grid>
      </Grid>
      <Divider/>
    </>
  )
}

interface CurrenciesProps {
  currencies: Currencies
}

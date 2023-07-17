import { Typography, Divider, Grid } from '@mui/material'
import React from 'react'
import { Currencies } from '../../lib/CharacterSheetProcessor'
import Currency from './Currency'

export default function Currencies(props: CurrenciesProps) {
  return (
    <>
      <Grid xs={9} container spacing={0}>
        <Grid item xs={1}>
          <Currency icon='copper' amount={props.currencies.cp}/>
        </Grid>
        <Grid item xs={1}>
          <Currency icon='silver' amount={props.currencies.sp}/>
        </Grid>
        <Grid item xs={1}>
          <Currency icon='electrum' amount={props.currencies.ep}/>
        </Grid>
        <Grid item xs={1}>
          <Currency icon='gold' amount={props.currencies.gp}/>
        </Grid>
        <Grid item xs={1}>
          <Currency icon='platinum' amount={props.currencies.pp}/>
        </Grid>
      </Grid>
      <Divider/>
      <Grid item xs={2}>
        <Typography>
          <Currency icon='gold' amount={props.currencies.total}/>
        </Typography>
      </Grid>
    </>
  )
}

interface CurrenciesProps {
  currencies: Currencies
}

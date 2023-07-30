import { Grid } from '@mui/material'
import React from 'react'
import { Currencies } from '../../lib/CharacterSheetProcessor'
import Currency from './Currency'


export default function Currencies(props: CurrenciesProps) {
  
  return (
    <>
      <Grid xs={12} container padding={0} columnSpacing={1} direction='row-reverse' justifyContent="flex-start" >
        {props.currencies.cp > 0 &&
            <Grid item>
              <Currency  amount={props.currencies.cp} icon='copper'/>         
            </Grid>
        }
        {props.currencies.sp > 0 &&
            <Grid item>
              <Currency  amount={props.currencies.sp} icon='silver'/>  
            </Grid>
        }
        {props.currencies.ep > 0 &&
            <Grid item>
              <Currency  amount={props.currencies.ep} icon='electrum'/>
            </Grid>
        }
        {props.currencies.gp > 0 &&
            <Grid item>
              <Currency  amount={props.currencies.gp} icon='gold'/>
            </Grid>
        }
        {props.currencies.pp > 0 &&
            <Grid item>
              <Currency  amount={props.currencies.pp} icon='platinum'/>
            </Grid>
        } 
      </Grid>
    </>
  )
}

interface CurrenciesProps {
  currencies: Currencies
}

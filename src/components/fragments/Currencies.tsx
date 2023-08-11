import { Grid } from '@mui/material'
import React from 'react'
import { Currencies } from '../../lib/CharacterSheetProcessor'
import Currency from './Currency'


export default function Currencies(props: CurrenciesProps) {
  const currencyAmount = props.currencies
  
  const direction = props.align === 'left' ? 'row' : 'row-reverse'

    return (
      <>
        <Grid xs={12} container padding={0} columnSpacing={1} direction={direction} justifyContent="flex-start" >
          {currencyAmount.cp > 0 &&
              <Grid item>
                <Currency  amount={currencyAmount.cp} icon='copper'/>         
              </Grid>
          }
          {currencyAmount.sp > 0 &&
              <Grid item>
                <Currency  amount={currencyAmount.sp} icon='silver'/>  
              </Grid>
          }
          {currencyAmount.ep > 0 &&
              <Grid item>
                <Currency  amount={currencyAmount.ep} icon='electrum'/>
              </Grid>
          }
          {currencyAmount.gp > 0 &&
              <Grid item>
                <Currency  amount={currencyAmount.gp} icon='gold'/>
              </Grid>
          }
          {currencyAmount.pp > 0 &&
              <Grid item>
                <Currency  amount={currencyAmount.pp} icon='platinum'/>
              </Grid>
          } 
        </Grid>
      </>
    )
  }

interface CurrenciesProps {
  align: 'left' |'right'
  currencies: Currencies
}

type bob = 'row' | 'row-reverse'
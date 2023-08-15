import { Grid } from '@mui/material'
import React from 'react'
import { Currencies } from '../../lib/CharacterSheetProcessor'
import Currency from './Currency'


export default function Currencies(props: CurrenciesProps) {
  const currencyAmount = props.currencies

  const direction = props.align === 'left' ? 'row' : 'row-reverse'

  const showZeroes = props.showZeroes

  return (
    <>
      <Grid xs={12} container padding={0} columnSpacing={1} direction={direction} justifyContent="flex-start" >


        {currencyAmount.cp > 0 ?
          <Grid item>
            <Currency amount={currencyAmount.cp} icon='copper' />
          </Grid> : showZeroes ? <Grid item>
            <Currency amount={currencyAmount.cp} icon='copper' />
          </Grid> : <></>
        }
        {currencyAmount.sp > 0 ? showZeroes &&
          <Grid item>
            <Currency amount={currencyAmount.sp} icon='silver' />
          </Grid> : showZeroes ? <Grid item>
            <Currency amount={currencyAmount.sp} icon='silver' />
          </Grid> : <></>
        }
        {currencyAmount.ep > 0 ? showZeroes &&
          <Grid item>
            <Currency amount={currencyAmount.ep} icon='electrum' />
          </Grid> : showZeroes ? <Grid item>
            <Currency amount={currencyAmount.ep} icon='electrum' />
          </Grid> : <></>
        }
        {currencyAmount.gp > 0 ? showZeroes &&
          <Grid item>
            <Currency amount={currencyAmount.gp} icon='gold' />
          </Grid> : showZeroes ? <Grid item>
            <Currency amount={currencyAmount.gp} icon='gold' />
          </Grid> : <></>
        }
        {currencyAmount.pp > 0 ? showZeroes &&
          <Grid item>
            <Currency amount={currencyAmount.pp} icon='platinum' />
          </Grid> : showZeroes ? <Grid item>
            <Currency amount={currencyAmount.pp} icon='platinum' />
          </Grid> : <></>
        }
      </Grid>
    </>
  )
}

interface CurrenciesProps {
  showZeroes: boolean
  align: 'left' | 'right'
  currencies: Currencies
}

type bob = 'row' | 'row-reverse'
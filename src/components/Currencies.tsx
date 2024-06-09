import { Box, Grid } from '@mui/material'
import React from 'react'
import Currency from './Currency'
import { CurrenciesType } from '../dm-tools-data.types'

const style = {
  display: 'flex',
  flexDirection: 'row',
  paddingTop: '5px'
}

export default function Currencies(props: CurrenciesProps) {
  const currencyAmount = props.currencies
  const direction = props.align === 'left' ? 'row' : 'row-reverse'

  const displayCurrency = (amount: number) => {
    return amount > 0 || props.showZeroes
  }

  return (
    <Box sx={style}>
      <Grid container padding={0} columnSpacing={1} direction={direction} justifyContent="flex-start" >

        {displayCurrency(currencyAmount.cp) &&
          <Grid item>
            <Currency amount={currencyAmount.cp} icon='copper' />
          </Grid>
        }
        {displayCurrency(currencyAmount.sp) &&
          <Grid item>
            <Currency amount={currencyAmount.sp} icon='silver' />
          </Grid>
        }
        {displayCurrency(currencyAmount.ep) &&
          <Grid item>
            <Currency amount={currencyAmount.ep} icon='electrum' />
          </Grid>
        }
        {displayCurrency(currencyAmount.gp) &&
          <Grid item>
            <Currency amount={currencyAmount.gp} icon='gold' />
          </Grid>
        }
        {displayCurrency(currencyAmount.pp) &&
          <Grid item>
            <Currency amount={currencyAmount.pp} icon='platinum' />
          </Grid>
        }
      </Grid>
    </Box>
  )
}

interface CurrenciesProps {
  showZeroes: boolean
  align: 'left' | 'right'
  currencies: CurrenciesType
}

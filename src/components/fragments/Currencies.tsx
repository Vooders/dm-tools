import { Grid } from '@mui/material'
import React from 'react'
import { Currencies } from '../../lib/CharacterSheetProcessor'
import Currency from './Currency'


export default function Currencies(props: CurrenciesProps) {
  const currencyAmount = props.currencies
  const direction = props.align === 'left' ? 'row' : 'row-reverse'

  const displayZeroes = (amount: number) => {
    return amount > 0 || props.showZeroes
  }

  return (
    <>
      <Grid container padding={0} columnSpacing={1} direction={direction} justifyContent="flex-start" >

      {displayZeroes(currencyAmount.cp) &&
          <Grid item>
            <Currency amount={currencyAmount.cp} icon='copper'/>
          </Grid>
        }
        {displayZeroes(currencyAmount.sp) &&         
         <Grid item>
            <Currency amount={currencyAmount.sp} icon='silver'/>
          </Grid>
        }
        {displayZeroes(currencyAmount.ep) &&      
         <Grid item>
            <Currency amount={currencyAmount.ep} icon='electrum'/>
          </Grid>
        }
        {displayZeroes(currencyAmount.gp) &&       
         <Grid item>
            <Currency amount={currencyAmount.gp} icon='gold'/>
          </Grid>
        }
        {displayZeroes(currencyAmount.pp) &&         
        <Grid item>
            <Currency amount={currencyAmount.pp} icon='platinum'/>
          </Grid>
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

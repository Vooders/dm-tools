import Box from "@mui/material/Box"
import React from "react"
import Icon from '@mdi/react'
import BlockIcon from '@mui/icons-material/Block'
import { mdiDice6, mdiDiceD8, mdiDiceD10, mdiDiceD12 } from '@mdi/js'
import { HitDice } from "../dm-tools-data.types"

export default function hitDice(props: HitDiceProps) {
    const icons: any = {
        d6: <Icon path={mdiDice6} size={1} />,
        d8: <Icon path={mdiDiceD8} size={1} />,
        d10: <Icon path={mdiDiceD10} size={1} />,
        d12: <Icon path={mdiDiceD12} size={1} />
    }

    return (
        <Box sx={{ display: 'flex' }}>
            {props.hitDice.map((dice, index) => {
                return (
                    <Box sx={{ display: 'flex', mx: 1 }} key={`hitDice${index}`}>
                        {new Array(dice.max - dice.used).fill(0).map((_, index) => {
                            return (
                               <Box key={`die${index}`}>
                                   {icons[dice.dice]}
                               </Box>
                            )
                        })}
                        {new Array(dice.used).fill(0).map((_, index) => {
                            return (
                               <BlockIcon sx={{color: '#ff6d75'}} key={`usedDie${index}`} />
                            )
                        })}
                    </Box>
                )
            })}
        </Box>
    )
}

interface HitDiceProps {
    hitDice: HitDice[]
}

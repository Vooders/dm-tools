import Box from "@mui/material/Box";
import React from "react";
import { HitDice } from "../../../src/lib/character-sheet-processor/hitDice";
import Icon from '@mdi/react';
import { mdiDice6, mdiDiceD8, mdiDiceD10, mdiDiceD12 } from '@mdi/js';

export default function hitDice(props: HitDiceProps) {
    const icons: any = {
        d6: <Icon path={mdiDice6} size={1} />,
        d8: <Icon path={mdiDiceD8} size={1} />,
        d10: <Icon path={mdiDiceD10} size={1} />,
        d12: <Icon path={mdiDiceD12} size={1} />
    }

    return (
        <Box sx={{ display: 'flex' }}>
            {props.hitDice.map((dice) => {
                return (
                    <Box sx={{ display: 'flex', mx: 1 }}>
                        {new Array(dice.max - dice.used).fill(0).map((thing: any) => {
                            return (
                               <Box>
                                   {icons[dice.dice]}
                               </Box>
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
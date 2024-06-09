import React from 'react'
import Slots from './Slots'
import { Box } from '@mui/material'
import { SpellSlot, Action } from '../dm-tools-data.types'

const styling = {
    display: 'flex',
    paddingY: '3px'
}

export default function Actions(props: ActionsProps) {
    return (
        <React.Fragment>
            <Box sx={styling}>
                {props.spellSlots.map(spellSlot => {
                    return (
                        <Slots
                            title={`Level ${spellSlot.level}`}
                            max={spellSlot.max} used={spellSlot.used}
                            description=''
                            highlight={!props.isUnconscious}
                        />
                    )
                })}
            </Box>
            <Box sx={styling}>
                {props.limitedUseActions.map(limitedUseAction => {
                    return (
                        <Slots
                            title={`${limitedUseAction.name}`}
                            max={limitedUseAction.limitedUse.maxUses}
                            used={limitedUseAction.limitedUse.numberUsed}
                            description={limitedUseAction.snippet}
                            highlight={!props.isUnconscious}
                        />
                    )
                })}
            </Box>
        </React.Fragment>
    )
}

interface ActionsProps {
    spellSlots: SpellSlot[]
    limitedUseActions: Action[]
    isUnconscious: boolean
}

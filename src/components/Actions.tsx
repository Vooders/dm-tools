import React from 'react'
import Slots from './Slots'
import { Box } from '@mui/material'
import { SpellSlot, Action } from '../dm-tools-data.types'
import KiPoints from './KiPoints'

const styling = {
    display: 'flex',
    paddingY: '3px'
}

export default function Actions(props: ActionsProps) {
    const ki = props.limitedUseActions.filter(action => action.name === 'Ki Points')[0]
    const limitedUseActions = props.limitedUseActions.filter(action => action.name != 'Ki Points')

    return (
        <React.Fragment>
            {ki && <KiPoints max={ki.limitedUse.maxUses} used={ki.limitedUse.numberUsed} />}
            <Box sx={styling}>
                {props.spellSlots.map((spellSlot, index) => {
                    return (
                        <Slots
                            title={`Level ${spellSlot.level}`}
                            max={spellSlot.max} used={spellSlot.used}
                            description=''
                            highlight={!props.isUnconscious}
                            key={`spellSlot${index}`}
                        />
                    )
                })}
            </Box>
            <Box sx={styling}>
                {limitedUseActions.map((limitedUseAction, index) => {
                    return (
                        <Slots
                            title={`${limitedUseAction.name}`}
                            max={limitedUseAction.limitedUse.maxUses}
                            used={limitedUseAction.limitedUse.numberUsed}
                            description={limitedUseAction.snippet}
                            highlight={!props.isUnconscious}
                            key={`limitedUseAction${index}`}
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

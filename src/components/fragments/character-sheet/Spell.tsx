import React from "react";

import { SpellType } from '../../../lib/CharacterSheetProcessor';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

export default function Spell({ spell }: SpellProps) {
    return (
        <>
            <ListItem key={`spell-${spell.name}`}>
                <ListItemAvatar>
                    <Avatar>
                        <AcUnitIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={spell.name} secondary={spell.school} />
            </ListItem>
            <Typography sx={{ paddingLeft: '72px', paddingRight: '20px', width: '100%' }} dangerouslySetInnerHTML={{ __html: spell.description }} />
            <Divider variant="inset" component="li" />
        </>
    )
}

interface SpellProps {
    spell: SpellType
}

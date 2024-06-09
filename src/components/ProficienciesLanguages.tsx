import React from "react";
import List from "@mui/material/List";

import { ProficiencyView } from "../lib/CharacterSheetProcessor";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

export function ProficienciesLanguages({ proficiencyView }: ProficienciesLanguagesProps) {
    return (
        <Grid item sm={6}>

            <Paper variant="outlined" sx={{ textAlign: 'center' }}>
                <Typography variant='overline' >Proficiencies & Languages</Typography>
                <Divider />
                <List>
                    {proficiencyView.map(view => {
                        return (
                            <>
                                <ListItem>
                                    <ListItemText primary={view.type.toLocaleUpperCase()} secondary={view.value} />
                                </ListItem>
                                <Divider component="li" />
                            </>
                        )
                    })}
                </List>
            </Paper>
        </Grid>
    )
}

interface ProficienciesLanguagesProps {
    proficiencyView: ProficiencyView[]
}

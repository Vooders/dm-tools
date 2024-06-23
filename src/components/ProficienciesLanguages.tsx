import React from "react";
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { ProficiencyView } from "../dm-tools-data.types";

export function ProficienciesLanguages({ proficiencyView }: ProficienciesLanguagesProps) {
    return (
        <Grid item sm={6}>
            <Paper variant="outlined" sx={{ textAlign: 'center' }}>
                <Typography variant='overline' >Proficiencies & Languages</Typography>
                <Divider />
                <List>
                    {proficiencyView.map(view => {
                        return (
                            <React.Fragment key={view.name}>
                                <ListItem>
                                    <ListItemText primary={view.name.toLocaleUpperCase()} secondary={view.value.join(' | ')} />
                                </ListItem>
                                <Divider component="li" />
                            </React.Fragment>
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

import { Badge, Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { minWidth } from "@mui/system";
import React from "react";
import { Skill } from "../../../lib/CharacterSheetProcessor";

export default function Skills({ skills }: SkillsProds) {
    return (
        <Grid item sm={12} md={6}>
            <Paper variant="outlined" sx={{ textAlign: 'center' }}>
                <Typography variant='overline' >Skills</Typography>
                <Divider />

                <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
                    {skills.map(skill => {
                        return (
                            <ListItem sx={{paddingBottom: '0'}}
                                secondaryAction={
                                    <Paper
                                        sx={{
                                            
                                            minHeight: '35px',
                                            minWidth: '35px',
                                            textAlign: 'center'
                                        }}
                                        square>
                                        <Typography variant='h6'>
                                            {skill.bonus >= 0 ? `+${skill.bonus}` : skill.bonus}
                                        </Typography>
                                    </Paper>
                                }>
                                <ListItemIcon>
                                <Typography variant='overline' >
                                    {skill.mod}
                                </Typography>
                                </ListItemIcon>
                                <ListItemText>
                                    <Badge variant="dot" color={skill.expertise ? "secondary" : "success"} invisible={!skill.proficient}>
                                        {/* <Typography variant='overline'> */}
                                        {skill.name}
                                        {/* </Typography> */}
                                    </Badge>
                                    <Divider />
                                </ListItemText>
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        </Grid>
    )
}

interface SkillsProds {
    skills: Skill[]
}

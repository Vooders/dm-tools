import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { PassiveSkill } from "../dm-tools-data.types";



export default function PassiveSkills({passiveSkills}: PassiveSkillsProps) {
    return (
        <Grid item sm={6}>
            <Box sx={{ flexGrow: 1 }}>
                <Paper variant="outlined" sx={{ textAlign: 'center' }}>
                    <Typography variant='overline' >senses (passive)</Typography>
                    <Divider />
                    <Grid container spacing={2} justifyContent={'space-evenly'}>
                        {passiveSkills.map(passiveSkill => {
                            return (
                                <Grid item sx={{ textAlign: 'center' }} key={passiveSkill.name}>
                                    <Tooltip title={passiveSkill.mod}>
                                        <Typography variant='overline'>{passiveSkill.name}</Typography>
                                    </Tooltip>
                                    <Typography variant='h5'>{passiveSkill.score}</Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Paper>
            </Box>
        </Grid>
    )
}

interface PassiveSkillsProps {
    passiveSkills: PassiveSkill[]
}

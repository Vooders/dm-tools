import React from 'react'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"

const style = {
    box: {
        display: 'flex',
        flexDirection: 'row',
        m: 1
    },
    select: {
        width: '40px'
    }
}

export default function GenderSelector(props: GenderSelectorProps) {
    const handleChange = (event: any) => {
        props.setGender(event.target.value)
    }

    return (
        <Grid item xs={12} sm={6} md={3} >
            <FormControl fullWidth>
                <Box sx={style.box}>
                    <InputLabel id="gender-select-label" shrink={true}>Gender</InputLabel>
                    <TextField value={props.gender} onChange={handleChange}></TextField>
                    <Select
                        sx={style.select}
                        labelId="gender-select-label"
                        id="gender-select"
                        value=''
                        onChange={handleChange}
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                </Box>
            </FormControl>
        </Grid>
    )
}

interface GenderSelectorProps {
    gender: string
    setGender: (gender: string) => void
}

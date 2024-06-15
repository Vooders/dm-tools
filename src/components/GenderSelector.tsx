import React from 'react'

import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

const style = {
    textInput: {
        width: 0.3
    },
}

export default function GenderSelector(props: GenderSelectorProps) {
    const handleChange = (event: any) => {
        props.setGender(event.target.value)
    }

    return (
        <Box sx={style.textInput}>
            <FormControl fullWidth>
                <InputLabel id="gender-select-label" shrink={true}>Gender</InputLabel>
                <TextField value={props.gender} onChange={handleChange}></TextField>
                <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value=''
                    onChange={handleChange}
                >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

interface GenderSelectorProps {
    gender: string
    setGender: (gender: string) => void
}

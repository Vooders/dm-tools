import React from 'react';
import Title from '../Title';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Characters() {
    return (
        <React.Fragment>
            <Title>Characters</Title>
            <TextField
                id="standard-helperText"
                label="DNDBeyond ID"
                helperText="The numbers at the end of your dndbeyond link"
                variant="standard"
                type='number'
            />
            <Button variant="contained">Import</Button>
        </React.Fragment>
    )
}
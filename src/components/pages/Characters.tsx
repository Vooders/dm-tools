import React, { useState } from 'react';
import Title from '../Title';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ImportResponse } from '../../handlers/importCharacter';
import Grid from '@mui/material/Unstable_Grid2';

export default function Characters() {
    const [characterId, setCharacterId] = useState(null)
    const [importResponse, setImportResponse] = useState<ImportResponse>({ status: '', value: {} })

    const importChar = async (): Promise<void> => {
        console.log(`Characters: getting ${characterId}`)
        const response = await window.electron.importCharacter(characterId) as ImportResponse
        setImportResponse(response)
    }

    const reset = () => {
        setImportResponse({ status: '', value: {} })
    }

    const importHelperTest = "The numbers at the end of your dndbeyond link"

    return (
        <React.Fragment>
            <Title>Characters</Title>
            <Typography variant="h5" gutterBottom>
                Import
            </Typography>
            {importResponse.status === 'success' ?
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Typography variant="body1">
                            Do you want import the following character?
                        </Typography>
                        <Typography variant="h5">
                            {importResponse.value.data.name}
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <Button variant="contained" color="success" size='medium'>
                            Save
                        </Button>
                        <Button variant="outlined" color="error" size='medium' onClick={reset}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                :
                <>
                    <TextField
                        error={importResponse.status === 'error' ? true : false}
                        id="standard-helperText"
                        label="DNDBeyond ID"
                        helperText={importResponse.status === 'error' ? importResponse.value : importHelperTest}
                        variant="standard"
                        type='number'
                        onChange={(e) => setCharacterId(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={importChar}>
                        Look up
                    </Button>
                </>
            }
        </React.Fragment>
    )
}

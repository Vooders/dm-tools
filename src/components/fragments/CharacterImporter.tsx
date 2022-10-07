import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Unstable_Grid2';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { ImportResponse } from '../../handlers/importCharacter';
import Title from '../Title';

export default function CharacterImporter() {
    const [characterId, setCharacterId] = useState(null)
    const [characterName, setCharacterName] = useState('')
    const [saveResponse, setSaveResponse] = useState('')
    const [open, setOpen] = React.useState(false);
    const [importResponse, setImportResponse] = useState<ImportResponse>({ status: '', value: {} })

    const importChar = async (): Promise<void> => {
        console.log(`Characters: getting ${characterId}`)
        const response = await window.electron.importCharacter(characterId) as ImportResponse
        setImportResponse(response)
        if (response.status === 'success') {
            setCharacterName(response.value.data.name)
        }
    }

    const saveChar = async (): Promise<void> => {
        const response = await window.electron.saveCharacter(importResponse.value)
        setSaveResponse(response)
        setOpen(true)
    }

    const reset = () => {
        setImportResponse({ status: '', value: {} })
        setCharacterId(null)
        setCharacterName('')
        setSaveResponse('')
    }

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        reset()
    };

    const importHelperTest = "The numbers at the end of your dndbeyond link"

    return (
        <React.Fragment>
            <Title>Import</Title>
            {importResponse.status === 'success' ?
                <Grid container spacing={2}>
                    <Grid xs={12}>
                        <Typography variant="body1">
                            Do you want import the following character?
                        </Typography>
                        <Typography variant="h5">
                            {characterName}
                        </Typography>
                    </Grid>
                    <Grid xs={12} md={4}>
                        <Button variant="contained" color="success" size='medium' onClick={saveChar}>
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
                        disabled={characterId < 1}
                        variant="contained"
                        onClick={importChar}>
                        Look up
                    </Button>
                </>
            }
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={saveResponse ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {saveResponse ? `${characterName} saved` : 'There was a problem saving'}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

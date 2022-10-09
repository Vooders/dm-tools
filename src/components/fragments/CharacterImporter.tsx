import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Unstable_Grid2';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ImportResponse } from '../../handlers/importCharacter';
import Title from '../Title';

export default function CharacterImporter() {
    const [characterId, setCharacterId] = useState(null)
    const [characterName, setCharacterName] = useState('')
    const [saveResponse, setSaveResponse] = useState('')
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [importResponse, setImportResponse] = useState<ImportResponse>({ status: '', value: {} })
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const importChar = async (): Promise<void> => {
        console.log(`Characters: getting ${characterId}`)
        const response = await window.electron.importCharacter(characterId) as ImportResponse
        setImportResponse(response)
        if (response.status === 'success') {
            setCharacterName(response.value.data.name)
            setOpenDialog(true)
        }
    }

    const saveChar = async (): Promise<void> => {
        const response = await window.electron.saveCharacter(importResponse.value)
        setSaveResponse(response)
        setOpenSnackBar(true)
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

    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
        reset()
    };

    const importHelperTest = "The numbers at the end of your dndbeyond link"

    return (
        <React.Fragment>
            <Title>Import</Title>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want import the following character?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {characterName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={reset}>no</Button>
                    <Button onClick={saveChar} autoFocus>
                        yes
                    </Button>
                </DialogActions>
            </Dialog>

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


            <Snackbar open={openSnackBar} autoHideDuration={4000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity={saveResponse ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {saveResponse ? `${characterName} saved` : 'There was a problem saving'}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

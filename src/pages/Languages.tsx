import React, { useState, useEffect, useRef } from 'react';

import Title from '../components/Title';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LanguagesData } from '../handlers/getLanguages';

export default function Languages() {
    const pageRendered = useRef(false)
    const [languages, setLanguages] = useState<LanguagesData>({
        allLanguages: [],
        characters: []
    })

    useEffect(() => {
        if (!pageRendered.current) {
            (async () => {
                console.log('Initial load of languages')
                setLanguages(await window.electron.getLanguages())
            })()
        }
        pageRendered.current = true
    })

    window.electron.characterUpdated(async () => {
        console.log('Characters updated: reloading languages')
        await setLanguages(await window.electron.getLanguages())
    })

    return (
        <React.Fragment>
            <Title>Languages</Title>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Language</TableCell>
                            <TableCell>Characters</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {languages.allLanguages.map((language) => {
                            return (
                                <TableRow key={language}>
                                    <TableCell>{language}</TableCell>
                                    <TableCell>
                                        {languages.characters.map(character => {
                                            return character.languages.includes(language) ? character.name + ', ' : ''
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

import React, { useState, useEffect } from 'react';

import Title from '../components/Title';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SensesData } from '../handlers/getSenses';

import * as characterRepository from '../repositories/characterRepository'

export default function Senses() {
    const [senses, setSenses] = useState<SensesData[]>([])

    useEffect(() => {
        (async () => {
            console.log('[page][Senses] Initial load of senses data')
            setSenses(await window.electron.invoke('senses:get'))
        })()

        const removeListener = characterRepository.onUpdate(async () => {
            console.log('[page][Senses]Characters updated: reloading senses data')
            setSenses(await window.electron.invoke('senses:get'))
        })

        return () => {
            if(removeListener) removeListener()
        }
    }, [])

    return (
        <React.Fragment>
            <Title>Senses (Passive)</Title>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>PERCEPTION</TableCell>
                            <TableCell>INVESTIGATION</TableCell>
                            <TableCell>INSIGHT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {senses.map(character => {
                            return (
                                <TableRow key={`${character.name}`}>
                                    <TableCell>{character.name}</TableCell>
                                    {character.senses.map(sense => {
                                        return (
                                            <TableCell key={`${character.name}-${sense.name}`}>
                                                {sense.score}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

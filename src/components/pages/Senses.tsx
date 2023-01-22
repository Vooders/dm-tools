import React, { useState, useEffect } from 'react';

import Title from '../Title';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SensesData } from '../../handlers/getSenses';

export default function Senses() {
    const [senses, setSenses] = useState<SensesData[]>([])

    const getSenses = async () => {
        console.log('getting Senses')
        const inv = await window.electron.getSenses()
        setSenses(inv)
    }

    useEffect(() => {
        getSenses()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            await getSenses()
        })
    }, [])

    return (
        <React.Fragment>
            <Title>Senses (Passive)</Title>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableCell>Name</TableCell>
                        <TableCell>PERCEPTION</TableCell>
                        <TableCell>INVESTIGATION</TableCell>
                        <TableCell>INSIGHT</TableCell>
                    </TableHead>
                    <TableBody>
                        { senses.map(character => {
                            return (
                                <TableRow>
                                    <TableCell>{ character.name }</TableCell>
                                    { character.senses.map(sense => {
                                        return (
                                            <TableCell>{ sense.score }</TableCell>
                                        )
                                    }) }
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

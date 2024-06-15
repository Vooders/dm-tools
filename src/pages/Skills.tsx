import React, { useState, useEffect, useRef } from 'react'
import Title from '../components/Title'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

export default function Skills() {
    const pageRendered = useRef(false)
    const [skills, setSkills] = useState<any[]>([[], []])

    useEffect(() => {
        if (!pageRendered.current) {
            (async () => {
                console.log('Initial load of skills data')
                setSkills(await window.electron.getSkills())
            })()
        }
        pageRendered.current = true
    })

    window.electron.characterUpdated(async () => {
        console.log('Characters updated: reloading skills data')
        setSkills(await window.electron.getSkills())
    })

    return (
        <React.Fragment>
            <Title>Skills</Title>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {skills[0].map((name: string) => (
                                <TableCell key={name}>
                                    {name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skills[1].map((skill: any[], index: number) => {
                            return (
                                <TableRow key={index}>
                                    {skill.map((bonus: any, index: number) => (
                                        <TableCell key={`${index}-${bonus}`}> {bonus} </TableCell>
                                    ))}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

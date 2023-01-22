import React, { useState, useEffect } from 'react'
import Title from '../Title'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

export default function Skills() {
    const [gotSkills, setGotSkills] = useState(false)
    const [skills, setSkills] = useState<any[]>([[], []])

    useEffect(() => {
        const getSkills = async () => {
            console.log('getting Skills')
            const inv = await window.electron.getSkills()
            setSkills(inv)
        }

        if (!gotSkills) {
            getSkills()
                .catch(console.error)
            setGotSkills(true)
        }
    })

    return (
        <React.Fragment>
            <Title>Skills</Title>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {skills[0].map((name: string) => (
                                <TableCell>
                                    {name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skills[1].map((skill: any[]) => {
                            return (
                                <TableRow>
                                    {skill.map((bonus: any) => (
                                        <TableCell> {bonus} </TableCell>
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

import React, { useState, useEffect } from 'react'
import Title from '../components/Title'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

export default function Skills() {
    const [skills, setSkills] = useState<any[]>([[], []])

    const getSkills = async () => {
        console.log('getting Skills')
        const inv = await window.electron.getSkills()
        setSkills(inv)
    }

    useEffect(() => {
        getSkills()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            await getSkills()
        })
    }, [])

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

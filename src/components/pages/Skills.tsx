import React, { useState, useEffect } from 'react'
import { SkillsData } from '../../handlers/getSkills'
import Title from '../Title'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Skills() {
    const [gotSkills, setGotSkills] = useState(false)
    const [skills, setSkills] = useState<any[]>([])

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
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        {skills.map((skill) => {
                            return (
                                <TableRow>
                                    {skill.map((bonus: any) => {
                                        return <TableCell> {bonus} </TableCell>
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

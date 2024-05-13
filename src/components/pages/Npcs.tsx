import React, { useEffect, useState } from "react"
import { Npc } from '../../lib/saveNpc'
import NpcComponent from "../fragments/Npc";
import Title from "../Title";

export default function Npcs() {
    const [npcs, setNpcs] = useState<Npc[]>([])

    const setNpcData = async () => {
        console.log('getting Npcs')
        setNpcs(await window.electron.getNpcs())
    }

    useEffect(() => {
        setNpcData()
            .catch(console.error)

        window.electron.npcUpdated(async () => {
            console.log('npc updated')
            await setNpcData()
        })
    }, [])

    return (
        <React.Fragment>
            <Title>Npcs</Title>
            {npcs.map(npc => {
                return (
                    <NpcComponent
                        name={npc.name}
                        race={npc.race}
                        gender={npc.gender}
                        notes={npc.notes}
                        id={npc.id}
                    />
                )
            })}
        </React.Fragment>
    )
}

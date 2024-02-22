import React, { useEffect, useState } from 'react'
import { Metrics } from '../../lib/saveMetrics'
import Graph from '../fragments/Graph'

export default function Metrics() {
    const [metrics, setMetrics] = useState<any>({
        xAxis: {
            data: []
        },
        xp: {
            series: []
        },
        hp: {
            series: []
        },
        gold: {
            series: []
        }
    })

    const getMetrics = async () => {
        console.log('getting Metrics')
        setMetrics(await window.electron.getMetrics())
    }

    useEffect(() => {
        getMetrics()
            .catch(console.error)

        window.electron.characterUpdated(async () => {
            await getMetrics()
        })
    }, [])

    return (
        <>
            <Graph
                title='HP'
                series={metrics.hp.series}
                xAxis={metrics.xAxis.data}
            />
            <Graph
                title='Gold'
                series={metrics.gold.series}
                xAxis={metrics.xAxis.data}
            />
            <Graph
                title='XP'
                series={metrics.xp.series}
                xAxis={metrics.xAxis.data}
            />
        </>
    )
}

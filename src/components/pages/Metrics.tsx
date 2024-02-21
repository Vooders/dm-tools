import React, { useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import { Metrics } from '../../lib/saveMetrics'
import { Typography } from '@mui/material'

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

    const style = {
        graph: {
            width: '100%',
            height: '400px'
        }
    }

    return (
        <>
            <Typography variant='h1'>HP</Typography>
            <LineChart
                xAxis={[{
                    id: 'Years',
                    data: metrics.xAxis.data.map((d: string) => new Date(d)),
                    scaleType: 'time',
                    valueFormatter: (date: any) => date.toTimeString()
                }]}
                series={metrics.hp.series.map((bob: any) => {
                    return {
                        label: bob.label,
                        data: bob.data,
                        showMark: false,
                        valueFormatter: (value: any) => (value == null ? 'NaN' : value.toString())
                    }
                })}
                width={1000}
                height={400}
                margin={{ left: 70 }}
            />

            <Typography variant='h1'>XP</Typography>
            <LineChart
                xAxis={[{
                    id: 'Years',
                    data: metrics.xAxis.data.map((d: string) => new Date(d)),
                    scaleType: 'time',
                    valueFormatter: (date: any) => date.toTimeString()
                }]}
                series={metrics.xp.series.map((bob: any) => {
                    return {
                        label: bob.label,
                        data: bob.data,
                        showMark: false,
                        valueFormatter: (value: any) => (value == null ? 'NaN' : value.toString())
                    }
                })}
                width={1000}
                height={400}
                margin={{ left: 70 }}
            />
        </>
    )
}

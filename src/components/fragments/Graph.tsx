import React from 'react'
import { Metric } from "../../lib/saveMetrics"
import { Card, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'

export default function Graph(props: GraphProps) {
    return (
        <Card>
            <Typography variant='h1'>{ props.title }</Typography>
            <LineChart
                xAxis={[{
                    id: 'Years',
                    data: props.xAxis,
                    scaleType: 'time',
                    valueFormatter: (date: any) => date.toTimeString()
                }]}
                series={props.series.map((character: any) => {
                    return {
                        label: character.label,
                        data: character.data,
                        showMark: false,
                        valueFormatter: (value: any) => (value == null ? 'NaN' : value.toString())
                    }
                })}
                width={1000}
                height={400}
                margin={{ left: 70 }}
            />
        </Card>
    )
}

interface GraphProps {
    xAxis: Date[]
    series: Metric[]
    title: string
}

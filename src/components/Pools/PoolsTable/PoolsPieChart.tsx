/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'

interface PoolsPieChartProps {
  data: {
    name: string
    weight: number
  }[]
}

const colors = ['#fe6e9a', '#fe8464']

export function PoolsPieChart({ data }: PoolsPieChartProps) {
  return (
    <PieChart width={48} height={48}>
      <Pie data={data} cx={20} cy={20} labelLine outerRadius={20} fill='#8884d8' dataKey='weight'>
        {data.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  )
}

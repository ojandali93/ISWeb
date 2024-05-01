import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Rectangle,
  ResponsiveContainer
} from "recharts";

const ChartComponent = (records: any, fields: any) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1 style={{marginBottom: '24px'}}>Status</h1>
            <LineChart
              width={window.innerWidth * .6}
              height={((2/3) * (window.innerWidth * .25))}
              data={records}
              margin={{
                top: 5,
                right: 150,
                left: 100,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                strokeWidth={2}
                type="monotone"
                dataKey="Pending Approval"
                stroke="orange"
                label="Pending Approval"
                activeDot={{ r: 8 }}
              />
              <Line
                strokeWidth={2}
                type="monotone"
                dataKey="Total Approved"
                stroke="blue"
                label="Total Approved"
                activeDot={{ r: 8 }}
              />
              <Line
                strokeWidth={2}
                type="monotone"
                dataKey="Private Pay"
                stroke="pink"
                label="Private Pay"
                activeDot={{ r: 8 }}
              />
              <Line
                strokeWidth={2}
                type="monotone"
                dataKey="Denied"
                stroke="red"
                label="Denied"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
  )
}

export default ChartComponent

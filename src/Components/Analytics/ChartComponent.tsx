import React, { useEffect } from 'react'
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

interface ChartProps {
  records: any
}

const ChartComponent:React.FC<ChartProps> = ({records}) => {

  return (
    <div>
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
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{marginBottom: '24px'}}>Approved Status</h1>
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
            dataKey="Approved"
            stroke="green"
            label="Approved"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="Approved No RTC"
            stroke="blue"
            label="Approved No RTC"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="Approved LB No RTC"
            stroke="purple"
            label="Approved LB No RTC"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="Approved DB"
            stroke="brown"
            label="Approved DB"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{marginBottom: '24px'}}>Approved Status</h1>
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
            dataKey="Approved"
            stroke="green"
            label="Approved"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="Approved No RTC"
            stroke="blue"
            label="Approved No RTC"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="Approved LB No RTC"
            stroke="purple"
            label="Approved LB No RTC"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="Approved DB"
            stroke="brown"
            label="Approved DB"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{marginBottom: '24px'}}>Checked In</h1>
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
            dataKey="Arrived"
            stroke="green"
            label="Arrived"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="Pending Arrival"
            stroke="purple"
            label="Arrived"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="MIA"
            stroke="red"
            label="MIA"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="BD"
            stroke="blue"
            label="BD"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{marginBottom: '24px'}}>Checked In</h1>
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
            dataKey="Arrived"
            stroke="green"
            label="Arrived"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="Pending Arrival"
            stroke="purple"
            label="Arrived"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="MIA"
            stroke="red"
            label="MIA"
            activeDot={{ r: 8 }}
          />
          <Line
            strokeWidth={2}
            type="monotone"
            dataKey="BD"
            stroke="blue"
            label="BD"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 style={{marginBottom: '24px'}}>Census</h1>
          <BarChart
            width={window.innerWidth * .48}
            height={((2/3) * (window.innerWidth * .25))}
            data={records}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="facility" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="New Admits" fill="green"/>
            <Bar dataKey="RTC" fill="blue"/>
            <Bar dataKey="Detox" fill="teal"/>
            <Bar dataKey="PHP" fill="orange"/>
            <Bar dataKey="IOP" fill="violet"/>
            <Bar dataKey="Private Pay" fill="red"/>
            <Bar dataKey="Scholarshiped" fill="brown"/>
            <Bar dataKey="Total Patients" fill="grey"/>
          </BarChart>
      </div>
    </div>
  )
}

export default ChartComponent

import React, { useEffect, useState } from 'react'
import LayoutComponent from '../BaseScreen'
import { useIntake } from '../../Context/IntakeContext'
import { useData } from '../../Context/DataContext'
import ChartComponent from '../../Components/Analytics/ChartComponent';
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
import axios from 'axios';
import { ChevronsDown, ChevronsUp } from 'react-feather';
import DisplayAccordianHeader from '../../Components/SortAndFilter/DisplayAccordianHeader';

const BillingAnalyticsScreen = () => {

  const {billingAnalytics} = useData()

  const [showTotalPaid, setShowTotalPaid] = useState<boolean>(false)

  return (
    <LayoutComponent
      header={null} // Render your custom header component here
      content={
        <div>
          <DisplayAccordianHeader label={'Total Paid By Day'} display={showTotalPaid} onChange={() => {setShowTotalPaid(!showTotalPaid)}}/>
          {
            showTotalPaid
              ? <div style={{marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h1 className='text-3xl text-white font-bold mt-8 mb-3'>Total Paid By Day</h1>
                  <LineChart
                    width={window.innerWidth * .75}
                    height={((2/3) * (window.innerWidth * .25))}
                    data={billingAnalytics === null ? [] : billingAnalytics.reverse()}
                    margin={{
                      top: 5,
                      right: 150,
                      left: 100,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="white" />
                    <XAxis dataKey="start_date"  tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="total_paid"
                      stroke="#fcba03"
                      label="Pending Approval"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </div>
              : null
          }
        </div>
      } // Render your custom content component here
    />
  )
}

export default BillingAnalyticsScreen

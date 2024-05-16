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
import BillingDetailsFilterComponent from '../../Components/SortAndFilter/BillingDetailsFilterComponent';

const BillingAnalyticsScreen = () => {

  const {billingAnalytics} = useData()

  const [showTotalPaid, setShowTotalPaid] = useState<boolean>(false)
  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 100]); // Default domain for Y-axis

  useEffect(() => {
    let maxValue: number = 0
    if (billingAnalytics != null) {
      billingAnalytics.map(entry => {
        let totalPaid: number = parseInt(entry.total_paid)
        if(totalPaid > maxValue){
          maxValue = totalPaid
        }
      })
      setYAxisDomain([0, maxValue]); 
    }
  }, [billingAnalytics]);

  return (
    <LayoutComponent
      header={null} 
      content={
        <div>
          <DisplayAccordianHeader label={'Total Paid By Day'} display={showTotalPaid} onChange={() => {setShowTotalPaid(!showTotalPaid)}}/>
          {
            showTotalPaid
            ? <>
                <BillingDetailsFilterComponent />
                <div style={{marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h1 className='text-3xl text-white font-bold mt-8 mb-3'>Total Paid By Day</h1>
                  {showTotalPaid && billingAnalytics && (
                    <LineChart
                      width={window.innerWidth * .75}
                      height={((2 / 3) * (window.innerWidth * .35))}
                      data={billingAnalytics.slice()} // Ensure to create a copy before reversing the array
                      margin={{ top: 5, right: 150, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="white" />
                      <XAxis dataKey="start_date" tick={{ fill: 'white' }} />
                      <YAxis domain={yAxisDomain} tick={{ fill: 'white' }} />
                      <Tooltip />
                      <Legend />
                      <Line
                        strokeWidth={2}
                        type="monotone"
                        dataKey="total_paid"
                        stroke="#fcba03"
                        label="Total Paid"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  )}
                </div>
              </>
            
              : null
          }
        </div>
      } // Render your custom content component here
    />
  )
}

export default BillingAnalyticsScreen

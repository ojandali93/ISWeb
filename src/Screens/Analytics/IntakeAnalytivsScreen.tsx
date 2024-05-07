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

interface IntakeProps {
  active: boolean;
  booked: string;
  checked_in: string;
  coordinator: string;
  created_date: string;
  date: string;
  date_of_birth: string;
  in_network_oop: number;
  inn_deductable: number;
  insurance: string;
  name: string;
  onn_deducatible: number;
  out_network_oop: number;
  payer_id: string;
  policy_id: string;
  prefix: string;
  source: string;
  summary_out: string;
}

interface AnalyticsDatum {
  clients: number;
  date: string;
  Arrived: number;
  MIA: number;
  BD: number;
  'Pending Arrival': number;
  Approved: number;
  Denied: number;
  'Private Pay': number;
  'Approved No RTC': number;
  'Approved LB No RTC': number;
  'Pending Approval': number;
  'Approved DB': number;
  'Total Approved': number;
  waiting_arrival: number;
  Booked: number;
  'Incoming Clients': number;
  arrived_approved_percent: number;
  approved_total_percent: number;
  arrived_total_percent: number;
}

const IntakeAnalytivsScreen = () => {

  const {intakeRecords} = useData()
  const {timespan} = useIntake()

  useEffect(() => {
    processIntakeInformation(intakeRecords)
    grabCensusData()
  }, [])

  const [analyticsData, setAnalyticsData] = useState<any>({})
  const [censusData, setCensusData] = useState<any>({})

  const [showStatus, setShowStatus] = useState<boolean>(false)
  const [showApproved, setShowApproved] = useState<boolean>(false)
  const [showCheckedIn, setShowCheckedIn] = useState<boolean>(false)
  const [showCensus, setShowCensus] = useState<boolean>(false)

  const grabCensusData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://intellasurebackend-docker.onrender.com/get_census_data',
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      response.data.forEach((facility: any) => {
        const totalPatients = Object.entries(facility).reduce((acc, [key, value]) => {
          if (key !== 'facility' && typeof value === 'number') {
            return acc + value;
          }
          return acc;
        }, 0);
        facility['Total Patients'] = totalPatients;
      });
      setCensusData(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const processIntakeInformation = (intakeRecords: IntakeProps[] | null) => {
    let analytics: any = {};

    const startDate = new Date();
    switch (timespan) {
      case '1 Week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '1 Month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case '3 Months':
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      case '6 Months':
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case '1 Year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default:
        break;
    }

    function convertDobDateToMMDDYYYY(dateString: string) {
      const date = new Date(dateString);
      const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
      const dd = String(date.getUTCDate() + 1).padStart(2, '0'); 
    
      return `${mm}/${dd}`;
    }

    intakeRecords?.forEach(item => {
      const { coordinator, date, booked, checked_in } = item;
      const currentDate = new Date(date);
      if (currentDate >= startDate) {
        if (!analytics[convertDobDateToMMDDYYYY(date)]) {
          analytics[convertDobDateToMMDDYYYY(date)] = {
            clients: 0,
            date: convertDobDateToMMDDYYYY(date),
            Arrived: 0,
            MIA: 0,
            BD: 0,
            'Pending Arrival': 0,
            Approved: 0,
            Denied: 0,
            'Private Pay': 0,
            'Approved No RTC': 0,
            'Approved LB No RTC': 0,
            'Pending Approval': 0,
            'Approved DB': 0,
            'Total Approved': 0,
            waiting_arrival: 0,
            'Booked': 0,
            'Incoming Clients': 0,
            'Total Calls': 0,
            arrived_approved_percent: 0,
            approved_total_percent: 0,
            arrived_total_percent: 0,
          };
        }

        analytics[convertDobDateToMMDDYYYY(date)]['Total Calls']++;

        if (booked === 'Arrived') analytics[convertDobDateToMMDDYYYY(date)].Arrived++;
        if (booked === 'MIA') analytics[convertDobDateToMMDDYYYY(date)].MIA++;
        if (booked === 'BD') analytics[convertDobDateToMMDDYYYY(date)].BD++;
        if (booked === 'Pending') analytics[convertDobDateToMMDDYYYY(date)]['Pending Arrival']++;
        
        if (checked_in === 'Pending') analytics[convertDobDateToMMDDYYYY(date)]['Pending Approval']++;
        if (checked_in === 'Approved') analytics[convertDobDateToMMDDYYYY(date)].Approved++;
        if (checked_in === 'Denied') analytics[convertDobDateToMMDDYYYY(date)].Denied++;
        if (checked_in === 'Private Pay') analytics[convertDobDateToMMDDYYYY(date)]['Private Pay']++;
        if (checked_in === 'Approved DB') analytics[convertDobDateToMMDDYYYY(date)]['Approved DB']++;
        if (checked_in === 'Approved No RTC') analytics[convertDobDateToMMDDYYYY(date)]['Approved No RTC']++;
        if (checked_in === 'Approved LB No RTC') analytics[convertDobDateToMMDDYYYY(date)]['Approved LB No RTC']++;
  
        if (checked_in === 'Approved LB No RTC' || 
            checked_in === 'Approved DB' || 
            checked_in === 'Approved No RTC' || 
            checked_in === 'Approved' ) analytics[convertDobDateToMMDDYYYY(date)]['Total Approved']++;

      }

    });
    let newData: any = []
    Object.values(analytics).map((record) => {
      newData.push(record)
    })
    setAnalyticsData(newData)
  }

  return (
    <LayoutComponent
      header={null} // Render your custom header component here
      content={
        <div>
          <DisplayAccordianHeader label={'Status'} display={showStatus} onChange={() => {setShowStatus(!showStatus)}}/>
          {
            showStatus
              ? <div style={{marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h1 className='text-3xl text-white font-bold mt-8 mb-3'>Status</h1>
                  <LineChart
                    width={window.innerWidth * .75}
                    height={((2/3) * (window.innerWidth * .25))}
                    data={analyticsData}
                    margin={{
                      top: 5,
                      right: 150,
                      left: 100,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="white" />
                    <XAxis dataKey="date"  tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Pending Approval"
                      stroke="#fcba03"
                      label="Pending Approval"
                      activeDot={{ r: 8 }}
                    />
                    {/* <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Total Calls"
                      stroke="#e94f4e"
                      label="Pending Approval"
                      activeDot={{ r: 8 }}
                    /> */}
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Total Approved"
                      stroke="#fc8003"
                      label="Total Approved"
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
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Private Pay"
                      stroke="#fcd303"
                      label="Private Pay"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </div>
              : null
          }
          <DisplayAccordianHeader label={'Status Approved'} display={showApproved} onChange={() => {setShowApproved(!showApproved)}}/>
          {
            showApproved
              ? <div style={{marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h1 className='text-3xl text-white font-bold mt-8 mb-3'>Approved Status</h1>
                  <LineChart
                    width={window.innerWidth * .75}
                    height={((2/3) * (window.innerWidth * .25))}
                    data={analyticsData}
                    margin={{
                      top: 5,
                      right: 150,
                      left: 100,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="white" />
                    <XAxis dataKey="date"  tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Approved"
                      stroke="#fcba03"
                      label="Approved"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Approved No RTC"
                      stroke="#fc8003"
                      label="Approved No RTC"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Approved LB No RTC"
                      stroke="red"
                      label="Approved LB No RTC"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Approved DB"
                      stroke="#fcd303"
                      label="Approved DB"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </div>
              : null
          }
          <DisplayAccordianHeader label={'Checked In'} display={showCheckedIn} onChange={() => {setShowCheckedIn(!showCheckedIn)}}/>
          {
            showCheckedIn
              ? <div style={{marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h1 className='text-3xl text-white font-bold mt-8 mb-3'>Checked In</h1>
                  <LineChart
                    width={window.innerWidth * .75}
                    height={((2/3) * (window.innerWidth * .25))}
                    data={analyticsData}
                    margin={{
                      top: 5,
                      right: 150,
                      left: 100,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="white" />
                    <XAxis dataKey="date"  tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Arrived"
                      stroke="#fcba03"
                      label="Arrived"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      strokeWidth={2}
                      type="monotone"
                      dataKey="Pending Arrival"
                      stroke="#fc8003"
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
                      stroke="#fcd303"
                      label="BD"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </div>
              : null
          }
          <DisplayAccordianHeader label={'Census'} display={showCensus} onChange={() => {setShowCensus(!showCensus)}}/>
          {
            showCensus
              ? <div style={{marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h1 className='text-3xl text-white font-bold mt-8 mb-3'>Census</h1>
                  <BarChart
                    width={window.innerWidth * 0.65}
                    height={((2 / 3) * (window.innerWidth * 0.25))}
                    data={censusData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="white" />
                    <XAxis dataKey="facility" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total Patients" fill="red" activeBar={<Rectangle fill="red" stroke="red" />}/>
                    <Bar dataKey="New Admits" fill="green" activeBar={<Rectangle fill="green" stroke="green" />}/>
                    <Bar dataKey="RTC" fill="blue" activeBar={<Rectangle fill="blue" stroke="blue" />}/>
                    <Bar dataKey="Detox" fill="teal" activeBar={<Rectangle fill="teal" stroke="teal" />}/>
                    <Bar dataKey="PHP" fill="orange" activeBar={<Rectangle fill="orange" stroke="orange" />}/>
                    <Bar dataKey="IOP" fill="violet" activeBar={<Rectangle fill="violet" stroke="violet" />}/>
                  </BarChart>
                </div>
              : null
          }
        </div>
      } // Render your custom content component here
    />
  )
}

export default IntakeAnalytivsScreen

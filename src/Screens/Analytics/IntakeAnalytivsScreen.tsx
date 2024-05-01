import React, { useEffect } from 'react'
import LayoutComponent from '../BaseScreen'
import { useIntake } from '../../Context/IntakeContext'
import { useData } from '../../Context/DataContext'

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

const IntakeAnalytivsScreen = () => {

  const {intakeRecords} = useData()
  const {timespan} = useIntake()

  useEffect(() => {
    processIntakeInformation(intakeRecords)
  }, [])

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
      const dd = String(date.getUTCDate()).padStart(2, '0'); 
    
      return `${mm}/${dd}`;
    }

    intakeRecords?.forEach(item => {
      const { coordinator, date, booked, checked_in } = item;
      const currentDate = new Date(date);
      if (currentDate >= startDate) {
        if (!analytics[convertDobDateToMMDDYYYY(date)]) {
          analytics[convertDobDateToMMDDYYYY(date)] = {
            clients: 0,
            date: date,
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
            arrived_approved_percent: 0,
            approved_total_percent: 0,
            arrived_total_percent: 0,
          };
        }
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
    console.log('data: ', analytics)
  };

  

  return (
    <LayoutComponent
      header={null} // Render your custom header component here
      content={<div>extername</div>} // Render your custom content component here
    />
  )
}

export default IntakeAnalytivsScreen

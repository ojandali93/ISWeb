import React, { useEffect, useState } from 'react'
import SelectOptionComponent from './SelectOptionComponent';
import CalendarSelectComponent from '../Inputs/CalendarSelectComponent';
import SelectPeopleComponent from './SelectPeopleComponent';
import { useData } from '../../Context/DataContext';
import axios from 'axios';

interface PeopleOptions {
  name: string;
  userId: string;
}

interface ColumnData {
  label: string;
  type: string;
  recordName: string;
  options?: string[];
  dependent?: string;
  dependentResults?: string[];
  people?: PeopleOptions[];
}

interface RecordData {
  [key: string]: any;
}

interface CellProps {
  columns: ColumnData[],
  record: RecordData
}

const CellComponent: React.FC<CellProps> = ({columns, record}) => {

  const {intakeUsers, getIntakeRecords} = useData()

  const [selectedDate, setSelectedDate] = useState(record.expected_arrival_date ? record.expected_arrival_date : new Date())

  useEffect(() => {
    // Check if the expected_arrival_date is not null
    if (record.expected_arrival_date) {
      // Parse the date string from the item prop
      const parsedDate = new Date(record.expected_arrival_date);
      // Set the parsed date as the selected date
      setSelectedDate(parsedDate);
    } else {
      // If the expected_arrival_date is null, set the current date as the selected date
      setSelectedDate(new Date());
    }
  }, [record.expected_arrival_date]);

  function convertDateToMMDDYYYY(dateString: string) {
    const date = new Date(dateString);
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); // UTC months from 1-12
    const dd = String(date.getUTCDate()).padStart(2, '0'); // UTC day of the month
    const yyyy = date.getUTCFullYear(); // UTC full year
  
    return `${mm}/${dd}/${yyyy}`;
  }

  const formatDollarAmount = (str: string) => {
    const num = parseFloat(str);
    return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const handleDateSelectedChange = (date: Date) => {
    setSelectedDate(date)
  }

  function convertDateToCustomFormat(dateStr: string) {
    const date = new Date(dateStr);
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); // UTC months from 1-12
    const dd = String(date.getUTCDate()).padStart(2, '0'); // UTC day of the month
    const yyyy = date.getUTCFullYear(); // UTC full year

    return `${yyyy}-${mm}-${dd}`;
  }
  
  const handleStatusChange = (value: any, record: any) => {
    const data = { data: {
      "checked_in": value,
      "booked": record.booked,
      "coordinator": record.coordinator,
      "summary_out": record.summary_out,
      "reason": record.reason,
      "expected_arrival_date": convertDateToCustomFormat(record.expected_arrival_date)
    }}
    submitUpdate(data)
  }

  const handleBookedChange = (value: any, record: any) => {
    const data = { data: {
      "checked_in": record.checked_in,
      "booked": value,
      "coordinator": record.coordinator,
      "summary_out": record.summary_out,
      "reason": record.reason,
      "expected_arrival_date": convertDateToCustomFormat(record.expected_arrival_date)
    }}
    submitUpdate(data)
  }

  const handleReasonChange = (value: any, record: any) => {
    const data = { data: {
      "checked_in": record.checked_in,
      "booked": record.booked,
      "coordinator": record.coordinator,
      "summary_out": record.summary_out,
      "reason": value,
      "expected_arrival_date": convertDateToCustomFormat(record.expected_arrival_date)
    }}
    submitUpdate(data)
  }

  const handleArrivalDateChange = (value: any, record: any) => {
    const data = { data: {
      "checked_in": record.checked_in,
      "booked": record.booked,
      "coordinator": record.coordinator,
      "summary_out": record.summary_out,
      "reason": record.reason,
      "expected_arrival_date": convertDateToCustomFormat(value)
    }}
    submitUpdate(data)
  }

  const handleCoordinatorChange = (value: any, record: any) => {
    const data = { data: {
      "checked_in": record.checked_in,
      "booked": record.booked,
      "coordinator": value,
      "summary_out": record.summary_out,
      "reason": record.reason,
      "expected_arrival_date": convertDateToCustomFormat(record.expected_arrival_date)
    }}
    submitUpdate(data)
  }

  const submitUpdate = (data: any) => {
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://intellasurebackend-docker.onrender.com/intake/${record.intake_id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };
    axios.request(config)
      .then((response) => {
        getIntakeRecords()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSelectChange = (columnName: string, record: any, value: string | Date | null) => {
    console.log('column name: ', columnName)
    if(columnName === 'Status'){
      console.log('updated checked in: ', value)
      handleStatusChange(value, record)
    }
    if(columnName === 'Booked'){
      console.log('updated booked: ', value)
      handleBookedChange(value, record)
    }
    if(columnName === 'Reason'){
      console.log('updated reason: ', value)
      handleReasonChange(value, record)
    }
    if(columnName === 'Arriving Date'){
      console.log('updated reason: ', value)
      handleArrivalDateChange(value, record)
    }
    if(columnName === 'Coordinator'){
      console.log('updated coordinator: ', value)
      handleCoordinatorChange(value, record)
    }
  }

  return (
    <>
      {columns.map((column, columnIndex) => {
        const cellValue = column.recordName ? record[column.recordName] : '';
        return (
          <td key={columnIndex}>
            {column.type === 'select' && column.options ? (
              column.type === 'select' && column.dependent && column.dependentResults ? (
                column.dependentResults.includes(record[column.dependent]) ? (
                  <SelectOptionComponent
                    options={column.options}
                    value={cellValue}
                    onChange={(newValue) => {
                      handleSelectChange(column.label, record, newValue)
                      console.log('updated select option: ', newValue);
                    }}
                  />
                ) : (
                  null
                )
              ) : (
                <SelectOptionComponent
                  options={column.options}
                  value={cellValue}
                  onChange={(newValue) => {
                    handleSelectChange(column.label, record, newValue)
                    console.log('updated select option: ', newValue);
                  }}
                />
              )
            ) : column.type === 'boolean' ? (
              record[column.recordName] === true ? 'Yes' : record[column.recordName] === null ? 'Unknown' : 'No'
            ) : column.type === 'date' ? (
              <>{convertDateToMMDDYYYY(record[column.recordName])}</>
            ) : column.type === 'select_date' ? (
              column.type === 'select_date' && column.dependent && column.dependentResults ? (
                column.dependentResults.includes(record[column.dependent]) ? (
                  <CalendarSelectComponent selectedDate={selectedDate} handleDateChange={(newValue) => {
                    handleDateSelectedChange(newValue)
                    handleSelectChange(column.label, record, newValue)
                    console.log('updated select option: ', newValue);
                  }}/>
                ) : (
                  null
                )
              ) : ( null )
            ) : column.type === 'dollar' ? (
              record[column.recordName] ? formatDollarAmount(record[column.recordName]) : ''
            ) : column.type === 'form' ? (
              <button className={`py-1 px-3 rounded-lg bg-sky-700 hover:bg-sky-900`}>View</button>
            ) : column.type === 'people' ? (
              <SelectPeopleComponent
                options={intakeUsers}
                value={cellValue}
                onChange={(newValue) => {
                  handleSelectChange(column.label, record, newValue)
                  console.log('updated select option: ', newValue);
                }}
              />
            ) : (
              record[column.recordName] ? record[column.recordName] : ''
            )}
          </td>
        );
      })}
    </>
  )
}

export default CellComponent

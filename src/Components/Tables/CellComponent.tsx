import React, { useEffect, useState } from 'react'
import SelectOptionComponent from './SelectOptionComponent';
import CalendarSelectComponent from '../Inputs/CalendarSelectComponent';
import SelectPeopleComponent from './SelectPeopleComponent';
import { useData } from '../../Context/DataContext';
import axios from 'axios';
import { Edit } from 'react-feather';

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
    if (record.expected_arrival_date) {
      const parsedDate = new Date(record.expected_arrival_date);
      setSelectedDate(parsedDate);
    } else {
      setSelectedDate(new Date());
    }
  }, [record.expected_arrival_date]);

  function convertDateToMMDDYYYY(dateString: string) {
    const date = new Date(dateString);
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getUTCDate()).padStart(2, '0'); 
    const yyyy = date.getUTCFullYear(); 
  
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
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getUTCDate()).padStart(2, '0'); 
    const yyyy = date.getUTCFullYear(); 

    return `${yyyy}-${mm}-${dd}`;
  }

  function limitStringLength(str: string) {
    if (str.length <= 20) {
      return str; // If the string is already 20 characters or less, return it unchanged
    } else {
      return str.substring(0, 20); // If the string is longer than 20 characters, return the first 20 characters
    }
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

  const handleSelectChange = (columnName: string, record: any, value: any) => {
    console.log('column name: ', columnName)
    const data = { data: {
      "checked_in": columnName === 'Status' ? value : record.checked_in,
      "booked": columnName === 'Booked' ? value : record.booked,
      "coordinator": columnName === 'Coordinator' ? value : record.coordinator,
      "summary_out": record.summary_out,
      "reason": columnName === 'Reason' ? value : record.reason,
      "expected_arrival_date": columnName === 'Arriving Date' ? convertDateToCustomFormat(record.expected_arrival_date) : record.expected_arrival_date
    }}
    console.log('updated record: ', data)
    // submitUpdate(data)
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
            ) : column.type === 'select-edit' ? (
              <>
                <div className='min-w-80 flex flex-row justify-center'>
                  {record[column.recordName]}
                  <Edit height={20} width={20} className='text-sky-500 ml-2'/>
                </div>
              </>
            ) : column.type === 'boolean' ? (
              record[column.recordName] === true ? 'Yes' : record[column.recordName] === null ? 'Unknown' : 'No'
            ) : column.type === 'date' ? (
              <>{convertDateToMMDDYYYY(record[column.recordName])}</>
            ) : column.type === 'date-edit' ? (
              <><div className='flex flex-row'>
                {convertDateToMMDDYYYY(record[column.recordName])}
                <Edit height={20} width={20} className='text-sky-500 ml-2'/>
              </div></>
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
            ) : column.type === 'text-edit' ? (
              <><div className='flex flex-row'>
                {record[column.recordName]}
                <Edit height={20} width={20} className='text-sky-500 ml-2'/>
              </div></>
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
